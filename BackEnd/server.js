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

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .then(() => {
    app.listen(process.env.port, () => {
      console.log(`server is running on http://localhost:${process.env.port}`);
    });
  })
  .catch((error) => {
    console.log(error, "refused to connect");
  });
