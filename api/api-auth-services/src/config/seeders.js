import User from "../models/userModel.js";

export const seedUsers = async () => {
    const count = await User.count();
    if (count === 0) {
        await User.bulkCreate([
            { username: "felipe_dev", password: "123" },
            { username: "maria_paula", password: "123" },
            { username: "michael_social", password: "123" }
        ], { individualHooks: true }); 
        console.log("✅ Usuarios de prueba creados");
    }
};