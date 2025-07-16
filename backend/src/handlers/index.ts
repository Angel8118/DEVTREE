import { Request, Response } from "express"
import { validationResult } from "express-validator"
import User from "../models/User"
import jwt from "jsonwebtoken"
import { hash } from "bcrypt"
import { checkPassword, hashPassword } from "../utils/auth"
import slug from "slug"
import { generateJwt } from "../utils/jwt"

export const createAccount = async (req : Request, res : Response) => {

    const { email, password} = req.body

    // Validar si el usuario ya existe
    const userExists = await User.findOne({ email })

    if (userExists) {
        const error = new Error("El usuario con este email ya existe")
        return res.status(409).json({ message: error.message })
    }

    // Validar el handle
    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({ handle })
    if (handleExists) {
        const error = new Error("El nombre de usuario ya está en uso")
        return res.status(409).json({ message: error.message })
    }

    const user = new User(req.body)
    // Hashear la contraseña
    user.password = await hashPassword(password)

    // Asignar un handle único
    user.handle = handle

    // Guardar el usuario en la base de datos
    await user.save()

    res.status(201).json({ message: "Usuario registrado con éxito" })
}    

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Validar si el usuario existe
    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ message: error.message })
    }
    // Validar la contraseña
    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error("Contraseña incorrecta")
        return res.status(401).json({ message: error.message })
    }

    // Generar un JWT (JSON Web Token) para el usuario
    const token = generateJwt({id: user._id, email: user.email})

    // Si todo es correcto, enviar una respuesta de éxito
    res.status(200).json({
        message: "Inicio de sesión exitoso",
        token
    })

}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user)
}

export const UpdateProfile = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
    } catch (e) {
        const error = new Error("Error al actualizar el perfil")
        return res.status(500).json({ message: error.message })
    }
}