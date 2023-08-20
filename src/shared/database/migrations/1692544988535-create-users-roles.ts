import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUsersRoles1692544988535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_roles",
                columns: [
                    {
                        name: "userId",
                        type: "varchar"
                    },
                    {
                        name: "roleId",
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
            "users_roles",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        
        await queryRunner.createForeignKey(
            "users_roles",
            new TableForeignKey({
                columnNames: ["roleId"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_roles", true);
    }

}
