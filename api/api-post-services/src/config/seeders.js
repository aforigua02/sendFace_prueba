import Post from "../models/postModel.js";

export const seedPosts = async () => {
    const count = await Post.count();
    if (count === 0) {
        await Post.bulkCreate([
            { content: "¡Hola! Soy Felipe y este es mi primer post.", userId: 1 },
            { content: "Soy Maria Paula y soy nueva en esta app.", userId: 2 },
            { content: "Probando la red social. Soy Michael.", userId: 3 }
        ]);
    }
};