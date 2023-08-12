import { DataSourceOptions, DataSource } from "typeorm";
import path from "path";
import "dotenv/config";

const settings = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./database/entities/**.{ts,js}");
    const migrationPath: string = path.join(
        __dirname,
        "./database/migrations/**.{ts, js}"
    );

    if (
        !process.env.POSTGRES_USER ||
        !process.env.POSTGRES_PASSWORD ||
        !process.env.POSTGRES_HOST ||
        !process.env.POSTGRES_PORT ||
        !process.env.POSTGRES_DB
    ) throw new Error("Missing env vars");

    return {
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationPath],
    };
};

export const AppDataSource = new DataSource(settings());
