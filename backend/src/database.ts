const Sequelize = require("sequelize");

module.exports = new Sequelize("backend_api", "postgres", "rootroot", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});
