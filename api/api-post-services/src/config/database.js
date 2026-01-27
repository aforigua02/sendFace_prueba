import { Sequelize } from "sequelize";
import "dotenv/config"

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST || 'db_posts',
        port: 5432,
        dialect: 'postgres',
        logging: false,
    }
);

export default database;