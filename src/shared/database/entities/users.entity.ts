import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

import { BaseEntity } from "./base.entity";
import { Permission } from "./permissions.entity";
import { Task } from "./tasks.entity";
import { Role } from "./roles.entity";

@Entity("users")
export class User extends BaseEntity {
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    email: string

    @Column({ type: "varchar", length: 255 })
    password: string

    @Column({ type: "text"})
    perfil: string

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @ManyToMany(() => Role)
    @JoinTable({
        name: "users_roles",
        joinColumns: [{ name: "user_id" }],
        inverseJoinColumns: [{ name: "role_id" }],
    })
    roles: Role[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
      const isHashed = getRounds(this.password);
  
      if (!isHashed) this.password = hashSync(this.password, 10);
    }
}