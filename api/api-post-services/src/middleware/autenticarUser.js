import jwt from "jsonwebtoken"
import "dotenv/config"

const authenticarToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({
            messsage:"No hay Token proporcionado"
        });
    }

    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
            return res.status(403).json({
                messsage:"Token no valido"
            });
        }

        req.user = decoded;
        next();
    })
}

export default authenticarToken;