import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InstructorNavbar from './InstructorNavbar';
import YogaFooter from '../YogaPages/YogaFooter';

function EditeSchedule() {
    const { sid } = useParams();
    const [schedule, setSchedule] = useState({
        email: '',
        startTime: '',
        endTime: '',
        price: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        sdate: ''
    });

    // Fetch schedule details by ID on component mount
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/schedule/getbyid?sId=${sid}`)
            .then((response) => response.json())
            .then((data) => setSchedule(data))
            .catch((error) => console.error('Error fetching schedule:', error));
    }, [sid]);

    // Handle changes to form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Send updated data to the server
        fetch(`http://localhost:8080/api/v1/schedule/update?sId=${sid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                alert('Schedule updated successfully');
            })
            .catch(error => console.error('Error updating schedule:', error));
    };

    return (
        <div>
        <InstructorNavbar/>
        <div className="min-h-screen p-8 bg-gray-100">
            <h2 className="mb-8 text-3xl font-semibold text-center text-gray-700">Edit Schedule</h2>
            <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-600">Email</label>
                    <input type="text" name="email" value={schedule.email} onChange={handleChange} className="p-2 text-gray-700 bg-gray-100 border rounded-full" />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-600">Start Time</label>
                    <input type="text" name="startTime" value={schedule.startTime} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-600">End Time</label>
                    <input type="text" name="endTime" value={schedule.endTime} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-600">Price</label>
                    <input type="number" name="price" value={schedule.price} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                </div>

                {/* Displaying Firebase images */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-600">Image 1</label>
                        <input type="text" name="image1" value={schedule.image1} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-600">Image 2</label>
                        <input type="text" name="image2" value={schedule.image2} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-600">Image 3</label>
                        <input type="text" name="image3" value={schedule.image3} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium text-gray-600">Image 4</label>
                        <input type="text" name="image4" value={schedule.image4} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-600">Date</label>
                    <input type="date" name="sdate" value={schedule.sdate} onChange={handleChange} className="p-2 text-gray-700 border rounded-full" />
                </div>

                <button type="submit" className="w-full p-2 mt-4 text-white bg-green-900 rounded-full hover:bg-blue-700">
                    Save Changes
                </button>
            </form>
        </div>
        <YogaFooter/>
        </div>
    );
}

export default EditeSchedule;
