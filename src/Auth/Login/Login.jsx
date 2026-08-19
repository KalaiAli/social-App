import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";

import { loginschema } from "../../schema/loginShema";
import { AuthContext } from "../../Context/AuthContext";

export default function Login() {
  const { setuserToken, getUserData } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [apiError, setapiError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(loginschema),
  });

  async function submitForm(userData) {
    setisLoading(true);
    setapiError(null);

    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        userData,
      );

      const token = response.data.data.token;

      localStorage.setItem("token", token);
      setuserToken(token);

      await getUserData(token);

      toast.success("Login successful");

      navigate("/home");
    } catch (error) {
      console.error(error);

      setapiError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200 p-4 dark:bg-slate-800">
      <div className="w-96 rounded-xl bg-white p-6 shadow-lg dark:bg-slate-100">
        <form onSubmit={handleSubmit(submitForm)}>
          <h3 className="mb-6 text-center text-2xl font-bold capitalize text-blue-800">
            Welcome Back!
          </h3>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-2 block text-xl capitalize">Email</label>

            <Input
              {...register("email")}
              aria-label="Email"
              className="w-full"
              placeholder="Enter your email"
            />

            {errors.email && touchedFields.email && (
              <p className="mt-1 rounded-2xl bg-gray-200 py-1 text-center text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <label className="mb-2 block text-xl capitalize">Password</label>

            <Input
              {...register("password")}
              aria-label="Password"
              type={showPassword ? "text" : "password"}
              className="w-full"
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[58px] -translate-y-1/2 text-gray-500"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>

            {errors.password && touchedFields.password && (
              <p className="mt-1 rounded-2xl bg-gray-200 py-1 text-center text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* API Error */}
          {apiError && (
            <div className="m-2 rounded bg-red-100 p-2 text-center font-medium text-red-700">
              {apiError}
            </div>
          )}

          {/* Remember / Forgot */}
          <div className="my-4 flex justify-between">
            <label className="flex items-center gap-1">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <a href="#" className="text-blue-800 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login */}
          <Button
            type="submit"
            isDisabled={isLoading}
            className="my-5 w-full py-4 text-2xl"
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          {/* Register */}
          <p className="mt-4 text-center text-[18px]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="cursor-pointer capitalize text-blue-800 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
