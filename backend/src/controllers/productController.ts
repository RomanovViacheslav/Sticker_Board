const { Product } = require("../models/models");
const fs = require("fs");
const path = require("path");
import { v4 as uuidv4 } from "uuid";
import * as boom from "@hapi/boom";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

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

export async function getProductsUser(isAdmin, userId, limit, page, search) {
  try {
    limit = limit || 8;
    page = page || 1;
    let offset = page * limit - limit;
    search = search.toLowerCase() || "";
    if (isAdmin) {
      const productUser = await Product.findAndCountAll({
        where: { title: { [Op.iLike]: "%" + search + "%" } },
        limit,
        offset,
      });
      return productUser;
    } else {
      const productUser = await Product.findAndCountAll({
        where: { userId, title: { [Op.like]: "%" + search + "%" } },
        limit,
        offset,
      });

      return productUser;
    }
  } catch (e) {
    console.log(e);
    return e;
  }
}
export async function deleteProduct(isAdmin, userId, prodId) {
  try {
    if (isAdmin) {
      const productUser = await Product.findOne({
        where: {
          id: prodId,
        },
      });
      const fileName = productUser.photo;
      fs.unlinkSync("./upload/" + fileName);
      const deleteProd = await Product.destroy({
        where: {
          id: prodId,
        },
      });
      return deleteProd;
    } else {
      try {
        const productUser = await Product.findOne({
          where: {
            id: prodId,
            userId,
          },
        });

        const fileName = productUser.photo;
        fs.unlinkSync("./upload/" + fileName);
        const deleteProd = await Product.destroy({
          where: {
            id: prodId,
            userId,
          },
        });

        return deleteProd;
      } catch (e) {
        return boom.badRequest("неверные параметры");
      }
    }
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getProductOne(prodId) {
  try {
    const productOne = await Product.findOne({
      where: {
        id: prodId,
        published: "Да",
      },
    });

    if (productOne === null) {
      return boom.badRequest("Объяление не найдено или находится на модерации");
    }
    return productOne;
  } catch (e) {
    console.log(e);
    return e;
  }
}
