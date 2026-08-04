import * as zod from "zod";

export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is Required")
      .min(3, "Min 3 Letters")
      .max(8, "Max 8 Letters"),
    username: zod
      .string()
      .nonempty("Username is Required")
      .regex(
        /^[A-Z][a-z0-9_]{5,10}$/,
        "Invalid Username,Should Start With Capital Letter,min 5  and Max 10",
      ),
    email: zod.string().nonempty("Email Required").email("Invali email"),
    password: zod
      .string()
      .nonempty("Password Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid Password, Start with Capital",
      ),
    rePassword: zod.string().nonempty("rePassword Required"),
    gender: zod.string().nonempty("Gender is Required"),
    dateOfBirth: zod
      .string()
      .nonempty("Date is Required")
      .refine((value) => {
        const dateVal = new Date(value);

        if (isNaN(dateVal.getTime())) {
          return false;
        }

        const current = new Date().getFullYear();
        const year = dateVal.getFullYear();
        const age = current - year;

        return age > 20;
      }, "Age Must be Greater than 20"),
  })
  .refine((obj) => obj.password === obj.rePassword, {
    path: ["rePassword"],
    message: "Password and RePassword not Matched",
  });
