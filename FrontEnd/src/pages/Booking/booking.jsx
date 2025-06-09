// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "@/components/Navbar";

// const BookingPage = () => {
//   const { serviceId } = useParams();
//   const [professionals, setProfessionals] = useState([]);
//   const [selectedPro, setSelectedPro] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const fetchProfessionals = async () => {
//       try {
//         const res = await fetch(
//           `http://localhost:3000/professionals?serviceId=${serviceId}`
//         );
//         const data = await res.json();
//         setProfessionals(data);
//       } catch (err) {
//         console.error("Error fetching professionals:", err);
//       }
//     };

//     fetchProfessionals();
//   }, [serviceId]);

//   const handleSubmitReview = async () => {
//     if (!userName || !reviewText) {
//       alert("Please enter name and review");
//       return;
//     }

//     const newReview = {
//       name: userName,
//       comment: reviewText,
//       professionalId: selectedPro._id,
//     };

//     try {
//       const res = await fetch(
//         "http://localhost:3000/professional/professional",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newReview),
//         }
//       );
//       const savedReview = await res.json();

//       setSelectedPro((prev) => ({
//         ...prev,
//         reviews: [...prev.reviews, savedReview],
//       }));

//       setReviewText("");
//       setUserName("");
//       alert("Review submitted!");
//     } catch (err) {
//       console.error("Error submitting review:", err);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="container py-5">
//         <h2 className="mb-4">Select a Professional</h2>

//         <div className="row">
//           {professionals.map((pro) => (
//             <div
//               key={pro._id}
//               className="col-md-4 mb-4"
//               onClick={() => setSelectedPro(pro)}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="card shadow-sm h-100">
//                 <img
//                   src={pro.image}
//                   alt={pro.name}
//                   className="card-img-top"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{pro.name}</h5>
//                   <p>{pro.experience} years experience</p>
//                   <p>
//                     Rating: <i className="bi bi-star-fill text-warning"></i>{" "}
//                     {pro.rating}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {selectedPro && (
//           <div className="mt-5">
//             <h4>{selectedPro.name}'s Profile</h4>
//             <p>Experience: {selectedPro.experience} years</p>
//             <p>Rating: {selectedPro.rating}</p>

//             <h5 className="mt-4">Reviews</h5>
//             <ul className="list-group mb-4">
//               {selectedPro.reviews?.length > 0 ? (
//                 selectedPro.reviews.map((r, idx) => (
//                   <li key={idx} className="list-group-item">
//                     <strong>{r.name}:</strong> {r.comment}
//                   </li>
//                 ))
//               ) : (
//                 <li className="list-group-item text-muted">No reviews yet.</li>
//               )}
//             </ul>

//             <div className="card p-3 shadow-sm">
//               <h5>Write a Review</h5>
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 className="form-control mb-2"
//               />
//               <textarea
//                 rows="3"
//                 placeholder="Write your review..."
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 className="form-control mb-2"
//               />
//               <button className="btn btn-primary" onClick={handleSubmitReview}>
//                 Submit Review
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default BookingPage;

// BookingSection.jsx
import React, { useState } from "react";

const BookingSection = ({ professionalId, onBookingSuccess }) => {
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = async () => {
    if (!userName || !date || !time) {
      alert("All fields are required");
      return;
    }

    const res = await fetch("http://localhost:3000/bookings/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, date, time, professionalId }),
    });

    if (res.ok) {
      alert("Booking confirmed!");
      setUserName("");
      setDate("");
      setTime("");
      onBookingSuccess(); // Refresh data
    } else {
      const err = await res.json();
      alert(err.error || "Booking failed");
    }
  };

  return (
    <div className="card p-3 shadow-sm mt-4">
      <h5>Book This Professional</h5>
      <input
        type="text"
        placeholder="Your name"
        className="form-control mb-2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="date"
        className="form-control mb-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        className="form-control mb-2"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingSection;
