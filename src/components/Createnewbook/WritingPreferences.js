// import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import Dropdown from "react-bootstrap/Dropdown";
// import { Tooltip } from "antd";
// import TooltipIcon from "../../assets/images/tooltip_icon.png";
// import createnewbookStyle from "../../assets/css/createnewbook.module.css";
// import { Stepper, Step } from "react-form-stepper";
// import Sidebar from "../common/Sidebar";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateCreateNewBookField,
//   selectCreateNewBookData,
// } from "../../redux/createnewbookSlice";
// import { notification } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import CustomStepper from "./CustomStepper";

// function WritingPreferences() {
//   const { id } = useParams(); // Get the ID from the URL

//   const navigate = useNavigate();
//   const [writingStyle, setWritingStyle] = useState("");
//   const [additionalInstruction, setAdditionalInstructions] = useState("");
//   const [writingData, setWritingData] = useState({});
//   const [validationErrors, setValidationErrors] = useState({
//     writingStyle: "",
//     additionalInstruction: "",
//   });
//   const handleStyleChange = (e) => {
//     setWritingStyle(e.target.value);
//   };

//   const dispatch = useDispatch();
//   const formData = useSelector(selectCreateNewBookData);

//   useEffect(() => {
//     // Fetch the existing record based on the ID if it exists
//     if (id) {
//       axios
//         .get(`http://10.16.16.108:7000/api/editbook/${id}`)
//         .then((response) => {
//           setWritingData(response.data);
//           // Populate form fields with data from the existing record
//           dispatch(
//             updateCreateNewBookField({
//               field: "writingStyle",
//               value: response.data.writingStyle,
//             })
//           );
//           dispatch(
//             updateCreateNewBookField({
//               field: "additionalInstruction",
//               value: response.data.additionalInstruction,
//             })
//           );
//           // Add similar lines for other fields
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // setFormData({
//     //   ...formData,
//     //   [name]: value,
//     // });
//     dispatch(updateCreateNewBookField({ field: name, value: value }));
//     if (id) {
//       const updatedBookData = { ...writingData, [name]: value };
//       setWritingData(updatedBookData);
//     }
//     setValidationErrors({
//       ...validationErrors,
//       [name]: "",
//     });
//   };
//   const addNewBookSuccessfully = () => {
//     notification.success({
//       message: "Updated book Successfully",
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make a POST request to your API endpoint with the writing preferences data
//       const response = await axios.post(
//         "http://10.16.16.108:7000/api/createbooks",
//         {
//           writingStyle,
//           additionalInstruction,
//         }
//       );
//     } catch (error) {
//       console.error("Error submitting Writing Preferences:", error);
//     }
//   };
//   const handleFinish = async (e) => {
//     e.preventDefault();
//     const errors = {};
//     if (!formData.formData.writingStyle) {
//       errors.writingStyle = "Please enter writing style.";
//     }
//     if (!formData.formData.additionalInstruction) {
//       errors.additionalInstruction = "Please enter additional instruction.";
//     }
//     if (Object.keys(errors).length === 0) {
//       // Form is valid, submit data or proceed
//       // navigate('/writingpreferences');

//       try {
//         // Send the form data to your API endpoint
//         const response = await axios.post(
//           "http://10.16.16.108:7000/api/createbooks",
//           formData.formData
//         );

//         // Handle the response from the API, e.g., show a success message

//         addNewBookSuccessfully();
//         navigate("/mybooks");
//         // Optionally, you can reset the form data in the Redux store if needed
//         dispatch(
//           updateCreateNewBookField({ field: "writingStyle", value: "" })
//         );
//         dispatch(
//           updateCreateNewBookField({
//             field: "additionalInstruction",
//             value: "",
//           })
//         );

//         // Redirect or navigate to another page
//         // history.push('/success'); // You may need to import 'history' from react-router-dom
//       } catch (error) {
//         console.error("Error submitting data:", error);
//       }
//     } else {
//       // Update the validation errors state
//       setValidationErrors(errors);
//     }
//   };
//   const handleUpdateFinish = async (e) => {
//     e.preventDefault();
//     try {
//       // Send the form data to your API endpoint
//       const response = await axios.post(
//         `http://10.16.16.108:7000/api/updatebook/${id}`,
//         formData.formData
//       );

//       // Handle the response from the API, e.g., show a success message

//       addNewBookSuccessfully();
//       navigate("/mybooks");
//       // Optionally, you can reset the form data in the Redux store if needed
//       dispatch(updateCreateNewBookField({ field: "writingStyle", value: "" }));
//       dispatch(
//         updateCreateNewBookField({ field: "additionalInstruction", value: "" })
//       );

//       // Redirect or navigate to another page
//       // history.push('/success'); // You may need to import 'history' from react-router-dom
//     } catch (error) {
//       console.error("Error submitting data:", error);
//     }
//   };
//   const handleNext = (e) => {
//     e.preventDefault();

//     navigate("/witinginterface");
//   };
//   const handleUpdateNext = (e) => {
//     e.preventDefault();
//     navigate(`/witinginterface/${id}`);
//   };
//   const handlePrevious = () => {
//     if (id) {
//       // If id exists, navigate to /maincharacters/:id
//       navigate(`/plotsummary/${id}`);
//     } else {
//       // If id doesn't exist, navigate to /maincharacters
//       navigate("/plotsummary");
//     }
//   };
//   return (
//     <>
//       <div className="common-container">
//         <div className={createnewbookStyle.change_password_page}>
//           <Sidebar />
//           <div className={createnewbookStyle.change_password_right}>
//             <div className={createnewbookStyle.book_details_top_title}>
//               <h2>Create New Book</h2>
//               <p>Create a book & start adding chapters and characters</p>
//             </div>
//             <div className={createnewbookStyle.stepper_section}>
//               <Stepper activeStep={1} disabledColor={""}>
//                 {/* <Step
//                   label="Book Details"
//                   className={createnewbookStyle.step_active}
//                 />
//                 <Step
//                   label="Main Characters"
//                   className={createnewbookStyle.step_common}
//                 />
//                 <Step
//                   label="Setting"
//                   className={createnewbookStyle.step_common}
//                 />
//                 <Step
//                   label="Plot Summary"
//                   className={createnewbookStyle.step_common}
//                 />
//                 <Step
//                   label="Writing Preferences"
//                   className={createnewbookStyle.step_common}
//                 /> */}
//                 <CustomStepper activeStep={5} disabledColor={"#cccccc"} />
//               </Stepper>
//             </div>
//             <div className={createnewbookStyle.book_details_from_section}>
//               <h2>Writing Preferences</h2>
//               <div className={createnewbookStyle.book_details_from}>
//                 {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Form>
//                   <Row
//                     className={`mb-12 ${createnewbookStyle.book_details_select}`}
//                   >
//                     <Col md="12">
//                       <Form.Label>Writing style/tone</Form.Label>
//                       <Form.Select
//                         aria-label="Children"
//                         // value={writingStyle}
//                         name="writingStyle"
//                         value={
//                           id ? writingData.writingStyle : formData.writingStyle
//                         }
//                         onChange={handleChange}
//                         required
//                         isInvalid={!!validationErrors.writingStyle}
//                       >
//                         <option value="Formal">Formal</option>
//                         <option value="Informal">Informal</option>
//                         <option value="Conversational">Conversational</option>
//                         <option value="Descriptive">Descriptive</option>
//                         <option value="Humorous">Humorous</option>
//                         <option value="Dark">Dark</option>
//                         <option value="Optimistic">Optimistic</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.writingStyle}
//                       </Form.Control.Feedback>
//                     </Col>
//                   </Row>
//                   <Row
//                     className={`mb-12 ${createnewbookStyle.book_details_select} ${createnewbookStyle.character_name}`}
//                   >
//                     <Col md="12">
//                       <Form.Label>Additional Instructions</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         placeholder="Any specific preferences or guidelines for Algorithm?"
//                         rows={3}
//                         // value={additionalInstruction}
//                         name="additionalInstruction"
//                         value={
//                           id
//                             ? writingData.additionalInstruction
//                             : formData.additionalInstruction
//                         }
//                         onChange={handleChange}
//                         required
//                         isInvalid={!!validationErrors.additionalInstruction}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.additionalInstruction}
//                       </Form.Control.Feedback>
//                     </Col>
//                   </Row>
//                   <div className={createnewbookStyle.next_cancel_btns_section}>
//                     <div className={createnewbookStyle.next_cancel_btns}>
//                       <Button
//                         type="submit"
//                         className={createnewbookStyle.finish_btn}
//                         onClick={id ? handleUpdateFinish : handleFinish}
//                       >
//                         Finish
//                       </Button>
//                       <Button
//                         type="button"
//                         className={createnewbookStyle.next_btn}
//                         onClick={id ? handleUpdateNext : handleNext}
//                       >
//                         Next
//                       </Button>
//                       <Button
//                         type="submit"
//                         className={createnewbookStyle.cancel_btn}
//                         onClick={handlePrevious}
//                       >
//                         Previous
//                       </Button>
//                     </div>
//                   </div>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default WritingPreferences;

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { Tooltip } from "antd";
import TooltipIcon from "../../assets/images/tooltip_icon.png";
import createnewbookStyle from "../../assets/css/createnewbook.module.css";
import { Stepper, Step } from "react-form-stepper";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCreateNewBookField,
  selectCreateNewBookData,
} from "../../redux/createnewbookSlice";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import CustomStepper from "./CustomStepper";
import Header from "../../components/common/Header";
import HeaderLogin from "../common/Header_login";
import Footer from "../../components/common/Footer";

function WritingPreferences() {
  const { id } = useParams(); // Get the ID from the URL
  const userEmail = localStorage.getItem("userEmail");

  const navigate = useNavigate();
  const [writingStyle, setWritingStyle] = useState("");
  const [additionalInstruction, setAdditionalInstructions] = useState("");
  const [writingData, setWritingData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    writingStyle: "",
    additionalInstruction: "",
  });
  const handleStyleChange = (e) => {
    setWritingStyle(e.target.value);
  };

  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);

  useEffect(() => {
    // Fetch the existing record based on the ID if it exists
    if (id) {
      axios
        .get(`http://10.16.16.108:7000/api/editbook/${id}`)
        .then((response) => {
          setWritingData(response.data);
          // Populate form fields with data from the existing record
          dispatch(
            updateCreateNewBookField({
              field: "writingStyle",
              value: response.data.writingStyle,
            })
          );
          dispatch(
            updateCreateNewBookField({
              field: "additionalInstruction",
              value: response.data.additionalInstruction,
            })
          );
          // Add similar lines for other fields
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    dispatch(updateCreateNewBookField({ field: name, value: value }));
    if (id) {
      const updatedBookData = { ...writingData, [name]: value };
      setWritingData(updatedBookData);
    }
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  const addNewBookSuccessfully = () => {
    notification.success({
      message: "Updated book Successfully",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your API endpoint with the writing preferences data
      const response = await axios.post(
        "http://10.16.16.108:7000/api/createbooks",
        {
          writingStyle,
          additionalInstruction,
        }
      );
    } catch (error) {
      console.error("Error submitting Writing Preferences:", error);
    }
  };
  const handleFinish = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.formData.writingStyle) {
      errors.writingStyle = "Please enter writing style.";
    }
    if (!formData.formData.additionalInstruction) {
      errors.additionalInstruction = "Please enter additional instruction.";
    }
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or proceed
      // navigate('/writingpreferences');

      try {
        // Send the form data to your API endpoint
        const response = await axios.post(
          "http://10.16.16.108:7000/api/createbooks",
          formData.formData
        );

        // Handle the response from the API, e.g., show a success message

        addNewBookSuccessfully();
        navigate("/mybooks");
        // Optionally, you can reset the form data in the Redux store if needed
        dispatch(
          updateCreateNewBookField({ field: "writingStyle", value: "" })
        );
        dispatch(
          updateCreateNewBookField({
            field: "additionalInstruction",
            value: "",
          })
        );

        // Redirect or navigate to another page
        // history.push('/success'); // You may need to import 'history' from react-router-dom
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    } else {
      // Update the validation errors state
      setValidationErrors(errors);
    }
  };
  const handleUpdateFinish = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to your API endpoint
      const response = await axios.post(
        `http://10.16.16.108:7000/api/updatebook/${id}`,
        formData.formData
      );

      // Handle the response from the API, e.g., show a success message

      addNewBookSuccessfully();
      navigate("/mybooks");
      // Optionally, you can reset the form data in the Redux store if needed
      dispatch(updateCreateNewBookField({ field: "writingStyle", value: "" }));
      dispatch(
        updateCreateNewBookField({ field: "additionalInstruction", value: "" })
      );

      // Redirect or navigate to another page
      // history.push('/success'); // You may need to import 'history' from react-router-dom
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();

    navigate("/witinginterface");
  };
  const handleUpdateNext = (e) => {
    e.preventDefault();
    navigate(`/witinginterface/${id}`);
  };
  const handlePrevious = () => {
    if (id) {
      // If id exists, navigate to /maincharacters/:id
      navigate(`/plotsummary/${id}`);
    } else {
      // If id doesn't exist, navigate to /maincharacters
      navigate("/plotsummary");
    }
  };
  return (
    <>
      {userEmail ? <HeaderLogin /> : <Header />}
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
                {/* <Step
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
                /> */}
                <CustomStepper activeStep={5} disabledColor={"#cccccc"} />
              </Stepper>
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Writing Preferences</h2>
              <div className={createnewbookStyle.book_details_from}>
                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                {/* <Form onSubmit={handleSubmit}> */}
                <Form>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="12">
                      <Form.Label>Writing style/tone</Form.Label>
                      <Form.Select
                        aria-label="Children"
                        // value={writingStyle}
                        name="writingStyle"
                        value={
                          id ? writingData.writingStyle : formData.writingStyle
                        }
                        onChange={handleChange}
                        required
                        isInvalid={!!validationErrors.writingStyle}
                      >
                        <option value="Formal">Formal</option>
                        <option value="Informal">Informal</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Descriptive">Descriptive</option>
                        <option value="Humorous">Humorous</option>
                        <option value="Dark">Dark</option>
                        <option value="Optimistic">Optimistic</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.writingStyle}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select} ${createnewbookStyle.character_name}`}
                  >
                    <Col md="12">
                      <Form.Label>Additional Instructions</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Any specific preferences or guidelines for Algorithm?"
                        rows={3}
                        // value={additionalInstruction}
                        name="additionalInstruction"
                        value={
                          id
                            ? writingData.additionalInstruction
                            : formData.additionalInstruction
                        }
                        onChange={handleChange}
                        required
                        isInvalid={!!validationErrors.additionalInstruction}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.additionalInstruction}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <div className={createnewbookStyle.next_cancel_btns_section}>
                    <div className={createnewbookStyle.next_cancel_btns}>
                      <Button
                        type="submit"
                        className={createnewbookStyle.finish_btn}
                        onClick={id ? handleUpdateFinish : handleFinish}
                      >
                        Finish
                      </Button>
                      <Button
                        type="button"
                        className={createnewbookStyle.next_btn}
                        onClick={id ? handleUpdateNext : handleNext}
                      >
                        Next
                      </Button>
                      <Button
                        type="submit"
                        className={createnewbookStyle.cancel_btn}
                        onClick={handlePrevious}
                      >
                        Previous
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WritingPreferences;
