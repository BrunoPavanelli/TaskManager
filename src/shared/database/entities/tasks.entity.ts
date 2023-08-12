import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

import { BaseEntity } from "./base.entity";
import { User } from "./users.entity";
import { TaskDeadline } from "./tasksDeadline.entity";

@Entity("tasks")
export class Task extends BaseEntity {
    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    description: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;

    @OneToOne(() => TaskDeadline, (taskDeadline) => taskDeadline.task)
    taskDeadline: TaskDeadline;

}