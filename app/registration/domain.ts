import * as yup from "yup";

export const registrationSchema = yup
  .object({
    firstName: yup.string().trim().required("Firstname is required"),
    lastName: yup.string().trim().required("Lastname is required"),
    phone_no: yup
      .string()
      .matches(/^[6-9]\d{9}$/, {
        message: "Please enter valid number.",
        excludeEmptyString: false,
      })
      .required("Phone No is required"),
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

export type registrationObj = {
  firstName: string;
  lastName: string;
  phoneNo: string;
  email: string;
  password: string;
};
