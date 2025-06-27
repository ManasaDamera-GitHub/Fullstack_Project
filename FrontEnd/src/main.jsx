import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { BookingProvider } from "./pages/context/BookingContext";
// import LandingPage from "./LandingPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <BookingProvider>
        <App />
        {/* <LandingPage /> */}
      </BookingProvider>
    </>
  </StrictMode>
);
