import React, { useState } from 'react';
import YogaFooter from '../YogaPages/YogaFooter';
import AdminNavbar from './AdminNavbar';

function YogaServiceAdd() {
  const [yname, setYname] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!yname.trim() || !type.trim() || !description.trim()) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const closeError = () => setError('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const yogaServiceData = {
      yname: yname.trim(),
      type: type.trim(),
      description: description.trim(),
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/yogaservices/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(yogaServiceData),
      });
      if (!response.ok) throw new Error('Failed to add yoga service.');

      // Clear form fields after successful submission
      setYname('');
      setType('');
      setDescription('');

      // Show success popup
      setShowSuccessPopup(true);

      setTimeout(() => setShowSuccessPopup(false), 4000);
    } catch (error) {
      console.error('Error adding yoga service:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <AdminNavbar />

      <div className="flex flex-row items-center justify-center w-screen pt-5">
        <form
          className="flex flex-col w-[700px] h-[650px] shadow-xl justify-between rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row items-center justify-center w-full h-20 text-xl font-semibold text-white bg-green-900 rounded-t-xl">
            Add Yoga Service
          </div>

          <div className="flex flex-col justify-start h-full gap-4 px-10 py-10">
            <div className="flex flex-col">
              <label className="mr-4 text-lg font-semibold" htmlFor="yname">
                Yoga Service Name
              </label>
              <input
                id="yname"
                type="text"
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Enter your yoga service name"
                value={yname}
                onChange={(e) => setYname(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mr-4 text-lg font-semibold" htmlFor="type">
                Yoga Service Type
              </label>
              <input
                id="type"
                type="text"
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Enter your yoga service type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="mr-4 text-lg font-semibold" htmlFor="description">
                Yoga Service Description
              </label>
              <textarea
                id="description"
                className="p-2 px-5 text-lg border border-gray-300 rounded-2xl h-44"
                placeholder="Enter your yoga service description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-row justify-between w-full">
              <button
                type="button"
                className="w-[150px] py-3 mt-4 text-white bg-green-900 rounded hover:bg-gray-600"
                onClick={() => {
                  setYname('');
                  setType('');
                  setDescription('');
                }}
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting}
                className={`w-[150px] py-3 mt-4 text-white rounded ${
                  isSubmitting ? 'bg-gray-400' : 'bg-green-900 hover:bg-green-700'
                }`}
                type="submit"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[300px] p-6 bg-white rounded-lg text-center">
            <h2 className="mb-4 text-2xl font-semibold text-red-700">Error</h2>
            <p>{error}</p>
            <button
              onClick={closeError}
              className="px-4 py-2 mt-4 text-white bg-red-700 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-5 text-center bg-white rounded shadow-lg">
            <p className="text-lg font-semibold text-green-700">
              Yoga Service added successfully!
            </p>
            <button
              className="px-4 py-2 mt-4 text-white bg-green-900 rounded"
              onClick={() => setShowSuccessPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <YogaFooter />
    </div>
  );
}

export default YogaServiceAdd;
