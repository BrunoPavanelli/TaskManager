import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

import { BaseEntity } from "./base.entity";
import { Task } from "./tasks.entity";

@Entity("tasks_deadlines")
export class TaskDeadline extends BaseEntity {
    @Column({ type: "varchar" })
    expiration_date: string;

    @Column({ type: "varchar" })
    expiration_hour: string;

    @OneToOne(() => Task)
    @JoinColumn()
    task: Task;
}