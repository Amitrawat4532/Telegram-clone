import Chatarea from "./Components/Chatarea";
import Sidebar from "./Components/Sidebar";
import Mobile from "./Components/Mobile";


export default function Home() {
  return (
    <>
      <div className="flex h-screen w-full" >
         {/* Desktop view  */}
        <div className="hidden sm:flex w-full gap-[2px]">
          <Sidebar />
          <Chatarea />
        </div>
        {/* Mobile View  */}
         <div className="flex sm:hidden w-full ">
        
         <Mobile />
         </div>

      </div>
    </>
  );
}
