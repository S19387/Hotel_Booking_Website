import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import YogaFooter from '../YogaPages/YogaFooter';

function YogaServiceList() {
  const [yogaServices, setYogaServices] = useState([]);
  const [error, setError] = useState(''); // Error state for popup
  const navigate = useNavigate();

  // Fetch all yoga services
  const fetchYogaServices = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/yogaservices/getall');
      setYogaServices(response.data.body);
    } catch (err) {
      console.error("There was an error fetching the data!", err);
      setError('Failed to fetch yoga services. Please try again later.');
    }
  };

  useEffect(() => {
    fetchYogaServices();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/yogaservices/delete?id=${id}`);
      setYogaServices((prevServices) => prevServices.filter((service) => service.yid !== id));
    } catch (err) {
      console.error("There was an error deleting the item!", err);
      setError('Failed to delete the yoga service. Please try again later.');
    }
  };

  // Close error popup
  const closeErrorPopup = () => {
    setError('');
  };

  // Handle edit and navigate to the EditYogaService page
  const handleEdit = (id) => {
    navigate(`/editYogaService?id=${id}`);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container p-6 mx-auto bg-gray-100 rounded-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Yoga Service List</h2>
        <table className="min-w-full overflow-hidden bg-white border-collapse rounded-lg shadow-lg table-auto">
          <thead>
            <tr className="text-white bg-green-900">
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {yogaServices.length > 0 ? (
              yogaServices.map((service) => (
                <tr key={service.yid} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{service.yid}</td>
                  <td className="px-4 py-3">{service.yname}</td>
                  <td className="px-4 py-3">{service.type}</td>
                  <td className="px-4 py-3">{service.description}</td>
                  <td className="px-4 py-3 flex">
                    <button
                      onClick={() => handleEdit(service.yid)}
                      className="px-4 py-2 mr-2 text-white transition-colors duration-200 bg-green-900 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.yid)}
                      className="px-4 py-2 text-white transition-colors duration-200 bg-green-900 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                  No yoga services available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[300px] p-6 bg-white rounded-lg text-center">
            <h2 className="mb-4 text-2xl font-semibold text-red-700">Error</h2>
            <p>{error}</p>
            <button
              onClick={closeErrorPopup}
              className="px-4 py-2 mt-4 text-white bg-red-700 rounded"
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

export default YogaServiceList;
