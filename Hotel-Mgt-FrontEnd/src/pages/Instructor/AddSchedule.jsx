import React, { useState, useEffect, useRef } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import YogaNavBar from "../YogaPages/YogaNavBar";
import YogaFooter from "../YogaPages/YogaFooter";
import { storage } from "../../configs/firebase";
import InstructorNavbar from "./InstructorNavbar";

function AddSchedule() {
  const email = localStorage.getItem("email");
  const today = new Date();
  const [formData, setFormData] = useState({
    yid: 1,
    email: email,
    startTime: "07:00:00",
    endTime: "08:00:00",
    sdate: today,
    price: 25.0,
  });
  const [yogaServices, setYogaServices] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchYogaServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/yogaservices/getall"
        );
        const data = await response.json();
        if (data.body) setYogaServices(data.body);
      } catch (error) {
        console.error("Error fetching yoga services:", error);
      }
    };
    fetchYogaServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => {
      const combinedImages = [...prevImages, ...selectedImages].slice(0, 4);
      return combinedImages;
    });
  };

  const uploadImages = async () => {
    const urls = [];
    for (const image of images) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(storageRef);
      urls.push(downloadUrl);
    }
    console.log("Uploaded Image URLs:", urls);
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setErrorMessage("Please upload at least one image.");
      return;
    }

    setUploading(true);
    try {
      const imageUrls = await uploadImages();
      const updatedFormData = {
        ...formData,
        image1: imageUrls[0] || null,
        image2: imageUrls[1] || null,
        image3: imageUrls[2] || null,
        image4: imageUrls[3] || null,
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/schedule/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(`Schedule added successfully! ID: ${data.sid}`);
      } else {
        setErrorMessage("Failed to add schedule");
      }
    } catch (error) {
      console.error("Error uploading images or adding schedule:", error);
      setErrorMessage("An error occurred while adding the schedule");
    } finally {
      setUploading(false);
      setImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
    };
      setFormData({
        yid: 1,
        email: email,
        startTime: "07:00:00",
        endTime: "08:00:00",
        sdate: new Date(),
        price: 25.0,
      });
    }
  };

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="flex flex-col items-center justify-center w-screen pt-5">
      <InstructorNavbar />
      <form
        className="flex flex-col w-[700px] h-auto shadow-xl justify-between rounded-xl mt-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-row items-center justify-center w-full h-20 text-xl font-semibold text-white bg-green-900 rounded-t-xl">
          Add Schedule
        </div>
        <div className="flex flex-col justify-start h-full gap-4 px-10 py-10">
          {/* Select Yoga Service */}
          <div>
            <label className="mr-4 text-lg font-semibold">
              Select Yoga Service
            </label>
            <select
              value={formData.yid}
              onChange={(e) =>
                setFormData({ ...formData, yid: e.target.value })
              }
              className="w-full p-3 px-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a yoga service
              </option>
              {yogaServices.map((service) => (
                <option key={service.yid} value={service.yid}>
                  {service.yname}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="mr-4 text-lg font-semibold">
              Upload Images (1-4)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full p-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <div className="mr-4 text-lg font-semibold">Instructor email</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Enter your email address"
            />
          </div>

          <div className="flex flex-col">
            <div className="mr-4 text-lg font-semibold">
              Schedule start time
            </div>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Enter schedule start time"
            />
          </div>

          <div className="flex flex-col">
            <div className="mr-4 text-lg font-semibold">Schedule end time</div>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Enter schedule end time"
            />
          </div>

          <div className="flex flex-col">
            <div className="mr-4 text-lg font-semibold">Schedule date</div>
            <input
              type="date"
              name="sdate"
              value={formData.sdate}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Enter schedule date"
            />
          </div>

          <div className="flex flex-col">
            <div className="mr-4 text-lg font-semibold">Schedule price</div>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Enter schedule price"
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-row justify-between w-full">
            <button
              type="button"
              className="w-[150px] py-3 mt-4 text-white bg-green-900 rounded"
            >
              Cancel
            </button>
            <button
              className="w-[150px] py-3 mt-4 text-white bg-green-900 rounded"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Save Schedule"}
            </button>
          </div>
        </div>
      </form>
      {successMessage && (
        <div className="fixed px-4 py-2 text-white bg-green-500 rounded-lg shadow-lg bottom-10 animate-bounce">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed px-4 py-2 text-white bg-red-500 rounded-lg shadow-lg bottom-10 animate-bounce">
          {errorMessage}
        </div>
      )}
      <YogaFooter />
    </div>
  );
}

export default AddSchedule;
