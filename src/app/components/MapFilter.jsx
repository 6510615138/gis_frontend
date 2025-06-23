
import SearchBox from "./Searchbox";
import { useState } from "react";

export default function MapFilter() {
      const [open, setOpen] = useState(true)
  
      function handleClick() {
          setOpen(!open);
  
          console.log(open)
      }
  return (
    <div className={`w-[450px] h-[300px] ${open? 'bottom-0':'bottom-[-290]'} left-25 border-slate-300 border-2 flex absolute  transition-all duration-300 z-5000000 bg-amber-500 rounded-[32px] p-[32px]`}>
            {/* <div className={`absolute  ${open ? 'top-0' : 'top-[-25px]'} 'left-[-32px]' transition-all duration-300 z-1500 bg-blue-tcct text-white p-2.5 rounded-3xl cursor-pointer`} onClick={handleClick}>
                {`${open ? '  \\/  ' : '  /\\  '}`}
            </div> */}
      <div>
          <SearchBox />


      </div>
    </div>
  );
}
