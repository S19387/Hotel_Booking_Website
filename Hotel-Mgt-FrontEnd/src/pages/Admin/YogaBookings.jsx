import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

function YogaBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(''); // State to handle errors

  useEffect(() => {
    // Fetch data from the API when the component loads
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/yogaservicebookings/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="pt-2 mb-6 text-2xl font-bold text-center">Yoga Service Bookings</h1>

        {/* Loading State */}
        {loading && (
          <p className="text-lg text-center text-gray-600">Loading...</p>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center p-4 bg-red-100 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && bookings.length === 0 && (
          <p className="text-lg text-center text-red-500">No bookings found.</p>
        )}

        {/* Table of Bookings */}
        {!loading && !error && bookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-green-900">
                <tr>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-white">Service Booking ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-white">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-white">Date</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-white">Session ID</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.servBId}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3 text-sm text-gray-800">{booking.servBId}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{booking.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{booking.todayDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{booking.sid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default YogaBookings;
