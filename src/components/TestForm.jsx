import React, { useState } from 'react';
import axios from 'axios';

// useState is to store the from fields, which we set to empty strings first
const MultiInputForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    title: '',
    description: '',
    duration: '',
    type: '',
  });

  // function that updates the from state when user is typing in the input
  // ...formData (spread operator) makes sure that we don't overwrite existing from data
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents page refresh
  
    try {
      const response = await axios.post('http://localhost:8080/api/activities', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Response:', response);
  
      if (response.status === 201) {
        console.log(' Activity submitted successfully:', response.data);
      } else {
        console.error(' Failed to submit activity:', response.status, response.data);
      }
    } catch (error) {
      // handle different types of errors
      if (error.response) {
        // the server responded with a status code outside of what we want
        console.error(' Server Error:', error.response.status, error.response.data);
      } else if (error.request) {
        // The request was made but no response was received (e.g., server is down)
        console.error(' No response from server. Possible network error:', error.request);
      } else {
        // Something happened in setting up the request
        console.error(' Request setup error:', error.message);
      }
    }
  };
  

  return ( //onSubmit is what triggers handleSubmit()
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username" >UserName:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange} // dynamically updates the state as user types
          required
        />
      </div>
      <div>
        <label htmlFor="title" >Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description" >Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="duration">Duration:</label>
        <input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          required
        />
      </div>      
      <div>
        <label htmlFor="type" className="block text-gray-700 mb-2">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <button id='testSubmit' type="submit">
        Submit
      </button>
    </form>
  );
};

export default MultiInputForm;
