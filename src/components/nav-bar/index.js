import { FaTaxi } from "react-icons/fa";
function Navbar() {
  return (
    <div className="flex items-center p-4 bg-blue-500  text-white justify-between">
    <div className="flex items-center gap-3">
      <FaTaxi className="w-8 h-8" />
      <h1 className="text-2xl font-semibold">QuickTaxi</h1>
    </div>
    <button className="px-3 py-2 rounded-md border font-medium text-xl hover:bg-white hover:text-black">
      Login
    </button>
  </div>
  )
}

export default Navbar;