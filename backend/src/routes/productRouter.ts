import * as joi from "joi";
import * as products from "../controllers/productController";

export default [
  {
    method: "POST",
    path: "/add",
    options: {
      auth: {
        strategy: "userauth",
      },
      validate: {
        payload: joi.object({
          title: joi.string().required(),
          price: joi.number().required(),
          photo: joi.string().required(),
          phone: joi.string().required(),
          location: joi.string().required(),
          category: joi.string().required(),
          description: joi.string().required(),
          published: joi.string().required(),
          
        }),
      },
    },
    handler(request: any, h) {
        
      return products.addProduct(request.payload, request.auth.credentials.userId);
    },
  },
];
