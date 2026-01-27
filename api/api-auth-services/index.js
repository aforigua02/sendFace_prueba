dotenv.config();
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import database from "./src/config/database.js";
import User from "./src/models/userModel.js";
import userRoutes from "./src/routes/userRoutes.js"
import { seedUsers } from "./src/config/seeders.js";

const app = express();
app.use(cors());
app.use(express.json());

try {
    await database.authenticate();    
    await database.sync({
        alter:true
    });
    await seedUsers();
    console.log("Tablas y Usuarios");
    app.use("/api/auth",userRoutes)
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, ()=>{
        console.log("Servicio auth corriendo en http://localhost:3001")
    });
} catch (error) {
    console.log("Erroe en conexion",error)
}
