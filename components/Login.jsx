"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("Dashborad");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-[-7rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold pb-5">Sign In</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="abc@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Your password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="******"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm  w-full p-3 rounded mb-4 mt-3 "
              >
                Submit
              </button>
            </div>
          </form>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2 mb-2">
              {error}
            </div>
          )}
          <div className="flex items-center text-sm mt-5">
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              New here?
              <Link
                href="/Register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                SignUp here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
