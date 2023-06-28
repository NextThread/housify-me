import { useAuth } from "./../../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;

export const SignedIn = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push("/house");
  } else {
    return children;
  }
};
