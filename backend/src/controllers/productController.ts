const { Product } = require("../models/models");
const fs = require("fs");
const path = require("path");
import { v4 as uuidv4 } from "uuid";
import * as boom from "@hapi/boom";

export async function addProduct(req, userId) {
  try {
    const { title, price, phone, location, category, description, published } =
      req;
    if (req.file === undefined) {
      return boom.badRequest("Необходимо загрузить фото");
    } else {
      let ext = path.extname(req.file.hapi.filename);
      if (
        ext !== ".jpg" &&
        ext !== ".jpeg" &&
        ext !== ".png" &&
        ext !== ".webp"
      ) {
        return boom.badRequest("Недопустимый тип файла");
      } else {
        const filename = uuidv4() + ext;
        const data = req.file._data;

        fs.writeFile("./upload/" + filename, data, (err) => {
          if (err) {
            console.log(err);
          }
        });

        const product = await Product.create({
          title,
          price,
          photo: filename,
          phone,
          location,
          category,
          description,
          published,
          userId: userId,
        });
        return product;
      }
    }
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getProductsUser(isAdmin, userId) {
  const limit = 8;

  if (isAdmin) {
    const productUser = await Product.findAndCountAll({ limit });
    return productUser;
  } else {
    const productUser = await Product.findAndCountAll({
      where: { userId },
      limit,
    });

    return productUser;
  }
}
