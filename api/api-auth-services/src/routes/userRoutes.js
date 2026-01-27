import express from "express";
import { registrar , login} from "../controllers/userController.js";

const ruta = express.Router();

ruta.post("/registrar", registrar);
ruta.post("/login", login);

export default ruta;