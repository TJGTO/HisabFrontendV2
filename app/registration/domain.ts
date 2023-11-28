import * as yup from "yup";

export const registrationSchema = yup
  .object({
    firstName: yup.string().required("Firstname is required"),
    lastName: yup.string().required("Lastname is required"),
    phoneNo: yup
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
