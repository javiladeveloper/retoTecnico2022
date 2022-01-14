const Joi = require('joi');

module.exports.inputValidator = (input, service) => {
    let schema
    switch (service) {
        case "list":
            schema = Joi.object({
                id: Joi.number().optional(),
                name: Joi.string().optional(),
                year: Joi.number().optional(),
                color: Joi.string().optional(),
                pantone_value: Joi.string().optional(),
                page: Joi.number().min(1).required()
            });
            break;
        case "find":
            schema = Joi.object({
                id: Joi.number().required()
            });
            break;
        case "create":
            schema = Joi.object({
                name: Joi.string().required(),
                year: Joi.number().required(),
                color: Joi.string().required(),
                pantone_value: Joi.string().required()
            });
            break;
    }
    return schema.validate(input, { abortEarly: false });
};
