import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config();

const database = new Sequelize(
    process.env.DB_NAME,     
    process.env.DB_USER,     
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST || 'db_auth',
        port: 5433, 
        dialect: 'postgres',
        logging: false, 
    }
);

export default database;