const router = require("express").Router();
const { verifyAdmin } = require("../utils/verifyToken");
const {
    createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
} = require("../Controllers/RoomController");

//CREATE ROOM
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE ROOM

router.put("/:id", verifyAdmin, updateRoom);

//DELETE ROOM

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET ROOMS

router.get("/", getAllRooms);

//GET A SINGLE ROOM

router.get("/:id", getRoom);

module.exports = router;
