const { Product } = require("../models/models");
import { v4 as uuidv4 } from "uuid";

export async function addProduct(req, userId) {
  const {
    title,
    price,
    photo,
    phone,
    location,
    category,
    description,
    published,
  } = req;
  const product = await Product.create({
    title,
    price,
    photo,
    phone,
    location,
    category,
    description,
    published,
    userId: userId,
  });
  return product;
}
