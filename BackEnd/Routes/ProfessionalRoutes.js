const express = require("express");
const router = express.Router();
const Professional = require("../Model/ProfessionalSchema");

router.get("/", async (req, res) => {
  const { serviceTitle } = req.query;

  try {
    let filter = {};

    if (serviceTitle) {
      filter = { servicesOffered: { $in: [serviceTitle] } };
    }

    const professionals = await Professional.find(filter);
    res.json(professionals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch professionals" });
  }
});

router.post("/save", async (req, res) => {
  try {
    const newProfessional = new Professional({
      id: req.body.id,
      name: req.body.name,
      photo: req.body.photo,
      rating: req.body.rating,
      experience: req.body.experience,
      location: req.body.location,
      servicesOffered: req.body.servicesOffered,
      bio: req.body.bio,
    });
    newProfessional.save();
    res.send("Professional added successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:_id", async (req, res) => {
  try {
    const updateProfessional = new Professional.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        photo: req.body.photo,
        rating: req.body.rating,
        experience: req.body.experience,
        location: req.body.location,
        servicesOffered: req.body.servicesOffered,
        bio: req.body.bio,
        reviews: req.body.reviews,
      },
      { new: true }
    );

    if (!updateProfessional) {
      return res.status(404).send("Professional not found");
    }
    res.send(updateProfessional);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
