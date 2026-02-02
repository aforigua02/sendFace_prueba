import database from "../config/database.js"
import { DataTypes } from "sequelize" 

const Post = database.define("Post", {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER, //id del token
        allowNull: false,
    }
});


export default Post;