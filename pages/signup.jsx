import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Signup() {
  const { user, createUser, signup } = useAuth();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "landloard",
  });
  const Register = async (e) => {
    e.preventDefault();
    const toid = toast.loading("Please wait...");
    try {
      await signup(data.email, data.password);
      await createUser(data);
      toast.update(toid, {
        render: "Register Success",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
      if (user) {
        router.push("/house");
      }
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.update(toid, {
        render: "Register Failed",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };
  return (
    <div className="max-h-[100vh] min-h-[775px] bg-gray-200 flex items-center justify center">
      <div className="w-full max-w-sm m-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={Register}
        >
          <div className="block text-center text-gray-800 text-2xl font-bold mb-4">
            Register
          </div>
          <div className="block text-center text-green-800 text-1xl font-bold mb-4">
            Please choose the correct option below
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Full Name"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="*********"
              required
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center justify-around mb-4 py-2 px-3">
            <div className="mb-4 flex space-x-2">
              <input
                className=""
                type="radio"
                value="landloard"
                checked={data.role == "landloard"}
                onChange={(e) => {
                  setData({ ...data, role: e.target.value });
                }}
              />
              <label className="ml-2">Owner</label>
            </div>
            <div className="mb-4 flex">
              <input
                className=""
                type="radio"
                value="tenant"
                checked={data.role == "tenant"}
                onChange={(e) => {
                  setData({ ...data, role: e.target.value });
                }}
              />
              <label className="ml-2">Customer</label>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
              <Link href="/login">
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Sign In
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
