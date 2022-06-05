const router = require("express").Router();
const {
  createHotel,
  updateHotel,
  getHotel,
  getAllHotels,
  deleteHotel,
  countByCity,
  countByType,
  getHotelRooms
} = require("../Controllers/HotelController");
const { verifyAdmin } = require("../utils/verifyToken");


//CREATE HOTEL

router.post("/", verifyAdmin, createHotel);

//UPDATE HOTEL

router.put("/:id", verifyAdmin, updateHotel);


//DELETE HOTEL

router.delete("/:id", verifyAdmin, deleteHotel);

//GET HOTELS

router.get("/", getAllHotels);

//GET A SINGLE HOTEL

router.get("/find/:id", getHotel);

//GET NUMBER OF CITIES 

router.get("/countByCity", countByCity);

//GET NUMBER OF PROPERTIES
 
router.get("/countByType", countByType);

//GET HOTEL ROOMS

router.get("/rooms/:id", getHotelRooms);

module.exports = router;
