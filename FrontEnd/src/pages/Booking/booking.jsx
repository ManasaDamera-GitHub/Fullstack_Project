import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/BookingPage.css";
import axios from "axios";

const BookingPage = () => {
  const { serviceTitle, serviceType, serviceId, professionalId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    address: "",
    paymentType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { date, time, address, paymentType } = formData;
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    if (!userId) {
      toast.error("Please log in to continue.");
      return;
    }

    if (!date || !time || !address || !paymentType) {
      toast.error("Please fill all the fields");
      return;
    }

    const bookingData = {
      userId,
      userName,
      serviceTitle,
      serviceType,
      serviceId,
      professionalId,
      date,
      time,
      address,
      paymentType,
    };
    console.log("Sending booking data:", bookingData);

    try {
      const res = await axios.post(
        "http://localhost:3000/servicebooking",
        bookingData
      );

      if (res.status === 201) {
        toast.success(`Booking confirmed via ${paymentType}!`);
        navigate("/my-bookings");
      } else {
        toast.error("Booking failed. Try again.");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Book {serviceTitle}</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Time</label>
          <input
            type="time"
            name="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Service Address</label>
          <textarea
            name="address"
            className="form-control"
            placeholder="Enter your full address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label">Payment Type</label>
          <select
            name="paymentType"
            className="form-select"
            value={formData.paymentType}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="Online">Online</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
