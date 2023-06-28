import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback,useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Card({ details, isOwner}) {
  const router = useRouter();
  const [fav, setFav] = useState(false);
  const {setAvailable} = useAuth();
  const viewHouse = useCallback(
    (houseId) => {
      if (isOwner) return;
      router.push(`/house/${houseId}`);
    },
    [router]
  );
  const handleAvailable = async () => {
    await setAvailable(details);
    window.location.reload()
  };
  return (
    <div className="flex justify-center hover:shadow-lg group ">
      <div className="rounded-lg shadow-md bg-white max-w-sm">
        <Image
          className="rounded-t-lg group-hover:scale-[102%] hover:cursor-pointer"
          onClick={() => viewHouse(details.id)}
          src={details.image}
          alt=""
          height={250}
          width={390}
        />
        <div className="p-6">
          <div className="flex justify-between">
            <h5 className="text-gray-900 text-xl font-medium mb-2">
              {details.location}
            </h5>
            <div
              onClick={() => {
                setFav(!fav);
              }}
              className="hover:cursor-pointer"
            >
              {fav ? (
                <MdFavorite fill="red" size={30} />
              ) : (
                <MdFavoriteBorder size={30} />
              )}
            </div>
          </div>
          {isOwner ? (
            ""
          ) : (
            <p className="text-gray-700 text-base mb-4">
              {details.description.slice(0, 60) + "..."}
            </p>
          )}
          <div className="flex justify-evenly mb-4">
            <div>{"Buy : " + details.buy + "/-"}</div>
            <div>{"Rent : " + details.rent + "/-"}</div>
          </div>
          {isOwner ? (
            <div className="flex justify-evenly">
              <button
                className={`${details.available?"bg-blue-500 hover:bg-blue-700":"bg-red-500 hover:bg-red-700"} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                type="submit"
                onClick={handleAvailable}
              >
                {details.available ? "Available" : "Sold Out"}
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
