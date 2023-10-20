// import React, { useState, useEffect } from "react";
// import HTMLFlipBook from "react-pageflip";

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="demoPage" ref={ref}>
//       <h1>Page Header</h1>
//       <p>{props.children}</p>
//       <p>Page number: {props?.item?.title}</p>
//     </div>
//   );
// });

// const ViewBook = (props) => {
//   var viewBook = localStorage.getItem("bookdata");

//   var bookData = JSON.parse(viewBook);
//   console.log(bookData, "bookdata");

//   const [data, setData] = useState([]);

//   const pageList = [
//     { name: "Rifakathusen" },
//     { name: "Rutvi" },
//     { name: "Vineet" },
//     { name: "Shahid" },
//   ];
//   const [count, setCount] = useState(1);
//   const increaseCount = () => {
//     setCount(count + 1);
//   };

//   useEffect(() => {
//     setData(bookData);
//   }, []);

//   return (
//     <div>
//       <p>Current Page: {count}</p>
//       <HTMLFlipBook
//         width={480}
//         height={720}
//         size="stretch"
//         minWidth={315}
//         maxWidth={600}
//         minHeight={400}
//         maxHeight={900}
//         maxShadowOpacity={0.5}
//         showCover={true}
//         mobileScrollSupport={true}
//         className="demo-book"
//         onPageChange={increaseCount}
//       >
//         {/* <Page number="1">Page text</Page>
//       <Page number="2">Page text</Page>
//       <Page number="3">Page text</Page>
//       <Page number="4">Page text</Page> */}
//         {bookData?.book?.chapters?.map((item) => {
//           return (
//             <Page className="demopage" onPageChange={increaseCount} item={item}>
//               {/* {item?.title} */}
//             </Page>
//           );
//         })}
//       </HTMLFlipBook>
//     </div>
//   );
// };

// export default ViewBook;

// import React, { useState, useEffect } from "react";
// import HTMLFlipBook from "react-pageflip";

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="demoPage" ref={ref}>
//       <h1>{props.title}</h1>
//       <p>{props.children}</p>
//       <p>Page number: {props.pageNumber}</p>
//     </div>
//   );
// });

// const ViewBook = () => {
//   // Replace this with your dynamic data
//   var viewBook = localStorage.getItem("bookdata");

//   var bookData = JSON.parse(viewBook);
//   console.log(bookData, "bookdata");

//   const [currentPage, setCurrentPage] = useState(0);

//   const increaseCount = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div>
//       <p>Current Page: {currentPage + 1}</p>
//       <HTMLFlipBook
//         width={480}
//         height={720}
//         size="stretch"
//         minWidth={315}
//         maxWidth={600}
//         minHeight={400}
//         maxHeight={900}
//         maxShadowOpacity={0.5}
//         showCover={true}
//         mobileScrollSupport={true}
//         className="demo-book"
//         onPageChange={increaseCount}
//       >
//         {bookData?.book?.chapters?.map((item, index) => (
//           <Page key={index} title={item.title} pageNumber={index + 1}>
//             {item?.description}
//           </Page>
//         ))}
//       </HTMLFlipBook>
//     </div>
//   );
// };

// export default ViewBook;

// import React, { useState } from "react";
// import HTMLFlipBook from "react-pageflip";

// const PageCover = React.forwardRef((props, ref) => {
//   return (
//     <div
//       className={"page page-cover page-cover-" + props.pos}
//       ref={ref}
//       data-density="hard"
//     >
//       <div className="page-content">
//         <h2>{props.children}</h2>
//       </div>
//     </div>
//   );
// });

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="page" ref={ref} data-density={props.density || "soft"}>
//       <div className="page-content">
//         <h2 className="page-header">Page header - {props.number}</h2>
//         <div
//           className="page-image"
//           style={{
//             backgroundImage: `url(https://nodlik.github.io/react-pageflip/images/html/${props.image})`,
//           }}
//         ></div>
//         <div className="page-text">{props.children}</div>
//         <div className="page-footer">{props.number + 1}</div>
//       </div>
//     </div>
//   );
// });

// const PageFlip = () => {
//   const [currentPage, setCurrentPage] = useState(0);

//   const bookData = JSON.parse(localStorage.getItem("bookdata"));

//   const pages = [
//     <PageCover key={0} pos="top">
//       {bookData?.book?.title || "BOOK TITLE"}
//     </PageCover>,
//   ];

//   if (bookData?.book?.chapters) {
//     bookData.book.chapters.forEach((item, index) => {
//       pages.push(
//         <Page key={index + 1} image={`${index + ".jpg"}`} number={index + 1}>
//           {item?.description}
//         </Page>
//       );
//     });
//   }

//   pages.push(
//     <PageCover key={bookData?.book?.chapters?.length + 1} pos="bottom">
//       THE END
//     </PageCover>
//   );

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div
//       className="demo-block bg-lightx pt-3 pb-3 overflow-hidden"
//       id="demoBlock"
//     >
//       <div className="container-md">
//         <HTMLFlipBook
//           width={500}
//           height={600}
//           size="stretch"
//           minWidth={"500px"}
//           maxWidth={150}
//           minHeight={100}
//           maxHeight={1533}
//           maxShadowOpacity={0.5}
//           showCover={true}
//           mobileScrollSupport={true}
//           className="flip-book html-book demo-book"
//           style={{
//             backgroundImage:
//               "url(https://nodlik.github.io/react-pageflip/images/background.jpg)",
//           }}
//           onPageChange={(e) => handlePageChange(e.data)}
//         >
//           {pages}
//         </HTMLFlipBook>
//         <div className="page-number">Page: {currentPage + 1}</div>
//       </div>
//     </div>
//   );
// };

// export default PageFlip;

import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import book_background from "../../assets/images/book-background.png";

// Your existing code...
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
    <div className="page" ref={ref} data-density={props.density || "soft"}>
      <div className="page-content">
        <h6 className="page-header">[{props.title}]</h6>
        <div className="page-image">
          <div className="page-text">{props.children}</div>
          <div className="page-footer">
            {props.currentPage}/{props.pageValue}
          </div>
        </div>
      </div>
    </div>
  );
});
const PageFlip = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const maxWordsPerPage = 200; // Maximum words per page
  const flipBookRef = useRef(null);
  const bookData = JSON.parse(localStorage.getItem("bookdata"));
  const [pageValue, setTotalPageValue] = useState("");

  // Split content into pages with a maximum word count
  const splitContentIntoPages = (content) => {
    const words = content.split(" ");
    const pages = [];
    let currentPage = "";

    for (let i = 0; i < words.length; i++) {
      if (currentPage.split(" ").length < maxWordsPerPage) {
        currentPage += words[i] + " ";
      } else {
        pages.push(currentPage.trim());
        currentPage = words[i] + " ";
      }
    }

    if (currentPage.trim() !== "") {
      pages.push(currentPage.trim());
    }

    return pages;
  };

  const pages = [
    <PageCover key={0} pos="top">
      <h2 className="page-content-title">
        {bookData?.book?.title || "BOOK TITLE"}
      </h2>
    </PageCover>,
  ];

  if (bookData?.book?.chapters) {
    let totalPageCount = 0;
    bookData.book.chapters.forEach((item, index) => {
      const chapterPages = splitContentIntoPages(item?.description);
      chapterPages.forEach((pageContent, pageIndex) => {
        totalPageCount++;

        pages.push(
          <div key={`${index}_${pageIndex}`}>
            <Page
              image={`${index}.jpg`}
              // number={index + 1}
              currentPage={totalPageCount}
              pageValue={pageValue}
              title={item?.title}
            >
              {pageContent}
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

  const totalNumberOfPages = pages.length - 2;
  useEffect(() => {
    setTotalPageValue(totalNumberOfPages);
  }, []);
  return (
    <div>
      <div className="navigation-controls">
        <button onClick={handlePreviousPage}>Previous Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>

      <HTMLFlipBook
        ref={flipBookRef}
        // autoSize={true}
        // swipeDistance={120}
        drawShadow={false}
        flippingTime={500}
        width={500}
        height={700}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={1000}
        maxHeight={1533}
        maxShadowOpacity={0}
        mobileScrollSupport={true}
        showCover={true}
        onFlip={(e) => handlePageChange(e.data)}
        className="page-flip"
        pageRotation="double" // This sets two pages per view
        // style={{
        //   backgroundImage:
        //     "url(https://wallpaperforlessmurray.com/cdn/shop/products/TS8891_1024x1024.jpg?v=1571346870)",
        // }}
      >
        {pages.map((page, index) => (
          <div key={index} className="page-content">
            {page}
          </div>
        ))}
      </HTMLFlipBook>

      <div className="page-number">
        Page: {currentPage} / {totalNumberOfPages}
      </div>
    </div>
  );
};

export default PageFlip;
