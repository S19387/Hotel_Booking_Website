import React, { useEffect, useState } from "react";
import YogaNavBar from "./YogaNavBar";
import Banner from "../../assets/Images/YOGA2.png";
import Yoga1 from "../../assets/Images/yoga1.jpg";
import { useNavigate } from "react-router-dom";
import YogaFooter from "./YogaFooter";

function YogaHomePage() {
  const navigate = useNavigate();
  const [yogaServices, setYogaServices] = useState([]);

  const handleBookNowClick = (service) => {
    navigate("/yogaSession", { state: { service } });
  };
  const handleBookNow = () => {
    navigate("/yogaAppointment");
  };

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/schedule/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const yogaServiceData = await response.json();
      setYogaServices(yogaServiceData); // Assuming you're setting the data in state
      console.log("data", yogaServiceData);
    } catch (error) {
      console.error("Error fetching yoga services:", error);
    }
  };

  // Filter upcoming sessions
  const getUpcomingSessions = () => {
    const today = new Date();
    return yogaServices.filter((service) => {
      const sessionDate = new Date(service.schedule.sdate);
      return sessionDate >= today; // Only include dates today or in the future
    });
  };

  return (
    <div>
      <YogaNavBar />
      {/* Home Banner */}
      <div
        style={{
          backgroundImage: `url(${Banner})`,
        }}
        className="flex flex-col items-center w-screen h-screen bg-center bg-cover"
      >
        <div className="flex flex-col justify-center items-start w-full h-full px-6 lg:px-24">
          <div className="text-2xl font-semibold text-[#ffc336] pb-2 md:text-3xl lg:text-4xl">
            Improve Your Self
          </div>
          <div className="text-4xl font-black text-[#414740]  max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-3xl lg:text-6xl  lg:w-[900px] w-[300px] sm:w-[500px] md:w-[600px]">
            Be The Best Version Of Yourself
          </div>
          <div className="text-sm text-gray-700 pt-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl 2xl:w-[900px] lg:text-lg w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[650px]">
            Yoga is a group of physical, mental, and spiritual practices and
            disciplines originating in ancient India, aimed at achieving harmony
            of the body, mind, and spirit.
          </div>
          <button 
          onClick={() => handleBookNow()}
          className="mt-6 bg-[#414740] text-white font-semibold rounded-md py-2 px-4 text-sm sm:py-3 sm:px-6 sm:text-lg lg:py-4 lg:px-8 lg:text-lg">
            Book now
          </button>
        </div>
      </div>

      {/* Available Yoga Services */}
      <div className="pt-20 px-4">
        <div className="text-[#414740] text-center font-extrabold text-2xl md:text-4xl">
          Check the Available Sessions
        </div>
        <div className="flex flex-wrap justify-center w-full max-w-screen-xl gap-6 pt-10 mx-auto">
          {getUpcomingSessions().map((service, index) => (
            <div
              key={index}
              className="flex flex-col w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-xl shadow-2xl"
            >
              {/* Image Section */}
              <div className="w-full h-48 overflow-hidden rounded-t-xl">
                <img
                  src={service.schedule.image1 || Yoga1}
                  alt={service.yogaService?.yname}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-between w-full px-4 py-4">
                <div>
                  <div className="text-xl font-bold text-gray-800">
                    {service.yogaService?.yname}
                  </div>
                  <div className="text-lg text-gray-600">
                    {service.yogaService?.type}
                  </div>
                  <div className="text-2xl font-bold text-orange-400">
                    {`Rs. ${service.schedule.price}`}
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 text-white font-semibold bg-[#414740] rounded-md hover:bg-[#313739] text-sm sm:text-lg"
                    onClick={() => handleBookNowClick(service)}
                  >
                    Book now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <YogaFooter />
    </div>
  );
}

export default YogaHomePage;
