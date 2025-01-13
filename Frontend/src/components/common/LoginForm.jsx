import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../../context/UserContext";

function LoginForm() {
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the path from the location state, if available
  const from = location.state?.from?.pathname || "/"; // Default to home if no state is found

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(data) {
    try {
      await login(data); // Log in the user
      navigate(from, { replace: true }); // Redirect to the previous page
    } catch (err) {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Email is required." },
              })}
              className="input input-bordered w-full input-primary"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
              className="input input-bordered w-full input-primary"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
