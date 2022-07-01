import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}

export default User;
