// // backend/routes/Reviews.js
// const express = require("express");
// const router = express.Router();
// const Professional = require("../Model/ProfessionalSchema");

// router.post("/", async (req, res) => {
//   const { name, comment, rating, professionalId } = req.body;

//   if (!name || !comment || !professionalId || !rating) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const professional = await Professional.findById(professionalId);
//     if (!professional) {
//       return res.status(404).json({ error: "Professional not found" });
//     }

//     const newReview = { name, comment, rating };
//     professional.reviews.push(newReview);
//     await professional.save();

//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error("Error submitting review:", err);
//     res.status(500).json({ error: "Failed to submit review" });
//   }
// });

// module.exports = router;

// backend/routes/Reviews.js
const express = require("express");
const router = express.Router();
const Professional = require("../Model/ProfessionalSchema");

router.post("/", async (req, res) => {
  const { name, comment, professionalId } = req.body;

  if (!name || !comment || !professionalId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const professional = await Professional.findById(professionalId);
    if (!professional)
      return res.status(404).json({ error: "Professional not found" });

    const newReview = { name, comment };
    professional.reviews.push(newReview);
    await professional.save();

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit review" });
  }
});

module.exports = router;
