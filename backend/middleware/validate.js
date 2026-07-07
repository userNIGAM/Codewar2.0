import Joi from "joi";

export const validateSponsor = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    salutation: Joi.string().min(3).max(30).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};

export const validateSupportedBy = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(60).required(),
    role: Joi.string().min(3).max(40).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  next();
};