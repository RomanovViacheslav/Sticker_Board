import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "rootroot",
  database: "postgres",
  name: "root",
  synchronize: false,
  cache: false,
  entities: ["models/database/entity/**/*.ts"],
  migrations: ["models/database/migrations/**/*.ts"],
});
