import { DataSource } from "typeorm";

import { UserModel } from "../../models";

type DbType = "postgres";
export const AppDataSource = new DataSource({
   type: process.env.DB_TYPE as DbType,
   host: process.env.DB_HOST as string,
   port: parseInt(process.env.DB_PORT as string),
   username: process.env.DB_USER as string,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   synchronize: false,
   logging: false,
   entities: [UserModel],
   subscribers: [],
   migrations: [],
});
