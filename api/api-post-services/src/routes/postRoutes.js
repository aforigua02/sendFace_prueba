import express from "express"
import { createPost, publicaciones, updatePost } from "../controllers/postController.js"
import authenticarToken from "../middleware/autenticarUser.js"

const ruta = express.Router();

ruta.post("/publicar-post",authenticarToken,createPost)
ruta.post("/publicaciones",publicaciones)
ruta.put("/actualizar/:id",updatePost)


export default ruta