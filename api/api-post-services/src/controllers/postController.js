import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; 

        const newPost = await Post.create({
            content,
            userId
        });

        res.status(201).json({
            message: "Post creado exitosamente!!",
            post: newPost
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear post", error: error.message });
    }
};

export const publicaciones = async(req,res)=>{
    try {
        const posts = await Post.findAll({
            order:[['createdAt','DESC']]
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los posts", error: error.message });
    }
}

export const updatePost = async (req,res) =>{
    try {
        const {id} = req.params;
        const { content } = req.body;

        const postActualizar = await Post.findByPk(id);

        if(!postActualizar) {
            return (
                res.status(404).json({ 
                    message: "Post no fue encontrado"})
            )
        }

        await postActualizar.update({content});
        
        res.json({
            message: "Post actualizado exitosamente!!",
            post: postActualizar
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error al actualizar el post" });
    }
}