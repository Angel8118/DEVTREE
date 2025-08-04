import { Router } from "express"
import { body } from "express-validator"
import { createAccount, getUser, getUserByHandle, login, searchByHandle, UpdateProfile, UploadImage } from "./handlers"
import { handleInputErrors } from "./middleware/validation"
import { authenticate } from "./middleware/auth"
import { get } from "mongoose"
const router = Router()

// Authentication routes and registration
router.post("/auth/register",
    body("handle")
        .notEmpty()
        .withMessage("El nombre de usuario (handle) es obligatorio"),
    body("name")
        .notEmpty()
        .withMessage("El nombre es obligatorio"),
    body("email")
        .isEmail()
        .withMessage("El email es obligatorio y debe ser válido"),
    body("password")
        .notEmpty()
        .withMessage("La contraseña debe contener al menos 8 caracteres")
        .isLength({ min: 8 }),
    handleInputErrors,
    createAccount)

router.post("/auth/login",
    body("email")
        .isEmail()
        .withMessage("El email es obligatorio y debe ser válido"),
    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),
    handleInputErrors,
    login

)

router.get('/user', authenticate, getUser)

router.patch('/user',
    body("handle")
        .notEmpty()
        .withMessage("El nombre de usuario (handle) es obligatorio"),
    handleInputErrors,
    authenticate,
    UpdateProfile)

router.post('/user/image', authenticate, UploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
    body("handle")
        .notEmpty()
        .withMessage("El nombre de usuario (handle) es obligatorio"),
    handleInputErrors,
    searchByHandle
)

export default router