import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import Row from "react-bootstrap/Row";
import contactStyle from "../../assets/css/contact.module.css";
import AddressIcon from "../../assets/images/address_icon.png";
import Contactinfo from "../../assets/images/contact_info.png";
import Livesupport from "../../assets/images/live_support.png";
import { notification } from "antd";
import { contactForm } from "../../utility/api";

const Contactus = () => {
  const showLoginSuccessNotification = () => {
    notification.success({
      message: "Form submit",
      description: "From submitted successfully.",
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    contactForm(data).then((res) => {
      if (res.status === 200) {
        showLoginSuccessNotification();
        reset();
      }
    });
  };

  return (
    <>
      <div className={contactStyle.contact_map}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14687.734743642492!2d72.55596305!3d23.026206950000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1689231830862!5m2!1sen!2sin"
          width="100%"
          height="500"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className={contactStyle.contactus_container}>
        <div className={contactStyle.contact_top_section}>
          <h2>Get in touch</h2>
          <div className={contactStyle.contact_address}>
            <div className={contactStyle.contact_address_text}>
              <div className={contactStyle.address_icon}>
                <img src={AddressIcon} />
              </div>
              <strong>Our Address</strong>
              <p>
                1012 Peb Parkway, Mirpur 2 <br></br>Dhaka, Bangladesh
              </p>
            </div>
            <div className={contactStyle.contact_address_text}>
              <div className={contactStyle.address_icon}>
                <img src={Contactinfo} />
              </div>
              <strong>Contact Info</strong>
              <p>
                Open a chat or give us call at<br></br>{" "}
                <a href="/">310.841.5500</a>
              </p>
            </div>
            <div className={contactStyle.contact_address_text}>
              <div className={contactStyle.address_icon}>
                <img src={Livesupport} />
              </div>
              <strong>Live support</strong>
              <p>
                live chat service<br></br> <a>example@email.com</a>
              </p>
            </div>
          </div>
        </div>
        <div className={contactStyle.contactus_form}>
          <Form noValidate>
            <Row className={`mb-12 ${contactStyle.contactus_fild}`}>
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>Name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  {...register("name", { required: "please enter your name" })}
                />
                {errors.name && (
                  // <Form.Control.Feedback>heklllo</Form.Control.Feedback>
                  <p>{errors.name.message}</p>
                )}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Email*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example@email.com"
                  name="email"
                  {...register("email", { required: "email is required" })}
                />
                {errors.email && (
                  // <Form.Control.Feedback>heklllo</Form.Control.Feedback>
                  <p>{errors.email.message}</p>
                )}
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${contactStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12" controlId="validationCustomSubject">
                <Form.Label>Subject (optional)</Form.Label>
                <InputGroup>
                  <Form.Control
                    name="subject"
                    type="text"
                    placeholder="Write about the subject here.."
                    aria-describedby="Write about the subject here.."
                    {...register("subject")}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a Subject.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className={`mb-12 ${contactStyle.contactus_fild}`}>
              <Form.Group as={Col} md="12">
                <Form.Control
                  as="textarea"
                  placeholder="Your Message"
                  rows={3}
                  name="message"
                  {...register("message", {
                    required: "please enter your message",
                  })}
                />
                {errors.message && (
                  // <Form.Control.Feedback>heklllo</Form.Control.Feedback>
                  <p>{errors.message.message}</p>
                )}
              </Form.Group>
            </Row>
            <div className={contactStyle.send_message_btn}>
              <Button
                className="send_btn"
                type="button"
                onClick={handleSubmit(onSubmit)}
              >
                Send Message
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Contactus;
