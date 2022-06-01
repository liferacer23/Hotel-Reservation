const Hotel = require("../Models/HotelsModel");
const { NewHotelValidation } = require("../validation");
const { UpdateHotelValidation } = require("../validation");

const createHotel = async (req, res, next) => {
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
      next(err);
    }
  }
};
const getAllHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
};
const getHotel = async (req, res, next) => {
  try {
    const singleHotel = await Hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (err) {
    next(err);
  }
};
const updateHotel = async (req, res, next) => {
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
      next(err);
    }
  }
};
const deleteHotel = async (req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.json(`${deleteHotel.name} has been deleted`);
  } catch (err) {
    next(err);
  }
};

module.exports.createHotel = createHotel;
module.exports.getAllHotels = getAllHotels;
module.exports.getHotel = getHotel;
module.exports.updateHotel = updateHotel;
module.exports.deleteHotel = deleteHotel;
