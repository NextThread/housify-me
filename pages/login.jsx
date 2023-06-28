import Link from "next/link";
import { useState } from "react";
import { useAuth } from "./../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {  user,afterLogin, login } = useAuth();
  const router = useRouter();
  
  const handleLogin = async (e) => {
    const toid = toast.loading("Please wait...")
    e.preventDefault();
    try {
      await login(email, password);
      await afterLogin(email);
      toast.update(toid,{ render: "Login Success", type: "success", isLoading: false,autoClose: 2000 })
      if(user && user.isSeller){
        router.push("/uploadHouse")
      }else{
        router.push("/house")
      }
    } catch (err) {
      console.log("Error: ", err);
      toast.update(toid,{ render: "Login Failed", type: "error", isLoading: false,autoClose: 2000 })
    }
  };
  
  return (
    <div className="max-h-[100vh] min-h-[775px] bg-gray-200 flex items-center justify center">
    <div className="w-full max-w-xs m-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleLogin}
      >
        <div className="block text-center text-gray-800 text-2xl font-bold mb-4">
          Login
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
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="*********"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <Link href="/signup">
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Sign Up
            </a>
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
}
