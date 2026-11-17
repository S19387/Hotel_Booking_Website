import React, { useState } from "react";
import YogaNavBar from "../YogaPages/YogaNavBar";
import YogaFooter from "../YogaPages/YogaFooter";
import AdminNavbar from "./AdminNavbar";

function AddInstructor() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bioDescription, setBioDescription] = useState("");
  const [certifications, setCertifications] = useState("");
  const [specializations, setSpecializations] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [isUpdating, setIsUpdating] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUpdating(true);
    // Constructing the request body
    const requestBody = {
      user: {
        email,
        password: generatePassword(),
        name,
      },
      instructor: {
        email,
        name,
        bioDescription,
        certifications,
        specializations,
      },
    };

    try {
      // Sending POST request to the backend
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/saveInstructor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      // Checking if the response is OK
      if (response.ok) {
        const data = await response.json();
        setStatusMessage(
          data.headers.status[0] || "Instructor added successfully!"
        ); // Displaying success message

        // Show success popup
        setShowPopup(true);

        // Clear form fields
        setEmail("");
        setName("");
        setBioDescription("");
        setCertifications("");
        setSpecializations("");
      } else {
        const errorData = await response.json();
        setStatusMessage(errorData.message || "Failed to add instructor.");
      }
    } catch (error) {
      setStatusMessage("Error occurred while saving instructor");
      setIsUpdating(false);
    } finally {
      setIsUpdating(false);
    }
  };

  function generatePassword(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*?";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <AdminNavbar />

      <div className="flex flex-row items-center justify-center w-screen pt-5">
        <form
          className="flex flex-col w-[700px] h-[700px] shadow-xl justify-between rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row items-center justify-center w-full h-20 text-xl font-semibold text-white bg-green-900 rounded-t-xl">
            Add Yoga Instructor
          </div>
          <div className="flex flex-col justify-start h-full gap-4 px-10 py-10">
            <div className="flex flex-col">
              <div className="mr-4 text-lg font-semibold">Email address</div>
              <input
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Enter instructor email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="mr-4 text-lg font-semibold">Instructor name</div>
              <input
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Enter instructor name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="mr-4 text-lg font-semibold">
                Instructor bio description
              </div>
              <textarea
                className="p-2 px-5 text-lg border border-gray-300 rounded-xl"
                placeholder="Enter instructor bio description"
                type="text"
                value={bioDescription}
                onChange={(e) => setBioDescription(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="mr-4 text-lg font-semibold">
                Instructor certification
              </div>
              <input
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Enter instructor certifications"
                type="text"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="mr-4 text-lg font-semibold">
                Instructor specializations
              </div>
              <input
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Enter instructor specializations"
                type="text"
                value={specializations}
                onChange={(e) => setSpecializations(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-row justify-between w-full">
              <button
                type="button"
                className="w-[150px] py-3 mt-4 text-white bg-green-900 rounded"
                onClick={() => {
                  setEmail("");
                  setName("");
                  setBioDescription("");
                  setCertifications("");
                  setSpecializations("");
                }}
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                className="w-[150px] py-3 mt-4 text-white bg-green-900 rounded"
                type="submit"
              >
                {isUpdating ? "Updating" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="flex flex-col p-6 bg-white rounded shadow-lg items-center">
            <h3 className="text-xl text-green-900">
              Instructor added successfully!
            </h3>
            <button
              className="px-4 py-2 mt-4 text-white bg-green-900 rounded"
              onClick={closePopup}
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

export default AddInstructor;
