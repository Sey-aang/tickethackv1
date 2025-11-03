const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");
const moment = require("moment");

// Route GET pour rechercher des trajets
router.get("/:departure/:arrival/:date", async (req, res) => {
  const { departure, arrival, date } = req.params;

  // Créer les dates de début et fin pour le jour recherché
  const startDate = moment(date).startOf("day").toDate();
  const endDate = moment(date).endOf("day").toDate();

  const trips = await Trip.find({
    departure: { $regex: new RegExp(departure, "i") },
    arrival: { $regex: new RegExp(arrival, "i") },
    date: { $gte: startDate, $lte: endDate },
  });

  if (trips.length > 0) {
    res.json({ result: true, trips });
  } else {
    res.json({ result: false, message: "No trips found" });
  }
});

module.exports = router;
