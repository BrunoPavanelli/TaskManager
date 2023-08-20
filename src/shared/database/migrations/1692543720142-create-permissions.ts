import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePermissions1692543720142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions",
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
                        name: "created_at",
                        type: "date"
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "roles_permissions",
            new TableForeignKey({
                columnNames: ["permission_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("permissions", true);
    }

}
