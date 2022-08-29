import * as hapi from "@hapi/hapi";
import * as joi from "joi";
import * as products from "../controllers/productController";
const fs = require("fs");

export default [
  {
    method: "POST",
    path: "/add",

    config: {
      auth: {
        strategy: "userauth",
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        maxBytes: 2097152,
      },
      // validate: {
      //   payload: joi.object({
      //     title: joi.string().required(),
      //     price: joi.number().required(),

      //     phone: joi.string().required(),
      //     location: joi.string().required(),
      //     category: joi.string().required(),
      //     description: joi.string().required(),
      //     published: joi.string().required(),
      //   }),
      // },
    },
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.addProduct(
        request.payload,
        request.auth.credentials.userId
      );
    },
  },

  {
    method: "GET",
    path: "/upload/{file*}",
    handler: {
      directory: {
        path: "upload",
      },
    },
  },
];
