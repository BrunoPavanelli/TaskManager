import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Permission } from "./permissions.entity";

@Entity("roles")
export class Role extends BaseEntity {
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    description: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: "roles_permissions",
        joinColumns: [{ name: "role_id" }],
        inverseJoinColumns: [{ name: "permission_id" }],
    })
    permissions: Permission[];
}