import * as zod from "zod";

export const changePasswordSchema = zod
  .object({
    password: zod
      .string()
      .nonempty("Password Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid Password, Start with Capital",
      ),
    newPassword: zod
      .string()
      .nonempty("Password Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid newPassword, Start with Capital",
      ),
  })
  .refine((obj) => obj.password !== obj.newPassword, {
    path: ["newPassword"],
    message: "New password must be different from your current password ",
  });
