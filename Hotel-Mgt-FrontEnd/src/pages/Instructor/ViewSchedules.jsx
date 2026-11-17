import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorNavbar from "./InstructorNavbar";
import YogaFooter from "../YogaPages/YogaFooter";

function ViewSchedules() {
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(
      `http://localhost:8080/api/v1/schedule/getbyemail?email=${encodeURIComponent(
        email
      )}`
    )
      .then((response) => response.json())
      .then((data) => setSchedules(data))
      .catch((error) => console.error("Error fetching schedules:", error));
  }, []);

  const handleEdit = (sid) => {
    navigate(`/editeSchedule/${sid}`);
  };

  const handleDelete = (sid) => {
    fetch(`http://localhost:8080/api/v1/schedule/delete?sId=${sid}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setSchedules(schedules.filter((schedule) => schedule.sid !== sid));
          console.log(`Deleted schedule with ID: ${sid}`);
        } else {
          console.error("Failed to delete the schedule");
        }
      })
      .catch((error) => console.error("Error deleting schedule:", error));
  };

  return (
    <div>
      <InstructorNavbar />
      <div className="p-4 min-h-screen">
        <h2 className="flex flex-row items-center justify-center w-full py-5 mb-6 text-2xl font-semibold text-white bg-green-950">
          Schedule Details
        </h2>
        <table className="min-w-full mb-6 bg-white border border-gray-200">
          <thead className="text-white bg-green-900">
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Start Time</th>
              <th className="px-4 py-2 border">End Time</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Image1</th>
              <th className="px-4 py-2 border">Image2</th>
              <th className="px-4 py-2 border">Image3</th>
              <th className="px-4 py-2 border">Image4</th>
              <th className="px-4 py-2 border">Schedule ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.sid} className="text-center hover:bg-green-300">
                <td className="px-4 py-2 border">{schedule.email}</td>
                <td className="px-4 py-2 border">{schedule.startTime}</td>
                <td className="px-4 py-2 border">{schedule.endTime}</td>
                <td className="px-4 py-2 border">${schedule.price}</td>
                <td className="px-4 py-2 border">
                  {schedule.image1 ? (
                    <img
                      src={schedule.image1}
                      alt="Image 1"
                      className="object-cover w-12 h-12"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {schedule.image2 ? (
                    <img
                      src={schedule.image2}
                      alt="Image 2"
                      className="object-cover w-12 h-12"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {schedule.image3 ? (
                    <img
                      src={schedule.image3}
                      alt="Image 3"
                      className="object-cover w-12 h-12"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2 border">
                  {schedule.image4 ? (
                    <img
                      src={schedule.image4}
                      alt="Image 4"
                      className="object-cover w-12 h-12"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-2 border">{schedule.sid}</td>
                <td className="px-4 py-2 border">{schedule.sdate}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleEdit(schedule.sid)}
                    className="px-3 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(schedule.sid)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <YogaFooter />
    </div>
  );
}

export default ViewSchedules;
