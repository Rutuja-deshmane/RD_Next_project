"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registerform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [terms, setTerms] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !gender || !dob || !password || !terms) {
      setError("All fields are necessary.");
      return;
    }
    try {
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          gender,
          dob,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold pb-5 mt-0">Sign UP</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fname"
                placeholder="Full Name"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />
              <select
                onChange={(e) => setGender(e.target.value)}
                id="gender"
                name="gender"
                className="block border border-grey-light w-full p-3 rounded mb-4 text-gray-500"
              >
                <option value="" disabled selected className="text-gray-500">
                  Select Gender
                </option>
                <option value="male" className="text-gray-500">
                  Male
                </option>
                <option value="female" className="text-gray-500">
                  Female
                </option>
                <option value="other" className="text-gray-500">
                  Other
                </option>
              </select>
              <input
                onChange={(e) => setDob(e.target.value)}
                type="date"
                id="dob"
                name="dob"
                className="border block border border-grey-light w-full p-3 rounded mb-4 text-gray-500"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onChange={(e) => setTerms(e.target.value)}
                    name="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm w-full p-3 rounded mb-4 mt-3"
              >
                Create Account
              </button>
            </div>
          </form>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mb-2">
              {error}
            </div>
          )}
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              href="/"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
