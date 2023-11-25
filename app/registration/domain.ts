import * as yup from "yup";

export const registrationSchema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valie email Id")
      .required("Email is required"),
    password: yup.string().min(8, "Password shoule have minimum 8 characters"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password")], "Your passwords do not match."),
    checked: yup.boolean(),
  })
  .required();
