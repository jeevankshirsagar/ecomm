// EnquiryPopup.js
import React, { useState } from 'react';
import EnquiryForm from './EnquiryForm';
// import "../forms/EnquiryForm"

const EnquiryPopup = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      {/* <button onClick={handleOpenPopup}>Open Enquiry Form</button> */}
       <h2>ENQUIRY FORM</h2>
      <br></br>
      <h5><b>Personal Details</b></h5>
      <div className='row'>
      <div className="mb-3 col-4">
        <input type="text" className="form-control" placeholder="First Name" name="firstName" required />
      </div>
      <div className="mb-3 col-4 ">
        <input type="text" className="form-control" placeholder="Last Name" name="lastName" required />
      </div>
      <div className="mb-3 col-4">
       
      </div>
      <div className="mb-3 col-4">
        <input type="text" className="form-control" placeholder="Mobile Number" name="email" required />
      </div>
      <div className="mb-3 col-4">
        {/* <span className='label'>Company Name</span> */}
        <input type="text" className="form-control" placeholder="Email" name="companyName" required />
      </div>
      <br></br>
      </div>
       <h5><b>Company Details</b></h5>
      <br></br>
      <EnquiryForm isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default EnquiryPopup;
