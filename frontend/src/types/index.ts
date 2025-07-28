export type User = {
    image: string | undefined
    handle: string
    name: string
    email: string
    _id: string
    password: string
    description: string
}

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    password_confirmation: string
} 

export type LoginForm = Pick<User, 'email' | 'password'>

export type ProfileForm = Pick<User, 'handle' | 'description'>