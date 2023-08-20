import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUsers1692542213288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "perfil",
                        type: "text",
                    },
                    {
                        name: "created_at",
                        type: "date"
                    }
                ]
            }), 
            true,
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true);
    }

}
