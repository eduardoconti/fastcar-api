import { Entity, PrimaryColumn, Column } from "typeorm";

import { VeichleModel } from "./veichle.model";

@Entity({ schema: "fastcar", name: "user" })
export class UserModel {
   @PrimaryColumn("uuid")
      id!: string;

   @Column()
      name!: string;

   @Column()
      login!: string;

   @Column()
      password!: string;

   @Column({
      name: "createdAt",
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
   })
      createdAt!: Date;

   @Column({
      name: "updatedAt",
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
   })
      updatedAt?: Date;

   veichles?: VeichleModel[];

   @Column()
      status!: UserStatus;
}

type UserStatus = "ACTIVATED" | "DISABLED";
