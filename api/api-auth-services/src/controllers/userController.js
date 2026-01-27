import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const registrar = async(req,res)=>{
    try {
        const {username, password} = req.body;
        const nuevoUsuario = await User.create({
            username,
            password
        });

        res.status(201).json({
            message:"Usuario nuevo registrado con exito",
            user:{
                id:nuevoUsuario.id,
                username:nuevoUsuario.username
            }
        });
    } catch (error) {
        res.status(500).json({
            message:"Error al registrar usuario",
            error:error.message
        });
    }
}

export const login = async (req,res)=>{
    try {
        const {username,password} = req.body;

        const user = await User.findOne({
            where:{username}
        })
        if(!user){
            return res.status(404).json({
                message:"Usuario no encontrado"
            });
        }

        const comparacionPass = await bcrypt.compare(password,user.password);
        if(!comparacionPass){
            return res.status(401).json({
                message:"Contraseña incorrecta"
            });
        }

        const token = jwt.sign({
            id:user.id,
            username:user.username
        },process.env.JWT_SECRET,{expiresIn:'1h'})

        res.json({
            message:"¡Login exitoso!",
            token
        })
    } catch (error) {
        res.status(500).json({ message: "Error en el login", error: error.message });
    }
}