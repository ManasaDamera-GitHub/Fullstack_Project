import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/Navbar";

const WallPanelCarousel = () => {
  const images = [
    "src/assets/CarouselImages/bedroom.png",
    "src/assets/CarouselImages/wall.png",
    "src/assets/CarouselImages/wall2.png",
    "src/assets/CarouselImages/wall4.png",
    "src/assets/CarouselImages/wall5.png",
    "src/assets/CarouselImages/wall6.png",
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

export default WallPanelCarousel;
