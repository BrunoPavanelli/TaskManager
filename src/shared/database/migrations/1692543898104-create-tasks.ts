import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTasks1692543898104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "userId",
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
            "tasks",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks", true);
    }

}
