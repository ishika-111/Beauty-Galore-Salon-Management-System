import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CustomerRegisterForm() {
  const [userInput, setUserInput] = useState({
    email: "",
    name: "",
    password: "",
  });
  const Validation = (userInput) => {
    let errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!userInput.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(userInput.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!userInput.password) {
      errors.password = "Password is required";
    } else if (userInput.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    }

    if (!userInput.name) {
      errors.name = "First Name is required";
    } else if (userInput.name.length < 3) {
      errors.tName = " Name must be more than 3 characters";
    }

    return errors;
  };
  const handleBlur = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const [errors, setErrors] = useState({});
  const handleSignup = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(userInput);
    setErrors(validationErrors);

    // If there are validation errors, do not proceed
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/customer/register",
        userInput
      );
      console.log("Response:", response);
      toast.success("Registration successful");
    } catch (error) {
      console.error("Error response:", error.response); // Log error response

      if (
        error.response &&
        error.response.data.message === "Email is already in use."
      ) {
        setErrors({ email: "Email is already in use." });
        toast.error("Email is already in use.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="text-3xl font-semibold mb-4 hover:text-lime-700">
        Customer Register
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <div>What's your Email?</div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Email"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, email: e.target.value })
            }
            onBlur={handleBlur}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </label>
        <div>What's your Username?</div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Username"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, name: e.target.value })
            }
            onBlur={handleBlur}
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </label>
        <div>What's your Password?</div>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            required
            onChange={(e) =>
              setUserInput({ ...userInput, password: e.target.value })
            }
            onBlur={handleBlur}
          />
          {errors.password && (
            <span className="text-danger">{errors.password}</span>
          )}
        </label>

        <button className="btn btn-primary text-white" type="submit">
          Register
        </button>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-lime-700 hover:text-lime-600 font-medium"
            >
              Login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
