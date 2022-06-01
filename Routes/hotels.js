const router = require("express").Router();
const Hotel = require("../Models/HotelsModel");
const { NewHotelValidation } = require("../validation");
const { UpdateHotelValidation } = require("../validation");

//CREATE HOTEL

router.post("/", async (req, res) => {
  //Validating Hotel
  const valid = NewHotelValidation(req.body);
  if (valid.error) {
    res.status(400).json(valid.error.details[0].message);
  } else {
    const hotel = new Hotel(req.body);
    try {
      const saveHotel = await hotel.save();
      res.status(200).json(saveHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//UPDATE HOTEL

router.put("/:id", async (req, res) => {
  const valid = UpdateHotelValidation(req.body);
  if (valid.error) {
    res.status(400).json(valid.error.details[0].message);
  } else {
    try {
      const updateHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//DELETE HOTEL

router.delete("/:id", async (req, res) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.json(`${deleteHotel.name} has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET HOTELS

router.get("/", async (req, res) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A SINGLE HOTEL

router.get("/:id", async (req, res) => {
  try {
    const singleHotel = await Hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
