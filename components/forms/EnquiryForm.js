// EnquiryForm.js
import React, { useState } from 'react';

const EnquiryForm = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to server)
    console.log('Form submitted:', { name, email, message });
    // Close the form
    onClose();
  };

  return (
    <div className={`enquiry-form ${isOpen ? 'open' : ''}`}>
    <form onSubmit={handleSubmit}>
      <div className='row'>
      <div className="mb-3 col-4">
        <input type="text" className="form-control" placeholder="Company Name" name="firstName" required />
      </div>
      <div className="mb-3 col-4 ">
        <input type="text" className="form-control" placeholder="Company Email" name="lastName" required />
      </div>
      {/* <div className="mb-3 col-4">
      <input type="text" className="form-control" placeholder="Company Email" name="lastName" required /> 
      </div> */}
     
      <div className="mb-3 col-4">
        {/* <span className='label'>Company Name</span> */}
        
      </div>
      <br></br>
     
      <div className="mb-8 col-8">
      <input type="text" className="form-control" placeholder="Add Your Comment" name="companyName" required />
      </div>
      </div>
      <br></br>
      <button type="submit" className="btn btn-primary">ENQUIRY NOW</button>
      <br></br>
    </form>
  </div>  );
};

export default EnquiryForm;
