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
// import { useNavigate, useParams } from "react-router-dom";
// import Setting from "../Createnewbook/Setting";
// import { useDispatch, useSelector } from "react-redux";
// // import { updatMainCharacterField, selectMainCharacterData } from '../../redux/maincharacterSlice';
// import {
//   updateCreateNewBookField,
//   selectCreateNewBookData,
// } from "../../redux/createnewbookSlice";
// import CustomStepper from "./CustomStepper";

// function Maincharacters() {
//   const { id } = useParams(); // Get the ID from the URL
//   const navigate = useNavigate();
//   const email = localStorage.getItem("userEmail");
//   const [Character, setCharacter] = useState(null);
//   // const [formData, setFormData] = useState({
//   //   characterName: '',
//   //   Role: '',
//   //   Description: '',
//   // });
//   const [characterData, setCharacterData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [nextButtonClickedCharacter, setNextButtonClickedCharacter] =
//     useState(false);
//   const [validated, setValidated] = useState(false);

//   const [validationErrors, setValidationErrors] = useState({
//     characterName: "",
//     Role: "",
//     Description: "",
//   });
//   const dispatch = useDispatch();
//   const formData = useSelector(selectCreateNewBookData);
//   useEffect(() => {
//     // Fetch the existing record based on the ID if it exists
//     if (id) {
//       axios
//         .get(`http://10.16.16.108:7000/api/editbook/${id}`)
//         .then((response) => {
//           setCharacterData(response.data);
//           dispatch(
//             updateCreateNewBookField({
//               field: "characterName",
//               value: response.data.characterName,
//             })
//           );
//           dispatch(
//             updateCreateNewBookField({
//               field: "Role",
//               value: response.data.Role,
//             })
//           );
//           dispatch(
//             updateCreateNewBookField({
//               field: "Description",
//               value: response.data.Description,
//             })
//           );
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [id]);
//   useEffect(() => {
//     if (nextButtonClickedCharacter) {
//       // Navigate to the next step or do any other logic here
//       navigate("/setting");
//     }
//   }, [nextButtonClickedCharacter]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(updateCreateNewBookField({ field: name, value: value }));
//     if (id) {
//       const updatedBookData = { ...characterData, [name]: value };
//       setCharacterData(updatedBookData);
//     }
//     setValidationErrors({
//       ...validationErrors,
//       [name]: "",
//     });
//   };
//   // const handleNext = (e) => {
//   //   // Add your logic for "Next" button action here
//   //   // For example, you can navigate to the next step of your form
//   //   setNextButtonClicked(true);
//   //   navigate('/setting');

//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       formData.email = email;
//       // Make a POST request to your API endpoint
//       const response = await axios.post(
//         "http://10.16.16.108:7000/api/createbooks",
//         formData
//       );

//       setCharacter(response.data);
//     } catch (error) {
//       console.error("Error submitting character data:", error);
//     }
//   };

//   const handleNext = (e) => {
//     e.preventDefault();

//     const errors = {};
//     if (!formData.formData.characterName) {
//       errors.characterName = "Please enter character name.";
//     }
//     if (!formData.formData.Role) {
//       errors.Role = "Please select a role.";
//     }
//     if (!formData.formData.Description) {
//       errors.Description = "Please select a description.";
//     }
//     if (Object.keys(errors).length === 0) {
//       // Form is valid, submit data or proceed
//       navigate("/setting");
//     } else {
//       // Update the validation errors state
//       setValidationErrors(errors);
//     }
//   };

//   const handleNextUpdate = (e) => {
//     navigate(`/setting/${id}`);
//   };

//   const handleCancel = (e) => {
//     navigate("/mybooks");
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
//               {/* <Stepper activeStep={2} disabledColor={"#cccccc"} >
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
//               <CustomStepper activeStep={2} disabledColor={"#cccccc"} />
//             </div>
//             <div className={createnewbookStyle.book_details_from_section}>
//               <h2>Main Characters</h2>
//               <div className={createnewbookStyle.book_details_from}>
//                 {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
//                 {/* <Form onSubmit={handleSubmit}> */}
//                 <Form validated={validated}>
//                   <Row
//                     className={`mb-12 ${createnewbookStyle.book_details_select}`}
//                   >
//                     <Col md="6">
//                       <Form.Label>Character name</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         placeholder="Enter character name"
//                         name="characterName"
//                         value={
//                           id
//                             ? characterData.characterName
//                             : formData.characterName
//                         }
//                         onChange={handleChange}
//                         isInvalid={!!validationErrors.characterName}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.characterName}
//                       </Form.Control.Feedback>
//                     </Col>
//                     <Col md="6">
//                       <Form.Label>Role</Form.Label>
//                       <Form.Select
//                         aria-label="Children"
//                         as="select"
//                         name="Role"
//                         value={id ? characterData.Role : formData.Role}
//                         onChange={handleChange}
//                         required
//                         isInvalid={!!validationErrors.Role}
//                       >
//                         <option value="">Select an option</option>
//                         <option value="Antagonist">Antagonist</option>
//                         <option value="Protagonist">Protagonist</option>
//                         <option value="Supporting Character">
//                           Supporting Character
//                         </option>
//                         <option value="Mentor">Mentor</option>
//                         <option value="Love Interest">Love Interest</option>
//                       </Form.Select>
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.Role}
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
//                       <Form.Label>Description</Form.Label>
//                       <Form.Control
//                         as="textarea"
//                         placeholder="Describe the character's appearance, personality"
//                         rows={3}
//                         name="Description"
//                         value={
//                           id ? characterData.Description : formData.Description
//                         }
//                         onChange={handleChange}
//                         required
//                         isInvalid={!!validationErrors.Description}
//                       />
//                       <Form.Control.Feedback type="invalid">
//                         {" "}
//                         {validationErrors.Description}
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
//                         type="button"
//                         className={createnewbookStyle.cancel_btn}
//                         onClick={handleCancel}
//                       >
//                         Cancel
//                       </Button>
//                     </div>
//                     <div className={createnewbookStyle.next_cancel_btns}>
//                       <Button
//                         type="submit"
//                         className={createnewbookStyle.next_btn}
//                       >
//                         Add
//                       </Button>
//                       <Button
//                         type="submit"
//                         className={createnewbookStyle.cancel_btn}
//                       >
//                         Remove
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
// export default Maincharacters;

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
import { useNavigate, useParams } from "react-router-dom";
import Setting from "../Createnewbook/Setting";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/common/Header";
import HeaderLogin from "../common/Header_login";
import Footer from "../../components/common/Footer";

// import { updatMainCharacterField, selectMainCharacterData } from '../../redux/maincharacterSlice';
import {
  updateCreateNewBookField,
  selectCreateNewBookData,
} from "../../redux/createnewbookSlice";
import CustomStepper from "./CustomStepper";

function Maincharacters() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const [Character, setCharacter] = useState(null);
  // const [formData, setFormData] = useState({
  //   characterName: '',
  //   Role: '',
  //   Description: '',
  // });
  const userEmail = localStorage.getItem("userEmail");

  const [characterData, setCharacterData] = useState({});
  const [errors, setErrors] = useState({});
  const [nextButtonClickedCharacter, setNextButtonClickedCharacter] =
    useState(false);
  const [validated, setValidated] = useState(false);

  const [validationErrors, setValidationErrors] = useState({
    characterName: "",
    Role: "",
    Description: "",
  });
  const dispatch = useDispatch();
  const formData = useSelector(selectCreateNewBookData);
  useEffect(() => {
    // Fetch the existing record based on the ID if it exists
    if (id) {
      axios
        .get(`http://10.16.16.108:7000/api/editbook/${id}`)
        .then((response) => {
          setCharacterData(response.data);
          dispatch(
            updateCreateNewBookField({
              field: "characterName",
              value: response.data.characterName,
            })
          );
          dispatch(
            updateCreateNewBookField({
              field: "Role",
              value: response.data.Role,
            })
          );
          dispatch(
            updateCreateNewBookField({
              field: "Description",
              value: response.data.Description,
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);
  useEffect(() => {
    if (nextButtonClickedCharacter) {
      // Navigate to the next step or do any other logic here
      navigate("/setting");
    }
  }, [nextButtonClickedCharacter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCreateNewBookField({ field: name, value: value }));
    if (id) {
      const updatedBookData = { ...characterData, [name]: value };
      setCharacterData(updatedBookData);
    }
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  // const handleNext = (e) => {
  //   // Add your logic for "Next" button action here
  //   // For example, you can navigate to the next step of your form
  //   setNextButtonClicked(true);
  //   navigate('/setting');

  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.email = email;
      // Make a POST request to your API endpoint
      const response = await axios.post(
        "http://10.16.16.108:7000/api/createbooks",
        formData
      );

      setCharacter(response.data);
    } catch (error) {
      console.error("Error submitting character data:", error);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.formData.characterName) {
      errors.characterName = "Please enter character name.";
    }
    if (!formData.formData.Role) {
      errors.Role = "Please select a role.";
    }
    if (!formData.formData.Description) {
      errors.Description = "Please select a description.";
    }
    if (Object.keys(errors).length === 0) {
      // Form is valid, submit data or proceed
      navigate("/setting");
    } else {
      // Update the validation errors state
      setValidationErrors(errors);
    }
  };

  const handleNextUpdate = (e) => {
    navigate(`/setting/${id}`);
  };

  const handleCancel = (e) => {
    navigate("/createnewbookpage");
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
              {/* <Stepper activeStep={2} disabledColor={"#cccccc"} >
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
              <CustomStepper activeStep={2} disabledColor={"#cccccc"} />
            </div>
            <div className={createnewbookStyle.book_details_from_section}>
              <h2>Main Characters</h2>
              <div className={createnewbookStyle.book_details_from}>
                {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                {/* <Form onSubmit={handleSubmit}> */}
                <Form validated={validated}>
                  <Row
                    className={`mb-12 ${createnewbookStyle.book_details_select}`}
                  >
                    <Col md="6">
                      <Form.Label>Character name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter character name"
                        name="characterName"
                        value={
                          id
                            ? characterData.characterName
                            : formData.characterName
                        }
                        onChange={handleChange}
                        isInvalid={!!validationErrors.characterName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.characterName}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md="6">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        aria-label="Children"
                        as="select"
                        name="Role"
                        value={id ? characterData.Role : formData.Role}
                        onChange={handleChange}
                        required
                        isInvalid={!!validationErrors.Role}
                      >
                        <option value="">Select an option</option>
                        <option value="Antagonist">Antagonist</option>
                        <option value="Protagonist">Protagonist</option>
                        <option value="Supporting Character">
                          Supporting Character
                        </option>
                        <option value="Mentor">Mentor</option>
                        <option value="Love Interest">Love Interest</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.Role}
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
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Describe the character's appearance, personality"
                        rows={3}
                        name="Description"
                        value={
                          id ? characterData.Description : formData.Description
                        }
                        onChange={handleChange}
                        required
                        isInvalid={!!validationErrors.Description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {" "}
                        {validationErrors.Description}
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
                        type="button"
                        className={createnewbookStyle.cancel_btn}
                        onClick={handleCancel}
                      >
                        Previous
                      </Button>
                    </div>
                    <div className={createnewbookStyle.next_cancel_btns}>
                      <Button
                        type="submit"
                        className={createnewbookStyle.next_btn}
                      >
                        Add
                      </Button>
                      <Button
                        type="submit"
                        className={createnewbookStyle.cancel_btn}
                      >
                        Remove
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
export default Maincharacters;
