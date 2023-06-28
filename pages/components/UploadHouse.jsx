import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UploadHouse = () => {
  const [data, setData] = useState({
    location: "",
    // buy: "",
    rent: "",
    description: "",
    image: "",
  });
  const { uploadHome } = useAuth();
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await uploadHome(data);
      setData({
        location: "",
        // buy: "",
        rent: "",
        description: "",
        image: "",
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="max-h-[100vh] min-h-[720px] bg-gray-200 flex items-center justify center">
      <div className="w-full max-w-md m-auto">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleUpload}
        >
          <div className="block text-center text-gray-800 text-2xl font-bold mb-4">
            Upload House
            {/* <br>
            <h3> </h3>
            </br> */}
          </div>
          <div className="block text-center text-red-500 text-1xl font-bold mb-4">
            User's if found posting fake Rentals Post, will be banned and will not be allowed to use HousifyMe anymore
            {/* <br>
            <h3> </h3>
            </br> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Location"
              required
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Buy
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="price for buy"
              required
              onChange={(e) => setData({ ...data, buy: e.target.value })}
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Rent
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="price for rent"
              required
              onChange={(e) => setData({ ...data, rent: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-3">
              Description 
            </label>
            <label className="block text-green-700 text-sm mb-1">
              Kindly add contact number in description 
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
              required
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              placeholder="Image"
              required
              accept="image/*"
              onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UploadHouse;
