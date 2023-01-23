import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ schema: 'fastcar', name: 'User' })
export class UserModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  @Column()
  status!: UserStatus;
}

type UserStatus = 'ACTIVATED' | 'DISABLED';
