import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "@/components/Navbar";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import womenServiceLoader from "../../assets/women-loader.json";

const HairCare = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchALL = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://hearth-hand.onrender.com/women/women"
        );
        const data = await response.json();
        const hairServices = data.filter(
          (service) => service.category === "Hair Services"
        );
        setServices(hairServices);
      } catch (error) {
        console.error("Data Failed to fetch", error);
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };
    fetchALL();
  }, []);

  const closeModal = () => setSelectedService(null);

  const isInCart = (title) => cartItems.some((item) => item.title === title);

  const handleCartToggle = (service) => {
    if (isInCart(service.title)) {
      removeFromCart(service.title);
      toast.info("Removed from cart");
    } else {
      addToCart(service);
      toast.success("Added to cart");
    }
    closeModal();
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        {loading && (
          <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center">
            <div style={{ width: 200 }}>
              <Lottie animationData={womenServiceLoader} loop autoplay />
            </div>
            <p className="mt-3">Loading hair care services...</p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-danger py-5">
            <p>{error}</p>
          </div>
        )}
        {!loading && !error && services.length === 0 && (
          <div className="text-center text-muted py-5">
            <p>No Hair Care services found.</p>
          </div>
        )}

        <div className="row">
          {services.map((service) => (
            <div
              key={service.id}
              className="col-12 col-md-6 col-lg-4 mb-4"
              onClick={() => setSelectedService(service)}
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 text-center shadow-sm">
                <img
                  src={service.image}
                  className="card-img-top"
                  alt={service.title}
                  style={{ height: "280px", width: "100%", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{service.title}</h5>
                  <div className="mt-2 px-3 py-2 rounded bg-warning bg-opacity-25 d-inline-block">
                    🔖 Starting at <strong>₹{service.starts_at_price}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Modal with full features */}
        {selectedService && (
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflowY: "auto",
              zIndex: 1050,
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedService.title}</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-4 align-items-center">
                    <div className="col-md-6">
                      <img
                        src={selectedService.image}
                        alt={selectedService.title}
                        className="img-fluid rounded shadow"
                        style={{ objectFit: "cover", maxHeight: "300px" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <p>{selectedService.description || "No description."}</p>
                      <p className="text-muted mb-2">
                        <i className="bi bi-star-fill text-warning"></i>{" "}
                        {selectedService.rating || "0.0"} (
                        {selectedService.views_count || "0"} reviews)
                      </p>
                      {selectedService.view_details && (
                        <p>
                          <span className="badge bg-success">
                            {selectedService.view_details}
                          </span>
                        </p>
                      )}
                      <div className="bg-light border p-2 rounded mb-3">
                        🔖 Starting at{" "}
                        <strong>₹{selectedService.starts_at_price}</strong>
                      </div>

                      {/* Modal Footer Buttons */}
                      <div className="modal-footer d-flex flex-column flex-md-row justify-content-between gap-2">
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => handleCartToggle(selectedService)}
                        >
                          <i
                            className={`bi me-2 ${
                              isInCart(selectedService.title)
                                ? "bi-cart-dash"
                                : "bi-cart-plus"
                            }`}
                          ></i>
                          {isInCart(selectedService.title)
                            ? "Remove from Cart"
                            : "Add to Cart"}
                        </button>
                        <button
                          className="btn btn-success w-100"
                          onClick={() =>
                            navigate(
                              `/professionals/${encodeURIComponent(
                                selectedService.title
                              )}`
                            )
                          }
                        >
                          <i className="bi bi-calendar-check-fill me-2" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HairCare;
