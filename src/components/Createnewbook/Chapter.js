import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import ProfileImg from "../../assets/images/recent_book.png";
import createnewbookStyle from "../../assets/css/createnewbook.module.css";
import { Stepper, Step } from "react-form-stepper";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../common/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCreateNewBookField, selectCreateNewBookData } from '../../redux/createnewbookSlice';
import axios from 'axios';
import { notification } from 'antd';


function Chapter() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [value, setValue] = useState("");
  const [chapters, setChapters] = useState([{ title: "", description: "" }]);
  const text = <span>Plot Summary</span>;
  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };
  const handleChange = (e, field, index) => {
    const { name, value } = e.target;
    // Update the local state
    const updatedChapters = [...chapters];

    updatedChapters[index] = {
      ...updatedChapters[index],
      [name]: value,
    };
    setChapters(updatedChapters);
    console.log(field, value, index);

    // Dispatch the updated data to Redux
    dispatch(updateCreateNewBookField({
      field: 'chapters',
      value: updatedChapters,
    }));
  };
  const addNewBookSuccessfully = () => {
    notification.success({
      message: 'Updated book Successfully',
    });
  };
  const handleSubmit = (event, index) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated((prevValidations) => {
        const updatedValidations = [...prevValidations];
        updatedValidations[index] = true;
        return updatedValidations;
      });
      return;
    }
    console.log("Submitting Chapter", index, "Data:", chapters[index]);
  };
  // const addChapter = () => {
  //   const newChapter = {
  //     title: "", // Initialize title and description as empty strings
  //     description: "",
  //   };
  //   setChapters([...chapters, newChapter]);
  // };
  const handleAddChapter = () => {
    const newChapter = { title: "", description: "" };
    // setChapters([...chapters, newChapter]);
    dispatch(updateCreateNewBookField({
      field: 'chapters',
      value: newChapter,
    }));
    setChapters([...chapters, newChapter]);
  };
  const handleRemoveChapter = (index) => {
    // Dispatch the action to remove the chapter from Redux
    dispatch(
      updateCreateNewBookField({
        field: "chapters",
        value: null,
        index,
      })
    );
  };
  console.log("formData.formData", formData.formData);
  const handleFinish = async (e) => {
    e.preventDefault();


    try {
      // Send the form data to your API endpoint
      const response = await axios.post('http://10.16.16.108:7000/api/createbooks', formData.formData);

      // Handle the response from the API, e.g., show a success message
      console.log('Data submitted successfully:', response.data);
      addNewBookSuccessfully()
      navigate('/mybooks')
      // Optionally, you can reset the form data in the Redux store if needed
      dispatch(updateCreateNewBookField({ field: 'writingStyle', value: '' }));
      dispatch(updateCreateNewBookField({ field: 'additionalInstruction', value: '' }));

      // Redirect or navigate to another page
      // history.push('/success'); // You may need to import 'history' from react-router-dom
    } catch (error) {
      console.error('Error submitting data:', error);
    }

  };

  return (
    <>
      <div className="common-container">
        <div className={createnewbookStyle.change_password_page}>
          <Sidebar />
          <div className={createnewbookStyle.change_password_right}>
            <div className={createnewbookStyle.book_details_top_title}>
              <h2>Create New Book</h2>
              <p>Create a book & start adding chapters and characters</p>
            </div>
            <div className={createnewbookStyle.stepper_section}>
              <Stepper activeStep={1} disabledColor={""}>
                <Step
                  label="Book Details"
                  className={createnewbookStyle.step_active}
                />
                <Step
                  label="Main Characters"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Setting"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Plot Summary"
                  className={createnewbookStyle.step_common}
                />
                <Step
                  label="Writing Preferences"
                  className={createnewbookStyle.step_common}
                />
              </Stepper>
            </div>
            <div className={createnewbookStyle.user_name_add_chapter}>
              <a href="/" className={createnewbookStyle.user_name_btn}>
                User Name
              </a>
              <a href="/" className={createnewbookStyle.author_name_btn}>
                Author Name
              </a>
              <a className={createnewbookStyle.add_chapter_btn} onClick={handleAddChapter}>
                Add Chapter
              </a>
            </div>
            <div className={createnewbookStyle.platform_name_top}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row
                  className={`mb-12 ${createnewbookStyle.book_details_select}`}
                >
                  <Col md="6">
                    <Form.Label>Platform name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Add Platform name"
                      defaultValue="Add Platform name"
                    />
                  </Col>
                </Row>
                <Row
                  className={`mb-12 ${createnewbookStyle.book_details_fild}`}
                >
                  <div
                    className={
                      createnewbookStyle.chapter_profile_picture_section
                    }
                  >
                    <div
                      className={createnewbookStyle.chapter_profile_picture_img}
                    >
                      <img src={ProfileImg} />
                    </div>
                    <div className={createnewbookStyle.chapter_profile_picture}>
                      <input type="file" id="upload" hidden />
                      <label for="upload">Upload</label>
                    </div>
                    <span className={createnewbookStyle.profile_img_name}>
                      Image.jpg
                    </span>
                  </div>
                </Row>
              </Form>
            </div>
            {chapters.map((chapter, index) => (
              <>
                <div key={index} className={createnewbookStyle.chapter_one_section}>
                  <div className={createnewbookStyle.mybook_top_section}>
                    <h2>Chapter {index + 1}</h2>
                  </div>
                  <div className={createnewbookStyle.book_details_from}>
                    <Form validated={validated[index]}
                      onSubmit={(event) => handleSubmit(event, index)}>
                      <Row
                        className={`mb-12 ${createnewbookStyle.book_details_select}`}
                      >
                        <Col md="12">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Add Platform name"
                            name="title"
                            // defaultValue="Add Platform name"
                            value={chapter.title}
                            onChange={(e) => handleChange(e, "title", index)}
                          // onChange={handleChange}

                          />
                        </Col>
                      </Row>
                      <Row
                        className={`mb-12 ${createnewbookStyle.book_details_select}`}
                      >
                        <Col md="12">
                          <Form.Label>Title description</Form.Label>
                          <ReactQuill
                            theme="snow"
                            // value={value}
                            value={chapter.description}
                            // onChange={setValue}
                            // onChange={(text) =>
                            //   handleChange(
                            //     { target: { name: "description", value: text } },
                            //     index
                            //   )
                            // }
                            onChange={(text) => handleChange({ target: { name: "description", value: text } }, "description", index)}
                            // onChange={handleChange}

                            style={{
                              height: 120,
                            }}
                          />
                        </Col>
                      </Row>
                      <div className={createnewbookStyle.save_draft_btns_section}>
                        <div className={createnewbookStyle.next_cancel_btns}>
                          <Button
                            type="submit"
                            className={createnewbookStyle.draft_remove_btn}
                            onClick={() => handleRemoveChapter(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="10">
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter your text here..."
                        defaultValue="Enter your text here..."
                      />
                    </Col>
                    <Col md="2">
                      <a href="/" className={createnewbookStyle.improve_btn}>
                        Improve
                      </a>
                    </Col>
                  </Row>
                </Form>
              </>
            ))}
            < Form noValidate validated={validated} onSubmit={handleSubmit} >
              {/* <Row
                className={`mb-12 ${createnewbookStyle.book_details_select}`}
              >
                <Col md="10">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your text here..."
                    defaultValue="Enter your text here..."
                  />
                </Col>
                <Col md="2">
                  <a href="/" className={createnewbookStyle.improve_btn}>
                    Improve
                  </a>
                </Col>
              </Row> */}
              <div className={createnewbookStyle.next_cancel_btns}>
                <Button type="submit" className={createnewbookStyle.finish_btn}>
                  Save Draft
                </Button>
                <Button type="submit" className={createnewbookStyle.finish_btn}>
                  Export as PDF
                </Button>
                <Button type="submit" className={createnewbookStyle.finish_btn}>
                  Export as ePub
                </Button>
                <Button type="submit" className={createnewbookStyle.next_btn}>
                  Export as docx
                </Button>
                <Button
                  type="submit"
                  className={createnewbookStyle.finish_btn}
                  onClick={handleFinish}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div >
    </>
  );
}

export default Chapter;