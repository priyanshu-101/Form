import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://form-backend-1z4u.onrender.com/api/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('API response:', response.data);
      // Update registration status
      setRegistrationStatus('User registered successfully!');
      // Optionally, you can reset the form after successful submission
      setFormData({
        username: '',
        email: '',
        password: '',
      });
      // Show popup
      setTimeout(() => {
        setRegistrationStatus('');
      }, 3000); // Hide popup after 3 seconds
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, e.g., display error message to the user
      setRegistrationStatus('Registration failed. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h1>Registration Form</h1>
      <br></br>
      {registrationStatus && (
        <div className="popup">
          <p>{registrationStatus}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
