import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
    handle: string
    name: string
    email: string
    _id: string
    password: string
    description: string
    image: string
}

const userSchema = new Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: ''
    }
})
const UserModel = mongoose.model<IUser>("User", userSchema)
export default UserModel
