import * as yup from "yup";

export const resetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valie email Id")
      .required("Email is required"),
    oldpassword: yup
      .string()
      .required()
      .min(8, "Password shoule have minimum 8 characters"),
    password: yup.string().min(8, "Password shoule have minimum 8 characters"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
  })
  .required();

export interface IChangePasswordrequestBody {
  email: string;
  oldpassword: string;
  newpassword: string;
}
