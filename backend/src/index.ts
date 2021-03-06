import * as hapi from "@hapi/hapi";
import routes from "./routes";
const HapiNowAuth = require("@now-ims/hapi-now-auth");
import dataSource from "../ormconfig";
const sequelize = require("./database");
const models = require("../src/models/models.ts");

const bcrypt = require("bcrypt");

import * as users from "./userController";

const srv = hapi.server({
  port: 3001,
  routes: {
    cors: {
      origin: ["*"],
    },
  },
});

const plugins: any[] = [HapiNowAuth];

srv.register(plugins).then(() => {
  srv.auth.strategy("userauth", "hapi-now-auth", {
    validate: (request: any, token: any, h: any) => {
      const user = users.getSession(token);
      const scopes = [];

      if (user) {
        if (user.isAdmin) {
          // scopes.push("admin");
        }
        return {
          isValid: true,
          credentials: {
            scope: scopes,
            userId: user.userId,
            isAdmin: user.isAdmin,
          },
        };
      } else {
        return {
          isValid: false,
          credentials: {},
        };
      }
    },
  });

  sequelize.authenticate();
  sequelize.sync();

  srv.route(routes);

  srv.start().then(() => {
    console.log("start server");
  });
});
