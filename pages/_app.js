import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/NavBar";
import { AuthContextProvider } from "../context/AuthContext";
import "../config/firebase";
import { useRouter } from "next/router";
import ProtectedRoute, { SignedIn } from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const signNotRequired = ["/login", "/signup"];
  const router = useRouter();
  if (router.pathname == "/") {
    return (
      <AuthContextProvider>
        <Head>
          <title>HousifyMe</title>
          <link
            rel="shortcut icon"
            href="https://firebasestorage.googleapis.com/v0/b/rentalweb-ed0e7.appspot.com/o/Graphicloads-100-Flat-Home.ico?alt=media&token=68af2acb-c887-4b10-b51a-3a4fcd8f1fa3"
          />
        </Head>
        <ToastContainer />
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
      </AuthContextProvider>
    );
  }
  return (
    <AuthContextProvider>
      <Head>
        <title>HousifyMe</title>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/rentalweb-ed0e7.appspot.com/o/Graphicloads-100-Flat-Home.ico?alt=media&token=68af2acb-c887-4b10-b51a-3a4fcd8f1fa3"
        />
      </Head>
      <ToastContainer />
      <NextNProgress />
      <Navbar />
      {router.pathname.includes("/components") ? (
        <div className="flex items-center justify-center mt-10 text-2xl font-bold">
          You Do not Have Permission To Be Here
        </div>
      ) : signNotRequired.includes(router.pathname) ? (
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
      ) : router.pathname.includes("/profile") ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
