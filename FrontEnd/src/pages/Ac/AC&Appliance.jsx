import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../styles/AllServices.css";
import Header from "@/components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import serviceLoader from "../../assets/service-loader.json";

const ACAppliances = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, removeFromCart, cartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("https://hearth-hand.onrender.com/ac/ac");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching AC services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ["All", ...new Set(services.map((s) => s.category))];
  const filteredServices =
    selectedCategory === "All"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const handleCartAction = (service) => {
    const isInCart = cartItems.some((item) => item.title === service.title);
    if (isInCart) {
      removeFromCart(service.title);
    } else {
      addToCart(service);
    }
    setSelectedService(null);
  };

  const isInCart = (title) => cartItems.some((item) => item.title === title);

  return (
    <>
      <Header />
      <div className="container py-5 mt-header">
        {isLoading ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Lottie
              animationData={serviceLoader}
              loop={true}
              style={{ height: 200 }}
            />
            <p className="text-primary fw-semibold mt-3">
              Loading services, please wait...
            </p>
          </div>
        ) : (
          <div className="row">
            {/* Category Sidebar */}
            <div className="col-md-3 mb-4">
              <div className="category-sidebar">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`category-btn btn btn-sm w-100 text-start mb-2 ${
                      selectedCategory === category
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="col-md-9">
              <div className="row">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="col-12 col-sm-6 col-lg-4 mb-4"
                    onClick={() => setSelectedService(service)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card h-100 text-center shadow-sm">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="card-img-top"
                        style={{ height: "280px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{service.title}</h5>
                        <p className="text-muted">
                          {service.description.slice(0, 60)}...
                        </p>
                        <p>
                          <strong>₹{service.starts_at_price}</strong>
                        </p>
                        <span className="text-dark fw-semibold">
                          {service.view_details}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredServices.length === 0 && (
                  <div className="col-12">
                    <p className="text-muted text-center">
                      No services found in this category.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal for Service Details */}
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
              overflowY: "auto",
            }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedService.title}</h5>
                  <button
                    className="btn-close"
                    onClick={() => setSelectedService(null)}
                  ></button>
                </div>
                <div className="modal-body row">
                  <div className="col-md-5 text-center mb-3">
                    <img
                      src={selectedService.image}
                      className="img-fluid rounded"
                      alt={selectedService.title}
                      style={{ maxHeight: "300px", objectFit: "cover" }}
                    />
                    <div className="bg-warning bg-opacity-25 px-3 py-2 rounded mt-3">
                      Starting at{" "}
                      <strong>₹{selectedService.starts_at_price}</strong>
                    </div>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => handleCartAction(selectedService)}
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
                      className="btn btn-success w-100 mt-2"
                      onClick={() =>
                        navigate(
                          `/professionals/${encodeURIComponent(
                            selectedService.title
                          )}/AcService/${selectedService._id}`
                        )
                      }
                    >
                      <i className="bi bi-calendar-check-fill me-2" />
                      Book Now
                    </button>
                  </div>
                  <div className="col-md-7">
                    <p>{selectedService.description}</p>
                    <p>
                      <i className="bi bi-star-fill text-warning"></i>{" "}
                      {selectedService.rating} ({selectedService.views_count}{" "}
                      reviews)
                    </p>
                    <p className="fw-semibold">
                      {selectedService.view_details}
                    </p>
                    <div>
                      <h5 className="fw-semibold">Our Process</h5>
                      {selectedService.process?.length > 0 ? (
                        <ul className="ps-3">
                          {selectedService.process.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted">
                          Process information not available.
                        </p>
                      )}
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

export default ACAppliances;
