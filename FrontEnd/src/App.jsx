import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage";
import { Signup } from "./pages/Login/Signup";
import Login from "./pages/Login/Login";
import Waxing from "./pages/WomenSalon/Waxing";
import Manicure from "./pages/WomenSalon/Manicure";
import HairCare from "./pages/WomenSalon/HairCare";
import Threading from "./pages/WomenSalon/Threading";
import AllServices from "./pages/WomenSalon/AllServices";
import AllSpaServices from "./pages/WomenSalon/Spa/AllSpaServices";
import CleanUp from "./pages/WomenSalon/CleanUp";
import HairCut from "./pages/MenSalon/HairCut";
import BeardStyling from "./pages/MenSalon/BeardStyling";
import StressRelief from "./pages/MenSalon/StressRelief";
import Pedicure from "./pages/MenSalon/Pedicure";
import HairColor from "./pages/MenSalon/HairColor";
import Facial from "./pages/MenSalon/Facial";
import AllMenServices from "./pages/MenSalon/AllMenServices";
import Cart from "./pages/context/Cart";
import "./App.css";
import ACAppliances from "./pages/Ac/AC&Appliance";
import AllWallPanel from "./pages/WallPanel/FullWallPanel";
import SmartLockServices from "./pages/SmartLock/SmartLock";
import AllCleaningPestControl from "./pages/Cleaning&Pest/AllCleaningPestControl";
import PaintingServices from "./pages/Painting/Painting";
import WaterPurifierServices from "./pages/WaterPurifier/WaterPurifier";
import ElectricianServices from "./pages/Electrician/Electrician";
import Tap from "./pages/Home Repair/Tap";
import Tap_Installation from "./pages/Home Repair/TapInstall";
import PullOut_installation from "./pages/Home Repair/PullOut";
import Door_Installation from "./pages/Home Repair/Door";
import Fan_Installation from "./pages/Home Repair/Fan";
import Bed_Installation from "./pages/Home Repair/Bed";
import Apartment_Terminate_control from "./pages/Home Repair/ApartmentTerminate";
import BookingSection from "./pages/Booking/booking";
import ProfessionalsPage from "./pages/Professional/Professional";

export const App = () => {
  return (
    <CartProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        style={{ padding: 0 }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/w_salon/waxing" element={<Waxing />} />
          <Route path="/w_salon/manicure" element={<Manicure />} />
          <Route path="/w_salon/haircare" element={<HairCare />} />
          <Route path="/w_salon/cleanup" element={<CleanUp />} />
          <Route path="/salon/threading" element={<Threading />} />
          <Route path="/women-salon/all-services" element={<AllServices />} />
          <Route
            path="/women-salon/spa-services"
            element={<AllSpaServices />}
          />
          <Route path="/m_salon/haircut" element={<HairCut />} />
          <Route path="/m_salon/beard" element={<BeardStyling />} />
          <Route path="/m_salon/stress" element={<StressRelief />} />
          <Route path="/m_salon/pedicure" element={<Pedicure />} />
          <Route path="/m_salon/haircolor" element={<HairColor />} />
          <Route path="/m_salon/facial" element={<Facial />} />
          <Route path="/men-salon/all-services" element={<AllMenServices />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/ac" element={<ACAppliances />} />
          <Route path="/wall-panels" element={<AllWallPanel />} />
          <Route path="/smart-locks" element={<SmartLockServices />} />
          <Route
            path="/cleaning-pest-control"
            element={<AllCleaningPestControl />}
          />
          <Route path="/painting" element={<PaintingServices />} />
          <Route path="/waterPurifier" element={<WaterPurifierServices />} />
          <Route path="/electrician" element={<ElectricianServices />} />
          <Route path="/tap-repair" element={<Tap />} />
          <Route path="/tap-installation" element={<Tap_Installation />} />
          <Route
            path="/pullout-installation"
            element={<PullOut_installation />}
          />
          <Route path="/door-repair" element={<Door_Installation />} />
          <Route path="/fan-installation" element={<Fan_Installation />} />
          <Route path="/bed-assembly" element={<Bed_Installation />} />
          <Route
            path="/terminate-control"
            element={<Apartment_Terminate_control />}
          />
          <Route
            path="/professionals/:serviceTitle"
            element={<ProfessionalsPage />}
          />
          <Route
            path="/booking/:serviceTitle/:professionalId"
            element={<BookingSection />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
};
