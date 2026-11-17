import React, { useState } from "react";
import YogaNavBar from "./YogaNavBar";
import YogaFooter from "./YogaFooter";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    amount: state?.amount || "",
    cardType: "",
    cvc: "",
    expMonth: "",
    expYear: "",
    saveCard: false,
    sId: state?.sid || "",
    email: state?.email || "",
  });

  const [errors, setErrors] = useState({});
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [iserror, setIsError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.cardNumber || !/^\d{4}\d{4}\d{4}\d{4}$/.test(form.cardNumber))
      newErrors.cardNumber = "Enter a valid card number (XXXX-XXXX-XXXX-XXXX)";
    if (!form.amount || isNaN(form.amount))
      newErrors.amount = "Amount is required and should be a number";
    if (!form.cvc || !/^\d{3}$/.test(form.cvc))
      newErrors.cvc = "cvc must be a 3-digit number";
    if (!form.expMonth || form.expMonth < 1 || form.expMonth > 12)
      newErrors.expMonth = "Enter a valid month (1-12)";
    if (!form.expYear || form.expYear.length !== 4 || isNaN(form.expYear))
      newErrors.expYear = "Enter a valid year (YYYY)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsProcessing(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/card/payservyoga",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams(form),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        setIsPaymentSuccess(true);
        setIsProcessing(false);
      }

      if (response.ok) {
        const booking = await response.json();
        console.log("Booking Created:", booking);
      } else {
        console.error("Payment or Booking failed");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setIsError(error);
      setIsProcessing(false);
    } finally {
    }
  };

  const closePopup = () => {
    setIsPaymentSuccess(false);
    setForm({
        name: "",
        cardNumber: "",
        amount: "",
        cardType: "",
        cvc: "",
        expMonth: "",
        expYear: "",
        saveCard: false,
        sId: "",
        email: "",
      });
    navigate("/yogaHomePage");
  };

  const handleCancel = () => {
    setIsPopupVisible(true);
    console.log(isPopupVisible);
  };

  const confirmCancel = () => {
    setIsPopupVisible(false);
    navigate("/yogaHomePage");
  };

  const closeConfirmation = () => {
    setIsPopupVisible(false);
  };

  const closeError = () => {
    setIsError(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <YogaNavBar />
      <div className="flex flex-col w-full sm:w-[600px] h-auto mt-[20px] rounded-xl shadow-2xl bg-white justify-between">
        <div className="flex flex-row w-full h-[100px] bg-green-900 rounded-t-2xl justify-center items-center text-2xl text-white font-semibold">
          Payment Details
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start h-auto gap-2 px-10 py-5"
        >
          <div className="flex flex-col">
            <label className="text-lg font-semibold">Name on the card</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Enter name on the card"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="flex flex-col pt-2">
            <label className="text-lg font-semibold">Card number</label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="XXXX-XXXX-XXXX-XXXX"
            />
            {errors.cardNumber && (
              <span className="text-red-500">{errors.cardNumber}</span>
            )}
          </div>

          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col w-1/2 pt-2">
              <label className="text-lg font-semibold">Amount</label>
              <input
                type="text"
                name="amount"
                disabled
                value={form.amount}
                onChange={handleChange}
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Rs.30000"
              />
              {errors.amount && (
                <span className="text-red-500">{errors.amount}</span>
              )}
            </div>

            <div className="flex flex-col w-1/2 pt-2">
              <label className="text-lg font-semibold">Card type</label>
              <input
                type="text"
                name="cardType"
                value={form.cardType}
                onChange={handleChange}
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Card type"
              />
            </div>
          </div>

          <div className="flex flex-row w-full gap-4">
            <div className="flex flex-col w-1/2 pt-2">
              <label className="text-lg font-semibold">cvv</label>
              <input
                type="text"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="cvv"
              />
              {errors.cvc && <span className="text-red-500">{errors.cvc}</span>}
            </div>

            <div className="flex flex-col w-1/2 pt-2">
              <label className="text-lg font-semibold">Expire month</label>
              <input
                type="text"
                name="expMonth"
                value={form.expMonth}
                onChange={handleChange}
                className="p-2 px-5 text-lg border border-gray-300 rounded-full"
                placeholder="Month"
              />
              {errors.expMonth && (
                <span className="text-red-500">{errors.expMonth}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col w-1/2 pt-2">
            <label className="text-lg font-semibold">Expire year</label>
            <input
              type="text"
              name="expYear"
              value={form.expYear}
              onChange={handleChange}
              className="p-2 px-5 text-lg border border-gray-300 rounded-full"
              placeholder="Year"
            />
            {errors.expYear && (
              <span className="text-red-500">{errors.expYear}</span>
            )}
          </div>

          <div className="flex flex-row items-center gap-2 pt-1">
            <input
              type="checkbox"
              name="saveCard"
              checked={form.saveCard}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>Save credit card details for future payment</span>
          </div>

          <div className="flex flex-row justify-between w-full pt-4">
            <button
              type="button"
              className="w-[200px] h-12 bg-green-900 rounded-xl text-lg font-semibold text-white"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-[200px] h-12 bg-green-900 rounded-xl text-lg font-semibold text-white"
            >
              {isProcessing? "Processing" : "Pay now"}
            </button>
          </div>
        </form>
      </div>
      <YogaFooter />

      {/* Success Popup Modal */}
      {isPaymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[300px] p-6 bg-white rounded-lg text-center">
            <h2 className="mb-4 text-2xl font-semibold">Payment Successful!</h2>
            <p>Your payment was processed successfully.</p>
            <p>Please check your email.</p>
            <button
              onClick={closePopup}
              className="px-4 py-2 mt-4 text-white bg-green-900 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {iserror && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[300px] p-6 bg-white rounded-lg text-center">
            <h2 className="mb-4 text-2xl font-semibold">Error Processing Payment!</h2>
            <p>Please check your details.</p>
            <button
              onClick={closeError}
              className="px-4 py-2 mt-4 text-white bg-red-700 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[300px] p-6 bg-white rounded-lg text-center">
            <h2 className="mb-4 text-2xl font-semibold">Confirm Cancel</h2>
            <p>Are you sure you want to cancel?</p>
            <div className="flex justify-around mt-4">
              <button
                onClick={confirmCancel}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Yes
              </button>
              <button
                onClick={closeConfirmation}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
