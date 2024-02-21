export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number;
  password: string;
  password_confirmation: string;
}

export interface IRegisterInstructor {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: number;
  password: string;
  password_confirmation: string;
}
export interface ILogin {
  email: string;
  password: string;
  role: string;
}
export interface Iotp {
  email: string;
  // otp: number;
}
export interface IotpVerify {
  email: string;
  verificationCode: string;
}
export interface IForgetPassword {
  email: string;
}
export interface IAddCourse {
  CourseOverview: string;
  CourseDuration: string;
  type: string;
  certification: string;
  price: string;
  CourseDescription: string;
  image: File;
}
export interface IEnrollment {
  email: string;
  category: string;
  address: string;
  firstname: string;
  lastname: string;
  contactnumber: number;
  duration: number;
  price: number;
  address: string;
  gender: string;
  emergencycontact: number;
}

export interface IEditProfile {
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: number;
  dob: Date;
  emergencycontactnumber: number;
  address: string;
  gender: string;
}
