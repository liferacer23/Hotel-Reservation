const router = require("express").Router();
const {
  createHotel,
  updateHotel,
  getHotel,
  getAllHotels,
  deleteHotel,
} = require("../Controllers/HotelController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");
//CREATE HOTEL

router.post("/", verifyAdmin, createHotel);

//UPDATE HOTEL

router.put("/:id", verifyAdmin, updateHotel);

//DELETE HOTEL

router.delete("/:id", verifyAdmin, deleteHotel);

//GET HOTELS

router.get("/", getAllHotels);

//GET A SINGLE HOTEL

router.get("/:id", getHotel);

module.exports = router;
