// ProfessionalsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Navbar";
import Lottie from "lottie-react";
import professionalLoader from "../../assets/professional-loader.json";

const ProfessionalsPage = () => {
  const [professionals, setProfessionals] = useState([]);
  const navigate = useNavigate();
  const { serviceTitle } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/professional?serviceTitle=${encodeURIComponent(
            serviceTitle
          )}`
        );
        const data = await res.json();
        setProfessionals(data);
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, [serviceTitle]);

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="mb-4">Available Professionals</h2>

        {isLoading ? (
          <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Lottie
              animationData={professionalLoader}
              loop={true}
              style={{ height: 200 }}
            />
            <p className="text-primary fw-semibold mt-3">
              Loading professionals, please wait...
            </p>
          </div>
        ) : (
          <div className="row">
            {professionals.length > 0 ? (
              professionals.map((pro) => (
                <div key={pro._id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={pro.photo}
                      alt={pro.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pro.name}</h5>
                      <p>{pro.experience} years experience</p>
                      <p>Rating: {pro.rating}</p>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() =>
                          navigate(`/booking/${serviceTitle}/${pro._id}`)
                        }
                      >
                        Continue Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center text-muted">
                  No professionals available for this service.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ProfessionalsPage;
