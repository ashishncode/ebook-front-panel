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
// import { useNavigate, useParams } from "react-router-dom";
// import CustomStepper from "./CustomStepper";

// function Plotsummary() {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get the ID from the URL

//   const email = localStorage.getItem("userEmail");
//   const [Setting, setSetting] = useState(null);
//   const [plotData, setPlotData] = useState({});
//   const [validationErrors, setValidationErrors] = useState({
//     plotSummary: "",
//   });

//   // const [formData, setFormData] = useState({
//   //   plotSummary: '',
//   // });
//   const dispatch = useDispatch();
//   const formData = useSelector(selectCreateNewBookData);
//   useEffect(() => {
//     // Fetch the existing record based on the ID if it exists
//     if (id) {
//       axios
//         .get(`http://10.16.16.108:7000/api/editbook/${id}`)
//         .then((response) => {
//           setPlotData(response.data);
//           dispatch(
//             updateCreateNewBookField({
//               field: "plotSummary",
//               value: response.data.plotSummary,
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
//       const updatedBookData = { ...plotData, [name]: value };
//       setPlotData(updatedBookData);
//     }
//     setValidationErrors({
//       ...validationErrors,
//       [name]: "",
//     });
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
//   const handleNext = (e) => {
//     e.preventDefault();
//     const errors = {};
//     if (!formData.formData.plotSummary) {
//       errors.plotSummary = "Please enter plot summary.";
//     }
//     if (Object.keys(errors).length === 0) {
//       // Form is valid, submit data or proceed
//       navigate("/writingpreferences");
//     } else {
//       // Update the validation errors state
//       setValidationErrors(errors);
//     }
//   };
//   const handleNextUpdate = (e) => {
//     // Clone the existing formData
//     // if (id) {
//     //   // Dispatch individual updates for each field in bookData
//     //   Object.entries(characterData).forEach(([field, value]) => {
//     //     dispatch(updateCreateNewBookField({ field, value }));
//     //   });
//     // }
//     navigate(`/writingpreferences/${id}`);
//   };
//   const handlePrevious = () => {
//     if (id) {
//       // If id exists, navigate to /maincharacters/:id
//       navigate(`/setting/${id}`);
//     } else {
//       // If id doesn't exist, navigate to /maincharacters
//       navigate("/setting");
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
//               <CustomStepper activeStep={4} disabledColor={"#cccccc"} />
//             </div>
//             <div className={createnewbookStyle.book_details_from_section}>
//               <h2>Plot Summary</h2>
//               <div className={createnewbookStyle.book_details_from}>
//                 {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
//                 <Form onSubmit={handleSubmit}>
//                   <Row
//                     className={`mb-12 ${createnewbookStyle.book_details_select} ${createnewbookStyle.plot_summary_textarea}`}
//                   >
//                     <Col md="12">
//                       <div className={createnewbookStyle.plot_summary_title}>
//                         <Form.Label>
//                           Plot Summary
//                           <div className={createnewbookStyle.tooltip_icon}>
//                             <Tooltip placement="top">
//                               <Button>
//                                 <img src={TooltipIcon} />
//                               </Button>
//                             </Tooltip>
//                           </div>
//                         </Form.Label>
//                       </div>
//                       <Form.Control
//                         as="textarea"
//                         placeholder="Briefly summarize your book's plot or provide an outline"
//                         name="plotSummary"
//                         value={id ? plotData.plotSummary : formData.plotSummary}
//                         onChange={handleChange}
//                         rows={3}
//                         required
//                         isInvalid={!!validationErrors.plotSummary}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.plotSummary}
//                       </Form.Control.Feedback>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Form.Group as={Col} md="12" controlId="validationCustom04">
//                       <Form.Control type="hidden" name="email" value={email} />
//                     </Form.Group>
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

// export default Plotsummary;

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
import { useNavigate, useParams } from "react-router-dom";
import CustomStepper from "./CustomStepper";
import Header from "../../components/common/Header";
import HeaderLogin from "../common/Header_login";
import Footer from "../../components/common/Footer";

function Plotsummary() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID from the URL

  const email = localStorage.getItem("userEmail");
  const [Setting, setSetting] = useState(null);
  const [plotData, setPlotData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    plotSummary: "",
  });

  // const [formData, setFormData] = useState({
  //   plotSummary: '',
  // });
  const userEmail = localStorage.getItem("userEmail");

  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);
  useEffect(() => {
    // Fetch the existing record based on the ID if it exists
    if (id) {
      axios
        .get(`http://10.16.16.108:7000/api/editbook/${id}`)
        .then((response) => {
          setPlotData(response.data);
          dispatch(
            updateCreateNewBookField({
              field: "plotSummary",
              value: response.data.plotSummary,
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
      const updatedBookData = { ...plotData, [name]: value };
      setPlotData(updatedBookData);
    }
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
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
  const handleNext = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.formData.plotSummary) {
      errors.plotSummary = "Please enter plot summary.";
    }
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or proceed
      navigate("/writingpreferences");
    } else {
      // Update the validation errors state
      setValidationErrors(errors);
    }
  };
  const handleNextUpdate = (e) => {
    // Clone the existing formData
    // if (id) {
    //   // Dispatch individual updates for each field in bookData
    //   Object.entries(characterData).forEach(([field, value]) => {
    //     dispatch(updateCreateNewBookField({ field, value }));
    //   });
    // }
    navigate(`/writingpreferences/${id}`);
  };
  const handlePrevious = () => {
    if (id) {
      // If id exists, navigate to /maincharacters/:id
      navigate(`/setting/${id}`);
    } else {
      // If id doesn't exist, navigate to /maincharacters
      navigate("/setting");
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
              <CustomStepper activeStep={4} disabledColor={"#cccccc"} />
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Plot Summary</h2>
              <div className={createnewbookStyle.book_details_from}>
                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                <Form onSubmit={handleSubmit}>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select} ${createnewbookStyle.plot_summary_textarea}`}
                  >
                    <Col md="12">
                      <div className={createnewbookStyle.plot_summary_title}>
                        <Form.Label>
                          Plot Summary
                          <div className={createnewbookStyle.tooltip_icon}>
                            <Tooltip placement="top">
                              <Button>
                                <img src={TooltipIcon} />
                              </Button>
                            </Tooltip>
                          </div>
                        </Form.Label>
                      </div>
                      <Form.Control
                        as="textarea"
                        placeholder="Briefly summarize your book's plot or provide an outline"
                        name="plotSummary"
                        value={id ? plotData.plotSummary : formData.plotSummary}
                        onChange={handleChange}
                        rows={3}
                        required
                        isInvalid={!!validationErrors.plotSummary}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.plotSummary}
                      </Form.Control.Feedback>
                    </Col>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Control type="hidden" name="email" value={email} />
                    </Form.Group>
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

export default Plotsummary;
