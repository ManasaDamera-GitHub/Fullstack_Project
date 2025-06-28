import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useBooking } from "../context/BookingContext";

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const { addBooking } = useBooking();

  const userId = localStorage.getItem("userId");
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/bookings/${bookingId}`
      );
      if (res.status === 200) {
        toast.success("Booking cancelled");
        setBookings((pre) => pre.filter((b) => b._id !== bookingId));
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      toast.error("Error cancelling booking. Please try again");
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/bookings/${userId}`);
        const fetchedBookings = res.data;
        setBookings(fetchedBookings);
        fetchedBookings.forEach((b) => addBooking(b));
      } catch (err) {
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchBookings();
  }, [userId, addBooking]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Bookings</h2>
      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center">No bookings found.</p>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div className="col-md-6 col-lg-4 mb-4" key={b._id}>
              <div className="p-4 border rounded shadow-sm bg-light">
                <h5 className="text-primary">{b.serviceTitle}</h5>
                <p>
                  <strong>Date:</strong> {b.date}
                </p>
                <p>
                  <strong>Time:</strong> {b.time}
                </p>
                <p>
                  <strong>Address:</strong> {b.address}
                </p>
                <p>
                  <strong>Payment:</strong> {b.paymentType}
                </p>
                <button
                  className="btn btn-danger btn-sm mt-2 w-100"
                  onClick={() => handleCancel(b._id)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
