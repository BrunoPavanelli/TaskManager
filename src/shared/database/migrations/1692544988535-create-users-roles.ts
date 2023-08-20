import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUsersRoles1692544988535 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_roles",
                columns: [
                    {
                        name: "user_id",
                        type: "varchar"
                    },
                    {
                        name: "role_id",
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
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE"
            })
        );

        
        await queryRunner.createForeignKey(
            "users_roles",
            new TableForeignKey({
                columnNames: ["role_id"],
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
