import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import YogaFooter from '../YogaPages/YogaFooter';
import YogaNavBar from '../YogaPages/YogaNavBar';
import AdminNavbar from './AdminNavbar';

function EditYogaService() {
    const [service, setService] = useState({
        yid: '',
        yname: '',
        type: '',
        description: ''
    });
    const [currentDate, setCurrentDate] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const serviceId = queryParams.get('id');  // Assuming the id is passed as a query parameter, e.g. ?id=2

    // Get the current date in YYYY-MM-DD format
    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0]; // "YYYY-MM-DD"
        setCurrentDate(formattedDate);

        // Fetch the yoga service data by ID when the component mounts
        if (serviceId) {
            axios.get(`http://localhost:8080/api/v1/yogaservices/getbyid?id=${serviceId}`)
                .then(response => {
                    setService(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the service data!", error);
                });
        }
    }, [serviceId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle the update logic here (for example, send PUT request)
        axios.put(`http://localhost:8080/api/v1/yogaservices/update?id=${serviceId}`, service)
            .then(response => {
                setShowSuccessPopup(true);  // Show the success popup
                setTimeout(() => {
                    setShowSuccessPopup(false);  // Hide the success popup after 3 seconds
                    navigate('/yogaServiceList');  // Redirect to the service list after successful update
                }, 3000);
            })
            .catch(error => {
                console.error("There was an error updating the yoga service!", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService({
            ...service,
            [name]: value
        });
    };

    return (
        <div>
        <AdminNavbar/>
        <div className='flex flex-col items-center justify-center w-full h-full pt-10'>
           
                <div className='w-[700px] h-[650px] flex flex-col shadow-xl justify-between rounded-2xl'>
                    <div className='flex flex-row items-center justify-center w-full h-20 text-xl font-semibold text-white bg-green-900 rounded-t-2xl'>
                        Edit Yoga Service
                    </div>

                    <form className='flex flex-col justify-start h-full gap-4 px-10 pt-10' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <div className='mr-4 text-lg font-semibold'>Yoga service name</div>
                            <input
                                type='text'
                                className='p-2 px-5 text-lg border border-gray-300 rounded-full'
                                placeholder='Enter your yoga service name'
                                id="yname"
                                name="yname"
                                value={service.yname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <div className='mr-4 text-lg font-semibold'>Yoga service type</div>
                            <input
                                type='text'
                                className='p-2 px-5 text-lg border border-gray-300 rounded-full'
                                placeholder='Enter your yoga service type'
                                id="type"
                                name="type"
                                value={service.type}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-col'>
                            <div className='mr-4 text-lg font-semibold'>Yoga service description</div>
                            <textarea
                                className='p-2 px-5 text-lg border border-gray-300 rounded-2xl h-44'
                                placeholder='Enter your yoga service description'
                                id="description"
                                name="description"
                                value={service.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex flex-row justify-between w-full'>
                            <button type='button' className='w-[150px] py-3 mt-4 text-white bg-green-900 rounded'>Cancel</button>
                            <button className='w-[150px] py-3 mt-4 text-white bg-green-900 rounded' type="submit">Submit</button>
                            
                        </div>
                    </form>
                </div>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-green-500">Success!</h3>
                        <p className="mt-2 text-gray-700">Yoga service updated successfully.</p>
                    </div>
                </div>
            )}
        </div>

        <YogaFooter/>
        </div>
    );
}

export default EditYogaService;
