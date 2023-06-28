import { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "./../../context/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const HouseById = ({ house, houseid }) => {
  const { user } = useAuth();
  const [showEmail, setShowEmail] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [owner, setOwner] = useState(null);
  const [mobile, setMobile] = useState(0);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (user && !user.isSeller) {
        const users = await getDocs(collection(db, "users"));
        users.docs.map(async (d) => {
          if (d.data().email == house.owner) {
            const userRef = doc(db, "users", d.id);
            const userDoc = await getDoc(userRef);
            const found = userDoc
              .data()
              .friends.find(
                (o) => o.user_id == user.email && o.house.id == houseid
              );
            if (found) {
              if (found.accepted && found.house.id == houseid) {
                return setShowEmail(true);
              }
              return setWaiting(true);
            }else{
              setWaiting(false)
            }
            setOwner(d);
          }
        });
      }
    })();
  });
  const Request = async () => {
    if (!user) {
      toast.warning("Please Login First", { autoClose: 1500 });
      return router.push("/login");
    }
    if (user.isSeller) {
      toast.warning("You can't rent a house..", { autoClose: 1500 });
      return router.push("/uploadHouse");
    }
    if (!mobile || mobile.length != 10){
      return toast.error("Invalid Mobile",{ autoClose: 1500 })
    }
    const toid = toast.loading("Sending Request...");
    try {
      const userRef = doc(db, "users", owner.id);
      const userDoc = await getDoc(userRef);
      await updateDoc(userRef, {
        friends: userDoc
          .data()
          .friends.concat([
            { user_id: user.email, house: house, accepted: false,mobile:mobile },
          ]),
      });
      toast.update(toid, {
        render: "Request Sent",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err) {
      toast.update(toid, {
        render: "Request Failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={house.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {"House  in " + house.location}
              </h1>
              <div className="flex mb-4"></div>
              <div className="leading-relaxed">
                {house.description}
              </div>
              <div className="flex justify-around mt-5">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Buy - &#x20b9; {house.buy}
                </span>
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rent - &#x20b9; {house.rent}
                </span>
              </div>
              {waiting ? (
                <div className="flex justify-center mt-10 font-semibold text-xl">
                   Waiting For Approval
                </div>
              ) : showEmail ? (
                <div className="flex justify-center mt-10 font-semibold text-xl">
                  Contact Mail : {house.owner}
                </div>
              ) : (
                <div className="flex mt-8 ">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="border-0 border-b-2 focus:outline-none border-blue-300 rounded-md bg-gray-200 p-2"
                    required
                    onChange={(e)=>{
                      setMobile(e.target.value)
                    }}
                  />
                  <button
                    className="flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    onClick={Request}
                  >
                    Send Request to Owner
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HouseById;
