import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valie email Id")
      .required("Email is required"),
    password: yup.string().min(8, "Password shoule have minimum 8 characters"),
  })
  .required();

export type loginObj = {
  email: string;
  password: string;
};
