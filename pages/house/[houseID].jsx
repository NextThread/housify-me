import HouseById from "./../components/HouseById";
import Card from "../components/Card";
import { houseById, housesNearBy } from "../../lib/allHouses";

export const getServerSideProps = async (context) => {
  const houseid = context.params.houseID;
  const house = await houseById(houseid);
  let notFound = false;
  let houses = [];
  if (!house) {
    notFound = true;
    houses = [];
  } else {
    houses = await housesNearBy(house);
  }
  return {
    notFound,
    props: {
      house,
      houses,
    },
  };
};

const houseid = ({ house, houses }) => {
  return (
    <div className="min-h-[775px] bg-gray-200 flex flex-col items-center justify center">
      <div className="bg-gray-200 flex items-center justify center">
        {house && <HouseById houseid={house.id} house={house} />}
      </div>
      {houses.length ? (
        <div>
          <div className="text-2xl font-bold">
            People also watch these Houses in {house.location}
          </div>
          <div className="mb-10 mt-10 grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-10">
            {houses.map((house, i) => (
              <Card details={house} isOwner={false} key={i} />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default houseid;
