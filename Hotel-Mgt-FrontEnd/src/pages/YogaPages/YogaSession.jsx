import React, { useEffect, useState } from "react";
import YogaNavBar from "./YogaNavBar";
import YogaFooter from "./YogaFooter";
import Yoga1 from "../../assets/Images/yoga1.jpg";
import Yoga2 from "../../assets/Images/yoga2.jpg";
import Yoga3 from "../../assets/Images/yoga3.jpg";
import Yoga4 from "../../assets/Images/yoga4.jpg";
import { useLocation, useNavigate } from "react-router-dom";

function YogaSession() {
  const [instructor, setinstructor] = useState();

  const navigate = useNavigate();
  const { state } = useLocation();
  const service = state?.service;

  // State to store the index of the currently displayed image
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (service.schedule) {
      const imageArray = [
        service.schedule.image1,
        service.schedule.image2,
        service.schedule.image3,
        service.schedule.image4,
      ].filter(Boolean); // Filter out any undefined or null images
      setImages(imageArray);
    }
  }, [service.schedule]);

  // Handler for the forward arrow
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Handler for the back arrow
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  console.log("service:", service);

  const handleBookNow = () => {
    const sid = service.schedule.sid;
    const email = localStorage.getItem("email");

    navigate("/paymentPage", {
      state: {
        sid,
        email,
        amount: service.schedule.price,
      },
    });
  };

  useEffect(() => {
    getInstructor();
  }, []);

  const getInstructor = async () => {
    try {
      const email = service.schedule.email;
      const response = await fetch(
        `http://localhost:8080/api/v1/instructor/getbio?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const instructorData = await response.json();

      setinstructor(instructorData);
      console.log("Instructor data:", instructor);
    } catch (error) {
      console.error("Error fetching Instructor data:", error);
    }
  };

  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div>
      <div className="flex flex-col w-screen">
        <div className="flex flex-col w-screen pt-12 xl:flex-row">
          {/* Image Change */}
          <div className="flex flex-col gap-5 px-20 lg:flex-row">
            {/* Sub-images */}
            <div className="hidden gap-4 sm:flex-row lg:flex-col sm:flex">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Yoga Session ${index + 1}`}
                  className="md:w-[150px] md:h-[120px] bg-green-600 rounded-xl cursor-pointer sm:w-[100px] sm:h-[100px]"
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            {/* Displayed image with navigation arrows */}
            <div className="relative">
              <button
                onClick={handlePrev}
                className="absolute left-0 w-12 h-12 p-2 ml-4 transform -translate-y-1/2 text-white bg-[#414740] rounded-full top-1/2 z-10"
              >
                ◀
              </button>

              <img
                src={images[currentIndex]}
                alt="Yoga Session Display"
                className="lg:w-[650px] lg:h-[530px] bg-green-600 rounded-xl flex flex-col justify-center w-full h-full"
              />

              <button
                onClick={handleNext}
                className="absolute right-0 w-12 h-12 p-2 mr-4 transform -translate-y-1/2 bg-[#414740] text-white rounded-full top-1/2"
              >
                ▶
              </button>
            </div>
          </div>

          <div className="flex flex-col pt-10 pl-10 xl:pl-0 xl:pt-5">
            <div className="text-4xl font-semibold text-[#414740]">
              {service.yogaService?.yname}
            </div>
            <div className="flex flex-row pt-8 ">
              <div className="text-xl font-semibold text-[#434343]">
                Yoga Type :{" "}
              </div>
              <div className="pl-2 text-xl">{service.yogaService?.type}</div>
            </div>

            <div className="flex flex-row pt-2 ">
              <div className="text-xl font-semibold text-[#434343]">
                Instructor Name :{" "}
              </div>
              <div className="pl-2 text-xl">{instructor?.name}</div>
            </div>

            <div className="flex flex-row pt-2 ">
              <div className="text-xl font-semibold text-[#434343]">
                Session Date :{" "}
              </div>
              <div className="pl-2 text-xl">{service.schedule.sdate}</div>
            </div>

            <div className="flex flex-row gap-8">
              <div className="flex flex-row pt-2 ">
                <div className="text-xl font-semibold text-[#434343]">
                  Start:{" "}
                </div>
                <div className="pl-2 text-xl">
                  {convertTo12HourFormat(service.schedule.startTime)}
                </div>
              </div>

              <div className="flex flex-row pt-2 ">
                <div className="text-xl font-semibold text-[#434343]">
                  End:{" "}
                </div>
                <div className="pl-2 text-xl">
                  {convertTo12HourFormat(service.schedule.endTime)}
                </div>
              </div>
            </div>

            <div className="pt-6 text-xl font-semibold">Description</div>

            <div className="md:w-[700px] w-full pt-2 text-lg">
              {service.yogaService?.description}
            </div>

            <div className="text-3xl font-bold text-[#ffb32f] pt-8">
              Rs. {service.schedule.price}
            </div>

            <div className="flex align-bottom ">
              <button
                onClick={handleBookNow}
                className="w-[200px] h-12 rounded-lg mt-10 bg-[#434343] text-white font-semibold text-lg "
              >
                Book now
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full px-20 py-10 pt-16 mt-10 bg-slate-300">
          <div className="flex flex-col w-full">
            <div className="text-3xl font-semibold">Instructor Details</div>
            <div className="flex flex-row pt-4">
              <div className="text-xl font-bold">Name:</div>
              <div className="pl-2 text-xl font-semibold">
                {instructor?.name}
              </div>
            </div>

            <div className="flex flex-row pt-1">
              <div className="text-xl font-bold">Certifications:</div>
              <div className="pl-2 text-xl font-semibold">
                {instructor?.certifications}
              </div>
            </div>

            <div className="flex flex-row pt-1">
              <div className="text-xl font-bold">Specifications:</div>
              <div className="pl-2 text-xl font-semibold">
                {instructor?.specializations}
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <div className="text-xl font-bold">Description:</div>
              <div className="text-lg">{instructor?.bioDescription}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YogaSession;
