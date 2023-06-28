import Card from "../components/Card";
import { useState,useEffect } from "react";
import { getAllHouses } from './../../lib/allHouses';
import { useAuth } from './../../context/AuthContext';

export const getServerSideProps = async() =>{
  
  const houses = await getAllHouses();
  return {
    props:{
      houses,
    }
  }
}

const House = ({houses}) => {
  const {user} = useAuth();
  const [search, setSearch] = useState("");
  const [Houses,setHouses] = useState([]);
  
  useEffect(()=>{
    if(user && user.isSeller){
      setHouses(houses.filter((house)=>{
        if (house.owner === user.email) return house;
      }))
    }else{
      setHouses(houses.filter((house)=>{
        if (house.available) return house;
      }));
    }
  },[user])
  return (
    <div className="h-full bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center justify-center">
        <input
          className=" p-3 border-2 border-gray-200 rounded-lg w-96 m-2"
          type="search"
          placeholder="Search Location"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mt-10 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-y-10">
        {[
          Houses
            .filter((house) => {
              if (search == "") return house;
              if (
                house.location
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase())
              )
                return house;
            })
            .map((house) => <Card details={house} key={house.id} isOwner={user && user.isSeller}/>),
        ]}
      </div>
    </div>
  );
};
export default House;

