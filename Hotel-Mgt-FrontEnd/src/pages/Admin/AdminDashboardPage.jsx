import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/all"
        );
        setUsers(response.data.body);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/auth/delete/${email}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== email));
    } catch (error) {
      setError("Failed to delete the user. Please try again.");
    }
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-green-900">
          Admin Dashboard
        </h1>
        {users.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-white bg-green-900">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-white bg-green-900">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-white bg-green-900">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-white bg-green-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="border-b border-gray-300">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3">
                  <button
                      onClick={() => handleDelete(user.email)}
                      className="px-4 py-2 text-black bg-green-400 rounded hover:bg-green-800"
                  >
                      Delete
                  </button> 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[300px] p-6 bg-white rounded-lg text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Failed to delete user.
            </h2>
            <p>Please try again later.</p>
            <button
              onClick={closeError}
              className="px-4 py-2 mt-4 text-white bg-red-700 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
