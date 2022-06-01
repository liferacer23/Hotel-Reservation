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

module.exports.NewHotelValidation = NewHotelValidation;
module.exports.UpdateHotelValidation = UpdateHotelValidation;
module.exports.UserRegisterValidation = UserRegisterValidation;
module.exports.UserLoginValidation = UserLoginValidation;
