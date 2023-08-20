import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTasksDeadlines1692544276496 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks_deadlines",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "expiration_date",
                        type: "varchar",
                    },
                    {
                        name: "expiration_hour",
                        type: "varchar",
                    },
                    {
                        name: "taskId",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "date"
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "tasks_deadlines",
            new TableForeignKey({
                columnNames: ["taskId"],
                referencedColumnNames: ["id"],
                referencedTableName: "tasks",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks_deadlines", true);
    }

}
