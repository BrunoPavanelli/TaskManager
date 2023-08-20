import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateRolesPermissions1692545196917 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "roles_permissions",
                columns: [
                    {
                        name: "roleId",
                        type: "varchar"
                    },
                    {
                        name: "permissionId",
                        type: "varchar"
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
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "roles_permissions",
            new TableForeignKey({
                columnNames: ["permissionId"],
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
