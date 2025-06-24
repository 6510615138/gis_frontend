
import { useState } from "react";


export default function NavigationBar() {
    const [open, setOpen] = useState(false)

    function handleClick() {
        setOpen(!open);

        console.log(open)
    }
    return (
        <div className={`${open ? 'left-0': 'left-[-60px]'} w-[75px] h-full transition-all duration-300  border-x-slate-300 border-x-2 rounded-2xl absolute z-1000 bg-white p-2`}>
            <div>Menu</div>
            <div className={`absolute top-[45%] ${open ? 'left-[64px]' : 'left-[60px]'}  transition-all duration-300 z-1500 bg-blue-tcct text-white p-2.5 rounded-3xl cursor-pointer`} onClick={handleClick}>
                {`${open ? '<' : '>'}`}
            </div>
        </div>
    );
}
