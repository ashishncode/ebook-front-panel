// import { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import Dropdown from "react-bootstrap/Dropdown";
// import createnewbookStyle from "../../assets/css/createnewbook.module.css";
// import { Stepper, Step } from "react-form-stepper";
// import Sidebar from "../common/Sidebar";
// import axios from "axios";
// import { Tooltip } from "antd";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   updateCreateNewBookField,
//   selectCreateNewBookData,
// } from "../../redux/createnewbookSlice";
// import CustomStepper from "./CustomStepper";

// function Setting() {
//   const { id } = useParams(); // Get the ID from the URL
//   const navigate = useNavigate();

//   const email = localStorage.getItem("userEmail");
//   const [Setting, setSetting] = useState(null);
//   const [nextButtonClicked, setNextButtonClicked] = useState(false);
//   const [settingData, setSettingData] = useState({});
//   const [validationErrors, setValidationErrors] = useState({
//     timePeriod: "",
//     location: "",
//     additionalDetails: "",
//   });
//   const dispatch = useDispatch();
//   const formData = useSelector(selectCreateNewBookData);
//   useEffect(() => {
//     // Fetch the existing record based on the ID if it exists
//     if (id) {
//       axios
//         .get(`http://10.16.16.108:7000/api/editbook/${id}`)
//         .then((response) => {
//           setSettingData(response.data);
//           dispatch(
//             updateCreateNewBookField({
//               field: "timePeriod",
//               value: response.data.timePeriod,
//             })
//           );
//           dispatch(
//             updateCreateNewBookField({
//               field: "location",
//               value: response.data.location,
//             })
//           );
//           dispatch(
//             updateCreateNewBookField({
//               field: "additionalDetails",
//               value: response.data.additionalDetails,
//             })
//           );
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
//       const updatedBookData = { ...settingData, [name]: value };
//       setSettingData(updatedBookData);
//     }
//     setValidationErrors({
//       ...validationErrors,
//       [name]: "",
//     });
//   };
//   const handleNext = (e) => {
//     e.preventDefault();
//     const errors = {};
//     if (!formData.formData.timePeriod) {
//       errors.timePeriod = "Please enter time period.";
//     }
//     if (!formData.formData.location) {
//       errors.location = "Please select a location.";
//     }
//     if (!formData.formData.additionalDetails) {
//       errors.additionalDetails = "Please select additional details.";
//     }
//     if (Object.keys(errors).length === 0) {
//       // Form is valid, submit data or proceed
//       navigate("/plotsummary");
//     } else {
//       // Update the validation errors state
//       setValidationErrors(errors);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       formData.email = email;
//       // Make a POST request to your API endpoint
//       const response = await axios.post(
//         "http://10.16.16.108:7000/api/createbooks",
//         formData
//       );

//       setSetting(response.data);
//     } catch (error) {
//       console.error("Error submitting settings data:", error);
//     }
//   };
//   const handleNextUpdate = (e) => {
//     navigate(`/plotsummary/${id}`);
//   };
//   const handlePrevious = () => {
//     if (id) {
//       // If id exists, navigate to /maincharacters/:id
//       navigate(`/maincharacters/${id}`);
//     } else {
//       // If id doesn't exist, navigate to /maincharacters
//       navigate("/maincharacters");
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
//               {/* <Stepper activeStep={1} disabledColor={""}>
//                 <Step
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
//                 />
//               </Stepper> */}
//               <CustomStepper activeStep={3} disabledColor={"#cccccc"} />
//             </div>
//             <div className={createnewbookStyle.book_details_from_section}>
//               <h2>Setting</h2>
//               <div className={createnewbookStyle.book_details_from}>
//                 {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
//                 <Form onSubmit={handleSubmit}>
//                   <Row
//                     className={`mb-12 ${createnewbookStyle.book_details_select}`}
//                   >
//                     <Col md="6">
//                       <Form.Label>Time period</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         placeholder="18th century"
//                         name="timePeriod"
//                         value={
//                           id ? settingData.timePeriod : formData.timePeriod
//                         }
//                         onChange={handleChange}
//                         isInvalid={!!validationErrors.timePeriod}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.timePeriod}
//                       </Form.Control.Feedback>
//                     </Col>
//                     <Col md="6">
//                       <Form.Label>Location</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         placeholder="New York City"
//                         name="location"
//                         value={id ? settingData.location : formData.location}
//                         onChange={handleChange}
//                         isInvalid={!!validationErrors.location}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.location}
//                       </Form.Control.Feedback>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Form.Group as={Col} md="12" controlId="validationCustom04">
//                       <Form.Control
//                         type="hidden"
//                         name="email"
//                         value={email}
//                         onChange={handleChange}
//                       />
//                     </Form.Group>
//                   </Row>
//                   <Row
//                     className={`mb-12 ${createnewbookStyle.book_details_select} ${createnewbookStyle.character_name}`}
//                   >
//                     <Col md="12">
//                       <Form.Label>Additional Details</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         placeholder="Describe the setting's atmosphere, culture, and important landmarks"
//                         name="additionalDetails"
//                         value={
//                           id
//                             ? settingData.additionalDetails
//                             : formData.additionalDetails
//                         }
//                         onChange={handleChange}
//                         rows={3}
//                         isInvalid={!!validationErrors.additionalDetails}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.additionalDetails}
//                       </Form.Control.Feedback>
//                     </Col>
//                   </Row>
//                   <div className={createnewbookStyle.next_cancel_btns_section}>
//                     <div className={createnewbookStyle.next_cancel_btns}>
//                       <Button
//                         type="submit"
//                         className={createnewbookStyle.next_btn}
//                         onClick={id ? handleNextUpdate : handleNext}
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

// export default Setting;

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import createnewbookStyle from "../../assets/css/createnewbook.module.css";
import { Stepper, Step } from "react-form-stepper";
import Sidebar from "../common/Sidebar";
import axios from "axios";
import { Tooltip } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCreateNewBookField,
  selectCreateNewBookData,
} from "../../redux/createnewbookSlice";
import CustomStepper from "./CustomStepper";
import Header from "../../components/common/Header";
import HeaderLogin from "../common/Header_login";
import Footer from "../../components/common/Footer";
function Setting() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const [Setting, setSetting] = useState(null);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);
  const [settingData, setSettingData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    timePeriod: "",
    location: "",
    additionalDetails: "",
  });
  const userEmail = localStorage.getItem("userEmail");

  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);
  useEffect(() => {
    // Fetch the existing record based on the ID if it exists
    if (id) {
      axios
        .get(`http://10.16.16.108:7000/api/editbook/${id}`)
        .then((response) => {
          setSettingData(response.data);
          dispatch(
            updateCreateNewBookField({
              field: "timePeriod",
              value: response.data.timePeriod,
            })
          );
          dispatch(
            updateCreateNewBookField({
              field: "location",
              value: response.data.location,
            })
          );
          dispatch(
            updateCreateNewBookField({
              field: "additionalDetails",
              value: response.data.additionalDetails,
            })
          );
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
      const updatedBookData = { ...settingData, [name]: value };
      setSettingData(updatedBookData);
    }
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  const handleNext = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.formData.timePeriod) {
      errors.timePeriod = "Please enter time period.";
    }
    if (!formData.formData.location) {
      errors.location = "Please select a location.";
    }
    if (!formData.formData.additionalDetails) {
      errors.additionalDetails = "Please select additional details.";
    }
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or proceed
      navigate("/plotsummary");
    } else {
      // Update the validation errors state
      setValidationErrors(errors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.email = email;
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "http://10.16.16.108:7000/api/createbooks",
        formData
      );

      setSetting(response.data);
    } catch (error) {
      console.error("Error submitting settings data:", error);
    }
  };
  const handleNextUpdate = (e) => {
    navigate(`/plotsummary/${id}`);
  };
  const handlePrevious = () => {
    if (id) {
      // If id exists, navigate to /maincharacters/:id
      navigate(`/maincharacters/${id}`);
    } else {
      // If id doesn't exist, navigate to /maincharacters
      navigate("/maincharacters");
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
              {/* <Stepper activeStep={1} disabledColor={""}>
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
              </Stepper> */}
              <CustomStepper activeStep={3} disabledColor={"#cccccc"} />
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Setting</h2>
              <div className={createnewbookStyle.book_details_from}>
                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                <Form onSubmit={handleSubmit}>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="6">
                      <Form.Label>Time period</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="18th century"
                        name="timePeriod"
                        value={
                          id ? settingData.timePeriod : formData.timePeriod
                        }
                        onChange={handleChange}
                        isInvalid={!!validationErrors.timePeriod}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.timePeriod}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md="6">
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="New York City"
                        name="location"
                        value={id ? settingData.location : formData.location}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.location}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.location}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control
                        type="hidden"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select} ${createnewbookStyle.character_name}`}
                  >
                    <Col md="12">
                      <Form.Label>Additional Details</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Describe the setting's atmosphere, culture, and important landmarks"
                        name="additionalDetails"
                        value={
                          id
                            ? settingData.additionalDetails
                            : formData.additionalDetails
                        }
                        onChange={handleChange}
                        rows={3}
                        isInvalid={!!validationErrors.additionalDetails}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.additionalDetails}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <div className={createnewbookStyle.next_cancel_btns_section}>
                    <div className={createnewbookStyle.next_cancel_btns}>
                      <Button
                        type="submit"
                        className={createnewbookStyle.next_btn}
                        onClick={id ? handleNextUpdate : handleNext}
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

export default Setting;
