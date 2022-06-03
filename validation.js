const Joi = require('joi');
const { joiPassword } = require('joi-password');


const NewHotelValidation = (data) => {
  const NewHotelSchema = Joi.object({
    name: Joi.string().min(4).required(),
    type: Joi.string().min(4).required(),
    city: Joi.string().min(4).required(),
    title: Joi.string().min(3).required(),
    address: Joi.string().min(3).required(),
    distances: Joi.string().required(),
    description: Joi.string().required(),
    cheapestPrice: Joi.number().required(),
    rating: Joi.number(),
  });
  const validateHotel = NewHotelSchema.validate(data);
  return validateHotel;
};
const UpdateHotelValidation = (data) => {
  const UpdateHotelSchema = Joi.object({
    name: Joi.string().min(4),
    type: Joi.string().min(4),
    city: Joi.string().min(4),
    title: Joi.string().min(3),
    address: Joi.string().min(3),
    distances: Joi.string(),
    featured: Joi.boolean(),
    description: Joi.string(),
    cheapestPrice: Joi.number(),
    rating: Joi.number(),
  });
  const validateHotel = UpdateHotelSchema.validate(data);
  return validateHotel;
};
const UserRegisterValidation = (data) => {
  const UserRegisterSchema = Joi.object({
    username: Joi.string().min(4),
    email: Joi.string().email(),
    password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(8)
    .required()
  });
  const validateUser = UserRegisterSchema.validate(data);
  return validateUser;
};
const UserLoginValidation = (data) => {
  const UserLoginSchema = Joi.object({
    username: Joi.string().min(4),
    password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(8)
    .required()
  });
  const validateUser = UserLoginSchema.validate(data);
  return validateUser;
};

const NewUserValidation = (data) => {
  const NewUserSchema = Joi.object({
    email:Joi.string().email().required(),
    username: Joi.string().min(4).required(),
    password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(8)
    .required()
  });
  const validateUser = NewUserSchema.validate(data);
  return validateUser;
};

const UpdateUserValidation = (data) => {
  const NewUserSchema = Joi.object({
    email:Joi.string().email(),
    username: Joi.string().min(4),
    password: joiPassword
    .string()
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .min(8)
  });
  const validateUser = NewUserSchema.validate(data);
  return validateUser;
};

const NewRoomValidation = (data)=>{
  const NewRoomSchema = Joi.object({
    title:Joi.string().min(3).required(),
    price:Joi.number().required(),
    maxPeople:Joi.number().min(1).required(),
    description:Joi.string().min(5).required(),
    roomNumbers:Joi.array().required()
  })
  const validateRoom = NewRoomSchema.validate(data);
  return validateRoom;
};

const UpdateRoomValidation = (data)=>{
  const NewRoomSchema = Joi.object({
    title:Joi.string().min(3),
    price:Joi.number(),
    maxPeople:Joi.number().min(1),
    description:Joi.string().min(5),
    roomNumbers:Joi.array()
  })
  const validateRoom = NewRoomSchema.validate(data);
  return validateRoom;
};

module.exports.NewHotelValidation = NewHotelValidation;
module.exports.UpdateHotelValidation = UpdateHotelValidation;
module.exports.UserRegisterValidation = UserRegisterValidation;
module.exports.UserLoginValidation = UserLoginValidation;
module.exports.NewUserValidation = NewUserValidation;
module.exports.UpdateUserValidation = UpdateUserValidation;
module.exports.NewRoomValidation = NewRoomValidation;
module.exports.UpdateRoomValidation = UpdateRoomValidation;
