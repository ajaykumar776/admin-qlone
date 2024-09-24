import React, { useState } from 'react';
import axios from 'axios';
import { addConfig } from '../Actions/api';

const AddConfigForm = () => {
  const [configType, setConfigType] = useState('');
  const [configValues, setConfigValues] = useState(''); // To hold the JSON object as a string
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Prepare the data to be sent to the API
    let parsedConfigValues;
    try {
      parsedConfigValues = JSON.parse(configValues); // Parse the JSON string to an object
    } catch (error) {
      setErrorMessage('Invalid JSON format for config values.');
      return;
    }

    const configData = {
      config_type: configType,
      config_values: [parsedConfigValues], // Use the parsed object directly
    };

    try {
      const response = await addConfig(configData);
      setSuccessMessage('Configuration added successfully!');
      setConfigType('');
      setConfigValues('');
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        setErrorMessage('Error adding configuration: ' + error.response.data.message);
      } else if (error.request) {
        setErrorMessage('No response received from server. Please try again later.');
      } else {
        setErrorMessage('Error creating request: ' + error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add Configuration</h2>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="configType">Config Type</label>
          <input
            type="text"
            id="configType"
            value={configType}
            onChange={(e) => setConfigType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter config type"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700" htmlFor="configValues">Config Values (JSON)</label>
          <textarea
            id="configValues"
            rows="4"
            value={configValues}
            onChange={(e) => setConfigValues(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder='{"per_request": 3}' // Example placeholder
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Config
        </button>
      </form>
    </div>
  );
};

export default AddConfigForm;
