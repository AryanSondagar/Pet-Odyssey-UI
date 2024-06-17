export interface UserSign{
    name:String,
    email:String,
    password: String
}
export interface UserLogin{
    UserEmail:String,
    UserPassword:String
}
export interface AdminLogin{
    AdminEmail: String,
    AdminPassword: String
}