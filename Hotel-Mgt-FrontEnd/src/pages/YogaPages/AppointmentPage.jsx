import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarStyles.css";
import { useNavigate } from "react-router-dom";

function AppointmentPage() {
  return <DateAndTimeSelection />;
}

function DateAndTimeSelection() {
  const [yogaServices, setYogaServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/schedule/all",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const yogaServiceData = await response.json();

      // Filter out past sessions
      const today = new Date();
      const futureYogaServices = yogaServiceData.filter((service) => {
        const sessionDate = new Date(service.schedule.sdate);
        return sessionDate >= today;
      });

      setYogaServices(futureYogaServices);
    } catch (error) {
      console.error("Error fetching yoga services:", error);
    }
  };

  const convertTo12HourFormat = (time24) => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  // Collect available dates and times from future sessions
  const availableDates = {};
  yogaServices.forEach((service) => {
    const date = service.schedule.sdate;
    if (!availableDates[date]) availableDates[date] = [];
    availableDates[date].push(
      `${convertTo12HourFormat(
        service.schedule.startTime
      )} - ${convertTo12HourFormat(service.schedule.endTime)}`
    );
  });

  const availableDateSet = new Set(
    Object.keys(availableDates).map((dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day).toDateString();
    })
  );

  const handleDateClick = (date) => {
    setSelectedBooking(null);
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const dateString = adjustedDate.toISOString().split("T")[0];

    const relevantSessions = yogaServices.filter(
      (service) => service.schedule.sdate === dateString
    );

    if (relevantSessions.length > 0) {
      setSelectedSession(relevantSessions[0]);
      setSelectedTimes(
        relevantSessions.map((service) => ({
          time: `${convertTo12HourFormat(
            service.schedule.startTime
          )} - ${convertTo12HourFormat(service.schedule.endTime)}`,
          sid: service.schedule.sid,
          price: service.schedule.price,
        }))
      );
    } else {
      setSelectedTimes([]);
      setSelectedSession(null);
    }

    setSelectedDate(date);
  };

  const handleSessionClick = (service) => {
    const sessionDate = service.schedule.sdate;
    const times = [
      {
        time: `${convertTo12HourFormat(
          service.schedule.startTime
        )} - ${convertTo12HourFormat(service.schedule.endTime)}`,
        sid: service.schedule.sid,
        price: service.schedule.price,
      },
    ];

    setSelectedDate(new Date(sessionDate));
    setSelectedTimes(times);
    // setSelectedSession(service);
    setSelectedBooking(times);
  };

  const handleConfirmAppointment = () => {
    if (selectedBooking) {
      const sid = selectedBooking?.[0].sid;
      const email = localStorage.getItem("email");
      navigate("/paymentPage", {
        state: {
          sid,
          email,
          amount: selectedBooking?.[0].price,
        },
      });
    }
  };

  return (
    <div className="py-6 mb-0 bg-gray-100 flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl flex flex-col">
    <div className="flex items-center justify-center w-full h-20 text-lg font-semibold text-white bg-green-900 rounded-t-xl md:text-xl">
      Make an Appointment
    </div>

    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
      {/* Left Side - Available Services */}
      <div className="flex-1">
        <h1 className="text-2xl font-semibold mb-6 mt-2 text-center md:text-3xl">
          Available Yoga Sessions
        </h1>

        <div className="max-h-96 overflow-y-scroll m-4">
          {yogaServices.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row bg-white shadow-lg rounded-lg p-4 mb-4 cursor-pointer ${
                selectedBooking?.[0].sid === service.schedule.sid
                  ? "border-2 border-green-800 bg-slate-100"
                  : ""
              }`}
              onClick={() => handleSessionClick(service)}
            >
              {service.schedule.image1 && (
                <img
                  src={service.schedule.image1}
                  alt={service.yogaService?.yname}
                  className="w-full h-32 object-cover rounded-lg sm:w-24 sm:h-24 mr-0 sm:mr-4"
                />
              )}

              <div className="flex flex-col justify-between flex-1 mt-4 sm:mt-0">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 md:text-xl">
                  {service.yogaService?.yname}
                </h2>
                <p className="text-sm text-gray-600 mb-2 md:text-base">
                  {service.yogaService?.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-400 font-bold text-sm md:text-lg">
                    {`Rs. ${service.schedule.price}`}
                  </span>
                  <span className="text-gray-500 text-xs md:text-sm">
                    {service.yogaService?.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Calendar and Time Slots */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <h2 className="text-lg font-semibold mb-4 md:text-xl">
          Select a Date & Time
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Calendar */}
          <div className="flex justify-center items-center">
          <Calendar
            onChange={handleDateClick}
            value={selectedDate}
            minDate={new Date()}
            tileClassName={({ date }) => {
              const dateString = date.toDateString();

              if (
                selectedDate &&
                dateString === selectedDate.toDateString()
              ) {
                return "bg-green-700 font-semibold text-white rounded-full";
              }

              if (availableDateSet.has(dateString)) {
                return "bg-green-300 font-semibold rounded-full";
              }

              const today = new Date();
              if (date.toDateString() === today.toDateString()) {
                return "bg-blue-200 font-semibold rounded-full";
              }

              return "hover:bg-orange-100 rounded-full";
            }}
          />
          </div>
          

          {/* Display Selected Times */}
          <div className="flex flex-col ml-2">
            <h3 className="text-sm font-semibold mt-4 md:text-lg">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {selectedTimes.length > 0 ? (
                selectedTimes.map((session, index) => (
                  <button
                    key={index}
                    className={`border border-gray-300 p-2 rounded text-green-800 hover:bg-green-800 hover:text-white ${
                      selectedBooking?.[0].sid === session.sid
                        ? "bg-green-700 text-white"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedBooking([session]);
                      console.log("time slot session", session);
                    }}
                  >
                    {session.time}
                  </button>
                ))
              ) : (
                <p className="text-gray-600 text-sm md:text-base">
                  No available sessions
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          className={`mt-6 py-2 px-4 rounded-lg w-full ${
            selectedBooking
              ? "bg-green-800 text-white hover:bg-green-600"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
          onClick={handleConfirmAppointment}
          disabled={!selectedBooking}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  </div>
</div>

  );
}

export default AppointmentPage;
