import { FaPhone, FaCommentDots, FaUser } from "react-icons/fa";

const RideRequest = ({ request }) => {
  const { trip_id, start_location, end_location, start_time, end_time, fare } = request;
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col mb-4 md:flex-row">
      <div className="flex-shrink-0">
        <FaUser className="text-4xl" />
      </div>
      <div className="flex-grow md:ml-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Mark Smith</h2>
          <span className="text-gray-500">Cash Payment</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span>34 Km</span>
          <span>1h 30m</span>
          <span>₹{fare.toFixed(2)}</span>
        </div>
        <div className="mb-2">
          <p className="text-gray-700">{start_location}</p>
          <p className="text-gray-700">{end_location}</p>
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-yellow-500 text-white py-2 px-4 rounded">Accept</button>
          <button className="bg-gray-200 text-black py-2 px-4 rounded">Decline</button>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0 md:ml-4">
        <FaPhone className="text-gray-700" />
        <FaCommentDots className="text-gray-700" />
      </div>
    </div>
  );
};

export default RideRequest;
