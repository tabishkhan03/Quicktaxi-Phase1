import Link from "next/link";
import { FaCarAlt } from "react-icons/fa";


export default function Home() {
  return (
    <div className='flex flex-col  gap-52 md:gap-52 items-center mt-20'>
     <div>
        <h1 className="text-center text-3xl font-semibold">BookRide</h1>
        <p className=" font-medium mt-1">Find And book taxis quickly</p>
     </div>
     <div>
        <img width={250} src='https://tse3.mm.bing.net/th?id=OIP.vLBaxHwZJytcpH3Pj_SRfAAAAA&pid=Api&P=0&h=180' />

     </div>
     <div className=" border-2 border-black p-4">
      <Link href='/Sign' ><FaCarAlt className="text-2xl cursor-pointer"/></Link>
        
     </div>
    </div>
  );
}


