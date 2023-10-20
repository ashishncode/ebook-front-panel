import React, { useState, useRef, useEffect } from "react";
import "../../../src/book.css";

import HTMLFlipBook from "react-pageflip";
import Header from "../home/Header";
import HeaderLogin from "./Header_login";
import nextbtn from "../../assets/images/next_btn.png";
import previousbtn from "../../assets/images/previous_btn.png";
import jsPDF from "jspdf";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className={"page page-cover page-cover-" + props.pos}
      ref={ref}
      data-density="hard"
    >
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="book-flip-view-main-div">
      <div className="page" ref={ref} data-density={props.density || "soft"}>
        <div className="page-content">
          <div className="page-image">
            <div className="page-text-main-div">
              <div className="page-text">{props.children}</div>
            </div>

            <div className="page-footer">
              {props.currentPage}/{props.pageValue}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
const EbookCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const maxWordsPerPage = 125; // Maximum words per page
  const flipBookRef = useRef(null);
  const bookData = JSON.parse(localStorage.getItem("bookdata"));
  const [pageValue, setTotalPageValue] = useState("");

  // Split content into pages with a maximum word count
  const splitContentIntoPages = (content, title) => {
    const words = content.split(" ");
    const pages = [];
    let currentPage = "";

    for (let i = 0; i < words.length; i++) {
      if (currentPage.split(" ").length <= maxWordsPerPage) {
        currentPage += words[i] + " ";
      } else {
        pages.push({ title, content: currentPage.trim() });
        currentPage = words[i] + " ";
      }
    }

    if (currentPage.trim() !== "") {
      pages.push({ title, content: currentPage.trim() });
    }

    return pages;
  };

  const pages = [
    <PageCover key={0} pos="top">
      <h2 className="page-content-title">
        {bookData?.book?.bookTitle || "BOOK TITLE"}
      </h2>
    </PageCover>,
  ];

  if (bookData?.book?.chapters) {
    let totalPageCount = 0;
    bookData.book.chapters.forEach((item, index) => {
      const chapterPages = splitContentIntoPages(
        item?.description,
        item?.title
      );
      chapterPages.forEach((page, pageIndex) => {
        totalPageCount++;

        pages.push(
          <div key={`${index}_${pageIndex}`}>
            <Page
              image={`${index}.jpg`}
              // number={index + 1}
              currentPage={totalPageCount}
              pageValue={pageValue}
              pageContent={page?.content}
              pageTitle={page?.title}
            >
              <div className="chapter-title">{page?.title}</div>
              <div className="chapter-description">{page?.content}</div>
            </Page>
          </div>
        );
      });
    });
  }

  pages.push(
    <PageCover key={bookData?.book?.chapters?.length + 1} pos="bottom">
      <h2 className="page-content-end">THE END</h2>
    </PageCover>
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const handlePreviousPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const renderNextButton = () => {
    if (currentPage < totalNumberOfPages + 1) {
      return (
        <div className="page-next-button-div">
          <button className="page-next-button" onClick={handleNextPage}>
            <img src={nextbtn} alt="Book cover" />
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderPreviousButton = () => {
    if (currentPage > 0) {
      return (
        <div className="page-previous-button-div">
          <button className="page-previous-button" onClick={handlePreviousPage}>
            <img src={previousbtn} alt="Book cover" />
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a5",
    });
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const title = bookData?.book?.title || "BOOK TITLE";
    const chapterTitle = bookData?.book?.chapters?.[0]?.title;

    // Calculate the X and Y positions to center the title
    const titleX = (pageWidth - 40 - doc.getTextWidth(title)) / 2;
    const titleY = pageHeight / 2; // You can adjust the Y position as needed

    doc.setFontSize(35);
    doc.text(titleX, titleY, title);

    let y = 20;
    const paddingLeft = 20;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 20;
    const contentWidth =
      doc.internal.pageSize.width - paddingLeft - paddingRight;
    const contentHeight =
      doc.internal.pageSize.height - paddingTop - paddingBottom;
    doc.setFontSize(14);

    // Loop through your pages starting from index 2
    for (let index = 1; index < pages.length - 1; index++) {
      const page = pages[index];

      // Add a new page if not the first page
      if (index % 4 == 0) {
        if (index % 12 == 1) {
          if (index % 3 == 0) {
            doc.addPage();
          }
        }
      }
      const pageTitle = page.props.children.props.pageTitle;
      const pageContent = page.props.children.props.pageContent;

      // Extract text content from the React component
      const textContent = extractTextContent(page);

      // Split text into lines to handle line breaks
      const textLines = doc.splitTextToSize(pageContent, contentWidth);
      const textTitle = doc.splitTextToSize(pageTitle, contentWidth);

      // Calculate the total height needed for this content
      const textHeight = textLines.length * 10;

      // Check if the page index is even, and only add content for even pages

      // Check if the content fits in the current page, otherwise create a new page
      if (y + textHeight > contentHeight) {
        doc.addPage();
        y = paddingTop;
      }

      doc.setFontSize(14);
      // Add content to the PDF page with padding
      doc.text(paddingLeft, y, textLines, {
        align: "justify",
        maxWidth: 170,
      });
      doc.text(105, 10, textTitle, {
        align: "center",
        maxWidth: 170,
      });

      // Update the y position for the next content
      y += textHeight + 10;
    }

    // Add the last cover page at the end
    const lastCoverPage = pages[pages.length - 1];
    const lastCoverTitle = lastCoverPage.props.children.props.children;
    doc.addPage();
    doc.setFontSize(35);
    doc.text(titleX, titleY, lastCoverTitle);

    // Save or download the PDF
    doc.save("document.pdf");
  };

  const extractTextContent = (component) => {
    const textContent = [];

    const extractText = (element) => {
      if (typeof element === "string") {
        textContent.push(element);
      } else if (Array.isArray(element)) {
        element.forEach((child) => {
          extractText(child);
        });
      } else if (element.props && element.props.children) {
        extractText(element.props.children);
      }
    };
    extractText(component);

    return textContent.join(" ");
  };

  const totalNumberOfPages = pages.length - 2;
  useEffect(() => {
    setTotalPageValue(totalNumberOfPages);
  }, []);
  return (
    <>
      <div className="page-flip-book-main-div">
        <div className="next-prev-button-main-div">
          <div className="page-previous-button-div">
            {renderPreviousButton()}
          </div>
          <div className="page-next-button-div">{renderNextButton()}</div>
        </div>

        <div className="html-book-tag-div">
          <HTMLFlipBook
            ref={flipBookRef}
            useMouseEvents={true}
            // autoSize={true}
            // swipeDistance={120}
            drawShadow={false}
            flippingTime={1000}
            width={500}
            height={550}
            size="stretch"
            minWidth={230}
            maxWidth={400}
            minHeight={300}
            maxHeight={500}
            maxShadowOpacity={0.5}
            mobileScrollSupport={true}
            showCover={true}
            onFlip={(e) => handlePageChange(e.data)}
            className="page-flip"
            pageRotation="double" // This sets two pages per view
            style={{
              // backgroundImage:
              //   "url(https://nodlik.github.io/react-pageflip/images/background.jpg)",
              backgroundColor: "white",
            }}
          >
            {pages.map((page, index) => (
              <div key={index} className="page-content">
                {page}
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>
      <div className="export-dawnload-btn-div">
        <button
          type="button"
          onClick={generatePDF}
          className="export-book-button"
        >
          Export
        </button>
        <button
          type="button"
          onClick={generatePDF}
          className="dawnload-book-button"
        >
          Download
        </button>
      </div>
    </>
  );
};

export default EbookCarousel;
