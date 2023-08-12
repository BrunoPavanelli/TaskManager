import { PrimaryColumn, Column } from "typeorm";
import { randomUUID } from "node:crypto";

export class BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }

    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}

