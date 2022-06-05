const Room = require("../Models/RoomModel");
const Hotel = require("../Models/HotelsModel");
const { createError } = require("../utils/error");
const { NewRoomValidation, UpdateRoomValidation } = require("../validation");

//CREATE ROOM

const createRoom = async (req, res, next) => {
  const validate = NewRoomValidation(req.body);
  if (validate.error) {
    next(createError(500, validate.error.details[0].message));
  } else {
    const hotelId = req.params.hotelid;
    const NewRoom = new Room(req.body);
    try {
      const savedRoom = await NewRoom.save();
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
      } catch (err) {
        next(createError(500, err));
      }
      res.status(200).json(savedRoom);
    } catch (err) {
      next(createError(500, err));
    }
  }
};

//GET ALL ROOMS

const getAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (err) {
    next(err);
  }
};

//GET SINGLE ROOM

const getRoom = async (req, res, next) => {
  try {
    const singleRoom = await Room.findById(req.params.id);
    res.status(200).json(singleRoom);
  } catch (err) {
    next(err);
  }
};

//UPDATE ROOM

const updateRoom = async (req, res, next) => {
  const valid = UpdateRoomValidation(req.body);
  if (valid.error) {
    res.status(400).json(valid.error.details[0].message);
  } else {
    try {
      const updateRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateRoom);
    } catch (err) {
      next(err);
    }
  }
};

//UPDATE ROOM AVAILABILITY

const updateAvailability = async (req, res, next) => {
  try {
    const updated = await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
   res.status(200).json("uPDated")
  } catch (err) {
    next(err);
  }
};

//DELETE ROOM

const deleteRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelid;
    try {
      await Hotel.findByIdAndDelete(hotelId, {
        $pull: { rooms: req.param.id },
      });
    } catch (err) {
      next(createError(500, err));
    }
    const deleteRoom = await Room.findByIdAndDelete(req.params.id);
    res.json(`${deleteRoom.title} has been deleted`);
  } catch (err) {
    next(err);
  }
};

module.exports.createRoom = createRoom;
module.exports.deleteRoom = deleteRoom;
module.exports.updateRoom = updateRoom;
module.exports.updateAvailability = updateAvailability;
module.exports.getAllRooms = getAllRooms;
module.exports.getRoom = getRoom;
