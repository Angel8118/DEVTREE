import jwt, {JwtPayload}  from 'jsonwebtoken'

export const generateJwt = (payload : JwtPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '60d' // Puedes ajustar el tiempo de expiración según tus necesidades
    })
    return token
}