import { Column, Entity } from "typeorm";

import { BaseEntity } from "./base.entity";

@Entity("permissions")
export class Permission extends BaseEntity {
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    description: string;
}