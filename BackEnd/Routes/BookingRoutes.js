const express = require("express");
const router = express.Router();

// Models
const Professional = require("../Model/ProfessionalSchema");
const Booking = require("../Model/BookingSchema");
const AcService = require("../Model/AcServicesSchema");
const RepairService = require("../Model/RepairSchema");
const WomenSalonService = require("../Model/WomenSchema");
const WomenSpaService = require("../Model/WomenSpaSchema");
const CleaningService = require("../Model/CleaningPestSchema");
const ElectricianService = require("../Model/ElectricianSchema");
const MenService = require("../Model/MenSchema");
const Painting = require("../Model/PaintingSchema");
const WallPanelService = require("../Model/WallPanelSchema");
const WaterPurifierService = require("../Model/WaterPurifierSchema");
const SmartLockService = require("../Model/SmartLockSchema");

// 🔁 Service model map for dynamic lookup
const serviceModels = {
  AcService,
  RepairService,
  WomenSalonService,
  WomenSpaService,
  CleaningService,
  ElectricianService,
  MenService,
  Painting,
  WallPanelService,
  WaterPurifierService,
  SmartLockService,
};

// ✅ Route: Create a booking without token (POST /bookings/public)
router.post("/servicebooking", async (req, res) => {
  const {
    userId,
    userName,
    serviceId,
    serviceType,
    serviceTitle,
    professionalId,
    date,
    time,
    address,
    notes = "",
    paymentType = "Cash on Delivery",
  } = req.body;

  // 🔎 Validate required fields
  if (
    !userId ||
    !userName ||
    !serviceId ||
    !serviceType ||
    !professionalId ||
    !date ||
    !time ||
    !address
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const ServiceModel = serviceModels[serviceType];
    if (!ServiceModel) {
      return res.status(400).json({ message: "Invalid service type" });
    }

    const service = await ServiceModel.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // ✅ Create booking
    const booking = new Booking({
      userId,
      userName,
      serviceId,
      serviceType,
      serviceTitle,
      professionalId,
      professionalName: professional.name,
      price: service.starts_at_price || service.price || 0,
      date,
      time,
      address,
      notes,
      paymentType,
      status: "Pending",
    });

    await booking.save();

    return res.status(201).json({
      message: "Booking successful (without token)",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
