import { useAuth } from "./../context/AuthContext";
import { useEffect, useState } from "react";
import { allUsers } from "../lib/allHouses";

export const getServerSideProps = async()=>{
  const users = await allUsers();
  return{
    props:{
      users,
    }
  }
}

const Requests = ({users}) => {
  const { user,RequestAccept } = useAuth();
  const [owner, setOwner] = useState(null);
  const [click,setClick] = useState(true);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    if (!user) {
      return;
    }
    if (!user.isSeller) {
      return;
    }
    (async () => {
      users.map((doc) => {
        if (doc.email == user.email) {
          setOwner(doc);
          setFriends(doc.friends);
        }
      });
    })();
  }, [user,click]);

  const AcceptRequest = async (friend) => {
    try {
      await RequestAccept(friend,friends,owner.id);
      setClick(!click);
      return;
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center bg-gray-100">
      {friends && (
        <div className="flex justify-center flex-col items-center min-h-[720px]">
          {friends.map((friend, i) => (
            <div key={i} className="flex m-4 justify-center bg-white rounded-xl hover:shadow-lg shadow-md md:min-w-[640px] p-4 items-start">
              <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-full w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                  src={friend.house.image}
                />
                <div className="flex-grow sm:pl-8 space-y-2">
                  <h2 className="title-font font-medium text-xl text-gray-900">
                    House in {friend.house.location}
                  </h2>
                  <h3 className="text-gray-500 mb-3">
                    Rent Price : &#x20b9; {friend.house.rent}
                  </h3>
                  <p className="mb-4 text-lg">Request By : {friend.user_id}</p>
                  {friend.accepted ? (
                    <div className="text-xl font-bold">
                      Contact Number : {friend.mobile}
                    </div>
                  ) : (
                    <button
                      className="flex text-white justify-center bg-indigo-400 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
                      onClick={() => AcceptRequest(friend)}
                    >
                      Accept Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
