const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const WallPanelRouter = require("./Routes/WallPanelRouter");
const ACServiceRouter = require("./Routes/AcRoutes");
const CleaningPestRouter = require("./Routes/CleaningPestRoutes");
const ElectricianRouter = require("./Routes/ElectricianRoutes");
const MenRouter = require("./Routes/MenRoutes");
const PaintingRouter = require("./Routes/PaintingRoutes");
const RepairRouter = require("./Routes/RepairRouter");
const SmartLockRouter = require("./Routes/SmartLockRoutes");
const WaterPurifierRouter = require("./Routes/WaterPurifierRoutes");
const WomenRouter = require("./Routes/WomenRouter");
const WomenSpaRouter = require("./Routes/WomenSpaRouter");
const ProfessionalRouter = require("./Routes/ProfessionalRoutes");
const BookingRouter = require("./Routes/BookingRoutes");
const ReviewRoutes = require("./Routes/ReviewRoutes");

const app = express();
app.use(express.json());
app.use("/wall", WallPanelRouter);
app.use("/ac", ACServiceRouter);
app.use("/cleaningPest", CleaningPestRouter);
app.use("/electrician", ElectricianRouter);
app.use("/men", MenRouter);
app.use("/painting", PaintingRouter);
app.use("/repair", RepairRouter);
app.use("/smartlock", SmartLockRouter);
app.use("/waterPurifier", WaterPurifierRouter);
app.use("/women", WomenRouter);
app.use("/womenSpa", WomenSpaRouter);
app.use("/professional", ProfessionalRouter);
app.use("/professional", ProfessionalRouter);
app.use("/profUpdate", ProfessionalRouter);
app.use("/bookings", BookingRouter);
app.use("/reviews", ReviewRoutes);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .then(() => {
    app.listen(process.env.Port, () => {
      console.log(`server is running on http://localhost:${process.env.Port}`);
    });
  })
  .catch((error) => {
    console.log(error, "refused to connect");
  });
