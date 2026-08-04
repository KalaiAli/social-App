import * as zod from "zod";

export const loginschema = zod
  .object({
    email: zod.string().nonempty("Email Required").email("Invali email"),
    password: zod
      .string()
      .nonempty("Password Required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Invalid Password, Start with Capital",
      ),
  });
