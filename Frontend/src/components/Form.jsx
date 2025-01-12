import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Form() {
  const { createUser } = useContext(UserContext);

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const route = useNavigate();

  async function onSubmit(data) {
    
    await createUser(data);
    route('/');
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-5 space-y-4">
      {/* Back Button */}
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="btn btn-primary btn-outline w-full text-center py-2 rounded-md shadow-md"
        >
          Back
        </Link>
      </div>

      {/* Form Container */}
      <div className="w-full border-2 border-indigo-600 max-w-md rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create User</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              {...register("username", {
                required: { value: true, message: "Name cannot be empty!" },
                minLength: { value: 2, message: "Minimum length has to be 2" },
                pattern: {
                  value: /^(?!\s*$)[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/,
                  message: "Please enter a valid name.",
                },
              })}
              placeholder="Enter name"
              className={`input input-bordered mt-2 px-4 py-2 rounded-md border ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:input-primary"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              {...register("email", {
                required: { value: true, message: "Email cannot be empty!" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email.",
                },
              })}
              placeholder="Enter email"
              className={`input input-bordered mt-2 px-4 py-2 rounded-md border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:input-primary"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Age Field */}
          <div className="flex flex-col">
            <label htmlFor="age" className="text-sm font-medium">
              Age
            </label>
            <input
              id="age"
              type="number"
              {...register("age", {
                required: { value: true, message: "Age cannot be empty!" },
                min: { value: 18, message: "Minimum age has to be 18!" },
              })}
              placeholder="Enter age"
              className={`input input-bordered mt-2 px-4 py-2 rounded-md border ${
                errors.age
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:input-primary"
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn submit-btn btn-primary w-full"
          >
            {isSubmitting ? (
              <span>
                Submitting{" "}
                <span className="loading loading-dots loading-xs"></span>
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
