import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error("No autorizado")
        return res.status(401).json({ error: error.message })
    }

    const [, token] = bearer.split(" ")

    if (!token) {
        const error = new Error("No autorizado")
        return res.status(401).json({ error: error.message })
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id).select("-password -__v")
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" })
            }
            req.user = user
            next()
        }
    } catch (error) {
        console.error("Fallo autenticación:", error);
        return res.status(401).json({ error: "Token inválido o expirado" });
    }

}