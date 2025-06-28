import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Navbar";

const BeautyCarousel = () => {
  const images = [
    "src/assets/CarouselImages/wax1.png",
    "src/assets/CarouselImages/waz2.png",
    "src/assets/CarouselImages/bride.png",
    "src/assets/CarouselImages/hair.png",
    "src/assets/CarouselImages/hair2.png",
    "src/assets/CarouselImages/G1.png",
    "src/assets/CarouselImages/g2.png",
    "src/assets/CarouselImages/G3.png",
  ];

  return (
    <>
      <Header />
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Carousel fade controls indicators interval={4000} pause="hover">
          {images.map((src, index) => (
            <Carousel.Item key={index}>
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100vw",
                  height: "100vh",
                  objectFit: "cover",
                }}
              />
              {/* Optional: Add Caption */}
              {/* <Carousel.Caption>
              <h3 className="bg-dark bg-opacity-50 px-3 py-2 rounded">Wall Design {index + 1}</h3>
            </Carousel.Caption> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default BeautyCarousel;
