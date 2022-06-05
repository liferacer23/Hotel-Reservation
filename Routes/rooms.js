const router = require("express").Router();
const { verifyAdmin,verifyUser } = require("../utils/verifyToken");
const {
    createRoom,
  updateRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateAvailability
} = require("../Controllers/RoomController");

//CREATE ROOM
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE ROOM

router.put("/:id", verifyAdmin, updateRoom);

//UPDATE ROOM AVAILABILITY

router.put("/availability/:id", updateAvailability);
//DELETE ROOM

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET ROOMS

router.get("/", getAllRooms);

//GET A SINGLE ROOM

router.get("/:id", getRoom);

module.exports = router;
