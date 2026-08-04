import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { loginschema } from "../../schema/loginShema";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  let { setuserToken } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // const [message, setMessage] = useState("");

  // const [showRePassword, setShowRePassword] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  const [apiError, setapiError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(loginschema),
  });

  function submitForm(userData) {
    setisLoading(true);
    setapiError(null);

    // console.log(userData);

    axios
      .post("https://route-posts.routemisr.com/users/signin", userData)
      .then((response) => {
        console.log(response);
        if (response.data.message === "signed in successfully") {
          const token = response.data.data.token;

          localStorage.setItem("token", token);
          setuserToken(token);

          console.log(token);

          // setMessage("Account created successfully!");
          // console.log(message);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);

        setapiError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      })
      .finally(() => {
        setisLoading(false);
      });
  }
  return (
    <div className="bg-gray-200 h-screen flex items-center justify-center p-4 dark:bg-slate-800">
      <div className="bg-white p-6 shadow-lg rounded-xl w-96 dark:bg-slate-100">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="text-2xl text-blue-800 font-bold capitalize text-center mb-4">
            <h3>welcome back!</h3>
          </div>
          <div>
            <div>
              <div className="capitalize text-xl mb-2">
                <label>Email</label>
              </div>
              <div className="border-2 relative">
                <Input
                  {...register("email")}
                  aria-label="Email"
                  className="w-full"
                  placeholder=""
                />
                {formState.errors.email && formState.touchedFields.email && (
                  <p className="text-red-500 bg-gray-200 text-sm py-1  mt-1 pl-10 text-center rounded-2xl">
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="capitalize relative w-full">
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
                className="absolute right-3 top-[45%] -translate-y-1/2 text-gray-500"
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
            {apiError && (
              <div className="bg-red-100 text-red-700 p-2 m-2 rounded text-center font-medium">
                {apiError}
              </div>
            )}
            <div className="sm:flex sm:justify-between inline-block my-4">
              <div className="flex items-center">
                <input className="text-blue-800" type="checkbox" />
                <span className="pl-1">Remember me</span>
              </div>
              <div className="text-blue-800 hover:underline">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                isDisabled={isLoading}
                className="w-full my-5 py-4 text-2xl"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
            <div className="text-[18px] text-center mt-4">
              <p>
                Don't have an account?{" "}
                <Link
                  className="capitalize text-blue-800 hover:underline cursor-pointer"
                  to="/register"
                >
                  register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
