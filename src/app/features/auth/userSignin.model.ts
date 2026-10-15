export type Role = 'User' | 'Admin';
export interface UserSign{
    name:string,
    email:string,
    password: String,
    role:'User'
}
export interface UserLogin{
    email:String,
    password:String,
    role:'User'
}
export interface AdminLogin{
    email: String,
    password: String,
    role:'Admin'
}