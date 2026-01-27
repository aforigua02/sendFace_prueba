import express from "express"
import { createPost, publicaciones } from "../controllers/postController.js"
import authenticarToken from "../middleware/autenticarUser.js"

const ruta = express.Router();

ruta.post("/publicar-post",authenticarToken,createPost)
ruta.post("/publicaciones",publicaciones)


export default ruta