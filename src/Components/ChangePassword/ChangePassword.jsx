import { useContext, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../schema/changePasswordSchema";

export default function ChangePassword() {
  const navigate = useNavigate();
  const { userToken, setuserToken } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    mode: "onBlur",
    resolver: zodResolver(changePasswordSchema),
  });

  async function submitForm(formData) {
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      await axios.patch(
        "https://route-posts.routemisr.com/users/change-password",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      setSuccessMsg("Password changed successfully. Redirecting to login...");

      reset();

      setTimeout(() => {
        localStorage.removeItem("token");
        setuserToken(null);
        navigate("/");
      }, 3000);
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message ||
          "Failed to change password. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
        {/* Current Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Current Password
          </label>

          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium mb-1"
          >
            New Password
          </label>

          <input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.newPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* API Error */}
        {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

        {/* Success */}
        {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
