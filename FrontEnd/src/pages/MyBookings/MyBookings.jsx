import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useBooking } from "../context/BookingContext";

const MyBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addBooking } = useBooking();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/bookings/${userId}`);
        const fetchedBookings = res.data;

        setBookings(fetchedBookings);

        // Add each booking to context only if not already present
        fetchedBookings.forEach((booking) => {
          addBooking(booking); // You can modify this if duplicates are a concern
        });
      } catch (err) {
        toast.error("Failed to load your bookings");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
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
          {bookings.map((booking) => (
            <div className="col-md-6 col-lg-4 mb-4" key={booking._id}>
              <div className="p-4 border rounded shadow-sm bg-light">
                <h5 className="text-primary">{booking.serviceTitle}</h5>
                <p className="mb-1">
                  <strong>Professional:</strong> {booking.professionalName}
                </p>
                <p className="mb-1">
                  <strong>Date:</strong> {booking.date}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {booking.time}
                </p>
                <p className="mb-1">
                  <strong>Address:</strong> {booking.address}
                </p>
                <p className="mb-0">
                  <strong>Payment:</strong> {booking.paymentType}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
