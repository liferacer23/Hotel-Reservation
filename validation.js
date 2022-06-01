const Joi = require("@hapi/joi");

const NewHotelValidation = (data)=>{
    const NewHotelSchema=Joi.object({
        name:Joi.string().min(4).required(),
        type:Joi.string().min(4).required(),
        city:Joi.string().min(4).required(),
        title:Joi.string().min(3).required(),
        address:Joi.string().min(3).required(),
        distances:Joi.string().required(),
        description:Joi.string().required(),
        cheapestPrice:Joi.number().required(),
        rating:Joi.number(),
    })
    const validateHotel = NewHotelSchema.validate(data);
    return validateHotel;
}
const UpdateHotelValidation = (data)=>{
    const UpdateHotelSchema=Joi.object({
        name:Joi.string().min(4),
        type:Joi.string().min(4),
        city:Joi.string().min(4),
        title:Joi.string().min(3),
        address:Joi.string().min(3),
        distances:Joi.string(),
        description:Joi.string(),
        cheapestPrice:Joi.number(),
        rating:Joi.number(),
    })
    const validateHotel = UpdateHotelSchema.validate(data);
    return validateHotel;
}

module.exports.NewHotelValidation = NewHotelValidation;
module.exports.UpdateHotelValidation = UpdateHotelValidation;