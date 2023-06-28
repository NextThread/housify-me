import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { storage } from "../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { collection, getDocs, addDoc, updateDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { isEqual } from "lodash";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const users = collection(db, "users");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        afterLogin(user.email);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUser = async (data) => {
    setUser({
      email: data.email,
      name: data.name,
      isSeller: data.role == "landloard",
    });
    return await addDoc(users, {
      email: data.email,
      name: data.name,
      friends: [],
      isSeller: data.role == "landloard",
    });
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const afterLogin = async (email) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      if (doc.data().email.toLowerCase() === email.toLowerCase()) {
        return setUser(doc.data());
      }
    });
  };
  const uploadHome = async (data) => {
    if (user && user.isSeller) {
      const toid = toast.loading("Uploading...");
      try {
        const storageRef = ref(
          storage,
          `houses/${data.image.name + "_image_" + user.email}`
        );
        const houses = collection(db, "houses");
        const uploadTask = uploadBytesResumable(storageRef, data.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("changed");
          },
          (error) => {
            toast.update(toid, {
              render: { error },
              type: "error",
              isLoading: false,
              autoClose: 2000,
            });
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await addDoc(houses, {
                  ...data,
                  image: downloadURL,
                  owner: user.email,
                  available:true,
                });
                return toast.update(toid, {
                  render: "Uploaded Successfully",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              }
            );
          }
        );
      } catch (err) {
        toast.update(toid, {
          render: "Uploaded Failed",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  const RequestAccept = async (friend, friends, owner) => {
    const toid = toast.loading("Please Wait...");
    try {
      const userRef = doc(db, "users", owner);
      await updateDoc(userRef, {
        friends: friends.filter((fri) => {
          if (isEqual(fri, friend)) {
            fri.accepted = true;
            return fri;
          }
          return fri;
        }),
      });
      toast.update(toid, {
        render: "Accepted",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch (err) {
      console.log(err)
      toast.update(toid, {
        render: "Accept Failed",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    toast.success("Logged Out Succesfully", { autoClose: 1000 });
  };

  const setAvailable = async (details)=>{
    const toid = toast.loading("Updating...");
    try {
      const houseRef = doc(db, "houses", details.id);
      await updateDoc(houseRef, {
        available: !details.available,
      });
      toast.update(toid, {
        render: "Updated",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch (err) {
      console.log(err);
      toast.update(toid, {
        render: "Update Failed",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        createUser,
        afterLogin,
        uploadHome,
        RequestAccept,
        setAvailable,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
