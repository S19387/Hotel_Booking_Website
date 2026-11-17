import React, { useEffect, useState } from 'react'
import InstructorNavbar from './InstructorNavbar';

const BookingList = () => {
    const [bookings, setBookings] = useState([]); // State to store the data
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const email = localStorage.getItem("email");
        
        fetch(`http://localhost:8080/api/v1/yogaservicebookings/by-email?email=${encodeURIComponent(
          email
        )}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setBookings(data); // Set the data to state
                setLoading(false); // Turn off loading
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
        <InstructorNavbar/>
        <div className="min-h-screen p-4 bg-gray-100">
            <h1 className="pt-2 mb-4 text-2xl font-bold text-center">Yoga Service Bookings</h1>
            {loading ? (
                <p className="text-lg text-center text-gray-600">Loading...</p>
            ) : bookings.length === 0 ? (
                <p className="text-lg text-center text-red-500">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-green-900">
                            <tr>
                                <th className="px-4 py-2 text-sm font-semibold text-left text-white">Service Booking ID</th>
                                <th className="px-4 py-2 text-sm font-semibold text-left text-white">Email</th>
                                <th className="px-4 py-2 text-sm font-semibold text-left text-white">Date</th>
                                <th className="px-4 py-2 text-sm font-semibold text-left text-white">Session ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(booking => (
                                <tr
                                    key={booking.servBId}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="px-4 py-2 text-sm text-gray-800">{booking.servBId}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{booking.email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{booking.todayDate}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{booking.sid}</td>
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

export default BookingList