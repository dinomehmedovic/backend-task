import * as Joi from "joi";

export const create = Joi.object().keys({
  name: Joi.string().required(),
  stock: Joi.number().required(),
  price: Joi.object().keys({
    amount: Joi.number().required(),
    currency: Joi.string().required(),
  }),
});

export const update = Joi.object().keys({
  stock: Joi.number().required(),
});

export const productSchema = { create, update };
