import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import emailjs from "@emailjs/browser";
import './ContactForm.css';

const ContactForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    messageType: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendMail = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.messageType || !formData.message) {
      alert("All fields are required!");
      return;
    }
    
    const serviceID = "service_dpsybzl"; // change to off axis gmail account service ID
    const templateID = "template_s7qbani"; // change to off axis template ID

    emailjs
      .send(serviceID, templateID, formData, "0x_tphVFEiTXacJC0") // change to off axis account public key
      .then((res: { status: number; text: string }) => {
        setFormData({ firstName: "", lastName: "", email: "", messageType: "", message: "" });
        console.log(res);
        alert("Your message was sent successfully!!");
        navigate("/");
      })
      .catch((err: Error) => console.error(err));
  };

  return (
    <div className="form-container">
      <h2 id="h2Contact">Contact Off Axis Gigs</h2>
        <div className='form-group-parent'>
          <div className="form-group-child">
            <div className="form-element">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group-child">
            <div className="form-element">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-element">
          <h5>Email</h5>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-element">
          <h5>What is your message regarding?</h5>
          <select
            id="messageType"
            name="messageType"
            value={formData.messageType}
            onChange={handleChange}
            required
          >
            <option value="I can't find my tickets">
              I can't find my tickets
            </option>
            <option value="Ticket Query">
              Ticket Query
            </option>
            <option value="Press Enquiry">
              Press Enquiry
            </option>
            <option value="General/Other Questions">
              General/Other Questions
            </option>
          </select>
        </div>

        <div className="form-element">
          <h5>Message</h5>
          <textarea
            id="message"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      <button className="gradientButtonContact" onClick={sendMail}>
        Submit
      </button>
    </div>
  );
};

export default ContactForm;
