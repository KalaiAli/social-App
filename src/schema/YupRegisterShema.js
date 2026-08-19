/* eslint-disable no-unused-vars */
import * as yup from "yup";
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const userNameRegex = /^[A-Z][a-z0-9_]{5,10}$/;
export const schemaYup = yup.object({
  name: yup
    .string()
    .required("Name is Required")
    .min(3, "Min 3 Letters")
    .max(8, "Max 8 Letters"),
  username: yup
    .string()
    .required("Username is Required")
    .matches(
      userNameRegex,
      "Invalid Username,Should Start With Capital Letter,min 5  and Max 10",
    ),
  email: yup.string().required("Email Required").email("Invalid email"),
  password: yup
    .string()
    .required("Password Required")
    .matches(
      passwordRegex,
      "Your Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    ),
  rePassword: yup
    .string()
    .required("rePassword Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  gender: yup
    .string()
    .required("Gender is Required")
    .oneOf(["male", "female"], "Gender must be either male or female"),
  dateOfBirth: yup.string().required("Date of birth is Required"),
});
