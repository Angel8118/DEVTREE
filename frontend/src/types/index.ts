export type User = {
    image: string | undefined
    handle: string
    name: string
    email: string
    _id: string
    password: string
    description: string
    links: string // JSON stringified array of DevTreeLink
}
export type UserHandle = Pick<User, 'description' | 'handle' | 'image' | 'links' | 'name'>

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    password_confirmation: string
} 

export type LoginForm = Pick<User, 'email' | 'password'>

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}

export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>