import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateRolesPermissions1692545196917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles_permissions",
                columns: [
                    {
                        name: "role_id",
                        type: "varchar"
                    },
                    {
                        name: "permission_id",
                        type: "varchar"
                    }

                ]
            })
        );

        
        await queryRunner.createForeignKey(
            "roles_permissions",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE"
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
        await queryRunner.dropTable("roles_permissions", true);
    }

}
