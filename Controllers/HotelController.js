const Hotel = require("../Models/HotelsModel");
const { NewHotelValidation } = require("../validation");
const { UpdateHotelValidation } = require("../validation");

//CREATE HOTEL
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

//GET ALL HOTELS

const getAllHotels = async (req, res, next) => {
  const {min,max,...others} = req.query;
  try {
    const allHotels = await Hotel.find({...others,cheapestPrice:{$gt:min || 1,$lt:max ||1000}}).limit(req.query.limit);
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
};

//GET SINGLE HOTEL

const getHotel = async (req, res, next) => {
  try {
    const singleHotel = await Hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (err) {
    next(err);
  }
};

//UPDATE HOTEL

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

//DELETE HOTEL

const deleteHotel = async (req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.json(`${deleteHotel.name} has been deleted`);
  } catch (err) {
    next(err);
  }
};

//GET NUMBER OF CITIES

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const list = await Promise.all(
      cities.map((findCity) => {
        return Hotel.countDocuments({ city: findCity });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
//GET NUMBER OF PROPERTIES

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const boatCount = await Hotel.countDocuments({ type: "boat" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
      { type: "boats", count: boatCount }
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports.createHotel = createHotel;
module.exports.getAllHotels = getAllHotels;
module.exports.getHotel = getHotel;
module.exports.updateHotel = updateHotel;
module.exports.deleteHotel = deleteHotel;
module.exports.countByCity = countByCity;
module.exports.countByType = countByType;
