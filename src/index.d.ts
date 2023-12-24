export interface IRegister{
    
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: number;
    password: string;
    password_confirmation: string;
}
export interface ILogin{
    email: string;
    password: string;
}
export interface Iotp{
    email: string;
    otp: number;
}