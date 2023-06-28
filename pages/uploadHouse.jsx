import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import UploadHouse from "./components/UploadHouse";

const UploadHouses = () => {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        user.isSeller ?(
          <UploadHouse />
        ) : (
          <div className="flex flex-col space-y-2 items-center justify-center mt-10">
            <h1 className="text-2xl font-bold">
              You Do not Have Permission to Upload a House
            </h1>
            <Link href="/house">
              <button className="bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Home
              </button>
            </Link>
          </div>
        )
      ) : (
        <div className="flex flex-col space-y-2 items-center justify-center mt-10">
          <h1 className="text-2xl font-bold">Please LogIn first to post your add</h1>
          <Link href="/login">
            <button className="bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UploadHouses;
