import "dotenv/config"
import express from "express"
import cors from "cors"
import database from "./src/config/database.js"
import Post from "./src/models/postModel.js"
import ruta from "./src/routes/postRoutes.js"
import { seedPosts } from "./src/config/seeders.js"

const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/posts",ruta)

try {
    await database.authenticate();
    await database.sync({
        alter:true
    });
    await seedPosts();
    app.use("/api/posts", ruta);
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
        console.log(`Servicio post corriendo en el puerto http://localhost:3002`);
    });
} catch (error) {
    console.log("Error en conexión", error);
}

