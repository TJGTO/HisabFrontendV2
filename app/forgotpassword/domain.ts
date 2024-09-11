import * as yup from "yup";

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valie email Id")
      .required("Email is required"),
  })
  .required();

export const setPasswordSchema = yup
  .object({
    password: yup.string().min(8, "Password shoule have minimum 8 characters"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();

export interface IForgotPasswordrequestBody {
  email: string;
}

export interface ISetPasswordrequestBody {
  email: string;
  fotp: string;
  newpassword: string;
}
