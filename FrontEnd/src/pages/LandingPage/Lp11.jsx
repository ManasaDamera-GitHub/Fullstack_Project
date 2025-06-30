import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import "../../styles/MBS.css";
import "../../styles/WomenSalon.css";

const appliances = [
  { img: "/repair/cooler.png", title: "Air Cooler", path: "/ac" },
  { img: "/repair/AC.png", title: "Air Conditioner", path: "/ac" },
  { img: "/repair/purifier.png", title: "Air Purifier", path: "/ac" },
  { img: "/repair/Washing.png", title: "Washing Machine", path: "/ac" },
  { img: "/repair/tv.png", title: "Television", path: "/ac" },
];

export default function Repair() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      checkScrollPosition();
    };

    const checkScrollPosition = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    window.addEventListener("resize", handleResize);
    scrollRef.current?.addEventListener("scroll", checkScrollPosition);
    checkScrollPosition();

    return () => {
      window.removeEventListener("resize", handleResize);
      scrollRef.current?.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount =
        windowWidth < 450
          ? current.firstChild?.clientWidth || 250
          : windowWidth < 700
          ? (current.firstChild?.clientWidth || 150) * 2
          : 300;

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="MBS-container bg-white">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="MBS-header women-salon-header">
          <h2 className="MBS-title women-salon-title">
            Appliance repair & service
          </h2>
          <button
            className="see-all-btn women-salon-button"
            onClick={() => navigate("/ac")}
          >
            See all
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className={`scroll-btn left ${isAtStart ? "disabled" : ""}`}
            disabled={isAtStart}
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="scroll-container flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1"
          >
            {appliances.map(({ img, title, path }, index) => (
              <div
                key={index}
                onClick={() => navigate(path)}
                className="min-w-[180px] md:min-w-[220px] cursor-pointer flex flex-col items-center"
              >
                <Card className="w-full aspect-square overflow-hidden border-none shadow-none transition-transform hover:scale-[1.03]">
                  <CardContent className="p-0 h-full">
                    <div className="w-full h-full">
                      <img
                        src={img}
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
                <p className="text-center font-medium text-gray-800 mt-2">
                  {title}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className={`scroll-btn right ${isAtEnd ? "disabled" : ""}`}
            disabled={isAtEnd}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
