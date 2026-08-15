import { Button } from "@heroui/react";
import { Input } from "@heroui/react";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { schema } from "../../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../Context/AuthContext";
import { schemaYup } from "../../schema/YupRegisterShema";



export default function Register() {
  let { setuserToken } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [showRePassword, setShowRePassword] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  const [apiError, setapiError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schemaYup),
  });

  // async function submitForm(userObj) {
  //   const data = {
  //     name: userObj.name,
  //     username: userObj.username,
  //     email: userObj.email,
  //     password: userObj.password,
  //     rePassword: userObj.repassword,
  //     gender: userObj.gender,
  //     dateOfBirth: userObj.dateofbirth,
  //   };

  //   axios
  //     .post("https://route-posts.routemisr.com/users/signup", data)
  //     .then((response) => {
  //       if (response.data.message === "account created") {
  //         localStorage.setItem("token", response.data.data.token);
  //         setMessage("Account created successfully!");
  //         setTimeout(() => {
  //           navigate("/");
  //         }, 1500);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.response?.data);
  //     })
  //     .finally(() => {
  //       console.log("stop");
  //     });
  // }

  function submitForm(userData) {
    setisLoading(true);

    console.log(userData);

    axios
      .post("https://route-posts.routemisr.com/users/signup", userData)
      .then((response) => {
        console.log(response);
        if (response.data.message === "account created") {
          const token = response.data.data.token;

          localStorage.setItem("token", token);
          setuserToken(token);

          console.log(token);

          setMessage("Account created successfully!");
          console.log(message);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setapiError(error.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  return (
    <>
      <div className="bg-gray-200 min-h-screen p-3">
        <div className="w-1/2 bg-white rounded-md mx-auto p-5 mt-5">
          <h2 className="text-sky-600 font-bold text-center text-2xl my-3">
            Register Now
          </h2>

          <form onSubmit={handleSubmit(submitForm)}>
            <div className=" flex flex-col gap-7">
              <div>
                <Input
                  {...register("name")}
                  aria-label="Name"
                  className="w-full"
                  placeholder="Enter your name"
                />
                {formState.errors.name && formState.touchedFields.name && (
                  <p className="text-red-500 bg-gray-200 text-sm py-1  mt-1 text-center rounded-2xl">
                    {formState.errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  {...register("username")}
                  aria-label="userName"
                  className="w-full"
                  placeholder="Enter your userNamne"
                />
                {formState.errors.username &&
                  formState.touchedFields.username && (
                    <p className="text-red-500 bg-gray-200 text-sm  py-1 mt-1 text-center rounded-2xl">
                      {formState.errors.username?.message}
                    </p>
                  )}
              </div>
              <div>
                <Input
                  {...register("email")}
                  aria-label="Email"
                  className="w-full"
                  placeholder="Enter your Email"
                />
                {formState.errors.email && formState.touchedFields.email && (
                  <p className="text-red-500 bg-gray-200 text-sm py-1  mt-1 text-center rounded-2xl">
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>
              <div className="relative w-full">
                <Input
                  {...register("password")}
                  aria-label="Password"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                {formState.errors.password &&
                  formState.touchedFields.password && (
                    <p className="text-red-500 bg-gray-200 text-sm py-1 mt-1 text-center rounded-2xl">
                      {formState.errors.password?.message}
                    </p>
                  )}
              </div>
              <div className="relative w-full">
                <Input
                  {...register("rePassword")}
                  aria-label="RePassword"
                  type={showRePassword ? "text" : "password"}
                  className="w-full"
                  placeholder="Renter your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowRePassword(!showRePassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <FontAwesomeIcon icon={showRePassword ? faEyeSlash : faEye} />
                </button>
                {formState.errors.rePassword &&
                  formState.touchedFields.rePassword && (
                    <p className="text-red-500 bg-gray-200 text-sm py-1 mt-1 text-center rounded-2xl">
                      {formState.errors.rePassword?.message}
                    </p>
                  )}
              </div>
              <div className="flex gap-5">
                <div>
                  <Input
                    {...register("dateOfBirth")}
                    aria-label="DateOfbirth"
                    type="date"
                    className="w-full"
                    placeholder="Enter your Date of Birth"
                  />
                  {formState.errors.dateOfBirth &&
                    formState.touchedFields.dateOfBirth && (
                      <p className="text-red-500 bg-gray-200 text-sm py-1 mt-1 text-center rounded-2xl">
                        {formState.errors.dateOfBirth?.message}
                      </p>
                    )}
                </div>
                <div>
                  <select
                    {...register("gender")}
                    className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Choose a Gender
                    </option>

                    <option value="male">Male</option>

                    <option value="female">Female</option>
                  </select>
                  {formState.errors.gender &&
                    formState.touchedFields.gender && (
                      <p className="text-red-500 bg-gray-200 text-sm py-1 mt-1 text-center rounded-2xl">
                        {formState.errors.gender?.message}
                      </p>
                    )}
                </div>
              </div>
            </div>
            {apiError && (
              <div className="bg-red-200 text-white p-2  m-2 rounded-sm text-center font-bold">
                {apiError}
              </div>
            )}

            <Button
              type="submit"
              isDisabled={isLoading}
              className="w-full my-5 py-4 text-2xl"
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
