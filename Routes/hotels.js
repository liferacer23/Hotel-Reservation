const router = require("express").Router();
const {createHotel,updateHotel,getHotel,getAllHotels,deleteHotel} = require("../Controllers/HotelController")

//CREATE HOTEL

router.post("/", createHotel);

//UPDATE HOTEL

router.put("/:id", updateHotel);

//DELETE HOTEL

router.delete("/:id", deleteHotel);

//GET HOTELS

router.get("/", getAllHotels);

//GET A SINGLE HOTEL

router.get("/:id", getHotel);

module.exports = router;
