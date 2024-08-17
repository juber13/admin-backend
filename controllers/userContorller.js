import User from "../models/userModel.js";

import generateToken from "../utils/jwtToken.js";

const register = async (req, res) => {
    const { name, email, password, phone, role } = req.body;

    if ([name, email, password, phone, role].some(field => field.trim() === "")) {
        return res.status(400).json({ error: "All fields are required" })
    }

    let isUserExits = await User.findOne({ email });

    if (isUserExits) {
        return res.status(400).json({ message: "User already exits" })
    }


    isUserExits = await User.create({ name, email, phone, password, role })

    delete isUserExits.password
    return res.status(201).json({
        message: "Register Successfully",
        success: true,
    })
}



const login = async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some(field => field === "")) {
        return res.status(400).json({ error: "Email and password is required" })
    }
    console.log({ email, password })
    const user = await User.findOne({ email });
    console.log(user)

    if (!user) return res.status(400).json({ message: "User does not exits with this email" });
    const isPasswordMatch = await user.comparePassword(password, user.password);

    if (!isPasswordMatch) return res.status(400).json({ message: "invalid creadentials" });

    generateToken(user, "login successfully", 200, res)

}


const getUsers = async (req, res) => {

    const users = await User.find({});
    if (!users) return res.status(404).json({ message: "No user raised the ticket yet" });
    //  console.log(users)
    // const userResponse = users.toObject();
    // delete userResponse.password;
    return res.status(200).json({ users })
}


export { register, login, getUsers }