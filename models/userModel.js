import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    },

    email: {
        type: String,
        required: [true, "email is required"]
    },

    phone: {
        type: String,
        required: [true, "Phone Number is required"]
    },

    role: {
        type: String,
        required: true
    },


    password: {
        type: String,
        required: [true, "Password is required"]
    },

}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.methods.genrateJsonWebToken = function () {
    return jwt.sign({ id: this._id, name: this.name, role: this.role }, process.env.SECRETKEY, {
        expiresIn: "20m"
    })
}



const User = mongoose.model('User', userSchema);

export default User;