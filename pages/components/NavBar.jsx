import { ImHome } from "react-icons/im";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [routes, setRoutes] = useState([
    {
      name: "Home",
      path: "/house",
    },
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Signup",
      path: "/signup",
    },
  ]);
  useEffect(() => {
    if (user) {
      if (user.isSeller) {
        setRoutes([
          {
            name: "Home",
            path: "/house",
          },
          {
            name: "Upload House",
            path: "/uploadHouse",
          },
          {
            name: "Requests",
            path: "/requests",
          },
        ]);
      } else {
        setRoutes([
          {
            name: "Home",
            path: "/house",
          },
          {
            name: `${user.name}`,
            path: "/profile",
          },
        ]);
      }
    }
  }, [user]);
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <Link href="/">
        <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 hover:cursor-pointer">
          <ImHome size={30} />
          <span className="ml-5 text-2xl font-bold font-mono">Welcome to HousifyMe &nbsp;  </span>

          <h4>   Connect with &nbsp;</h4>
          <h2 style={{ color: 'red' }}>Anurag Roy</h2>
        </div>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {routes.map((e, i) => (
            <Link href={e.path} key={i}>
              <div className={
                router.pathname==e.path
                ?"mr-3 bg-gray-300 px-4 py-2 rounded hover:cursor-pointer text-black"
                :"mr-3 hover:bg-gray-300 px-4 py-2 rounded hover:cursor-pointer text-black"
              }>
                {e.name}
              </div>
            </Link>
          ))}
          {user && (
            <div
              className="mr-3 hover:bg-gray-300 px-4 py-2 rounded hover:cursor-pointer text-black"
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              Logout
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
