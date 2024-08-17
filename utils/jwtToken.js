import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const generateToken = async (user, message, statusCode, res) => {
    const token = user.genrateJsonWebToken();
    const {id} = jwt.decode(token , process.env.SECRETKEY);
    const {role} = await User.findById(id);
    res.status(statusCode).json({
        success: true,
        message,
        token ,
        role,
    })

}

export default generateToken;

