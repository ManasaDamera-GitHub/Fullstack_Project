import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "@/components/Navbar";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import womenServiceLoader from "../../assets/women-loader.json";

const CleanUp = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchALL = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          "https://hearth-hand.onrender.com/women/women"
        );
        const data = await response.json();
        const filtered = data.filter(
          (service) => service.category === "Cleanup Services"
        );
        setServices(filtered);
      } catch (error) {
        console.error("Data fetch failed", error);
        setError("Failed to fetch services");
      } finally {
        setIsLoading(false);
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
        {/* Loader */}
        {isLoading ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Lottie animationData={womenServiceLoader} loop={true} style={{ height: 200 }} />
            <p className="text-primary fw-semibold mt-3">
              Loading services, please wait...
            </p>
          </div>
        ) : error ? (
          <div className="text-center text-danger py-5">
            <p>{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center text-muted py-5">
            <p>No Cleanup Services found.</p>
          </div>
        ) : (
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
                    style={{ height: "280px", objectFit: "cover" }}
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
        )}

        {/* Modal */}
        {selectedService && (
          <div
            className="modal d-block"
            style={{
              backgroundColor: "rgba(0,0,0,0.6)",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 1050,
              width: "100%",
              height: "100%",
              overflow: "auto",
            }}
          >
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              style={{ maxWidth: "700px", margin: "5% auto" }}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedService.title}</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5 text-center">
                      <img
                        src={selectedService.image}
                        alt={selectedService.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                    </div>

                    <div className="col-md-7">
                      <p className="mb-2">
                        {selectedService.description || "No description."}
                      </p>

                      <p className="mb-2">
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

                      <div className="my-3 px-3 py-2 rounded bg-warning bg-opacity-25 d-inline-block">
                        🔖 Starting at{" "}
                        <strong>₹{selectedService.starts_at_price}</strong>
                      </div>

                      <div className="modal-footer px-0 mt-3 d-flex flex-column gap-2">
                        <button
                          className={`btn ${
                            isInCart(selectedService.title)
                              ? "btn-danger"
                              : "btn-warning"
                          } w-100`}
                          onClick={() => handleCartToggle(selectedService)}
                        >
                          <i
                            className={`bi me-2 ${
                              isInCart(selectedService.title)
                                ? "bi-cart-dash"
                                : "bi-cart-plus"
                            }`}
                          />
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

export default CleanUp;
