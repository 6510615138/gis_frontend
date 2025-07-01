import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SearchBox from "./ProvinceSearchbox";
import Link from 'next/link'

const [minWidth, maxWidth, defaultWidth] = [300, 900, 350];

export default function Menu({ children }) {
    const [filters, setFilters] = useState({
        specific: false,
        area: false,
        type: false,
    });
    const setFilter = (name) => {
        setFilters(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const [isMinimized, setMinimized] = useState(false) // this state is for toggle minimized menu 
    const handleMinimized = () => {//state toggle function
        setMinimized(!isMinimized)
    }


    const [width, setWidth] = useState(defaultWidth); //dynamic width alllows resizing. used in line 63 [1]
    const isResizing = useRef(false);

    useEffect(() => {
        window.addEventListener("mousemove", (e) => {
            if (!isResizing.current) {
                return;
            }

            setWidth((previousWidth) => {
                const newWidth = previousWidth + e.movementX;
                const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;
                return isWidthInRange ? newWidth : previousWidth;
            });
        });

        window.addEventListener("mouseup", () => {
            isResizing.current = false;
        });
    }, []);
    if (isMinimized) {
        return (
            <div className="menu-bg
        w-[135px] h-[37px] 
    bg-white
    absolute left-1.5 top-3 z-1800
    rounded-[5px]
    flex flex-row">

                <Image
                    src="/logo.png"
                    width={130}
                    height={70}
                    alt="minimize"
                    className="w-[48px] h-[23px] my-auto mx-5" />

                <div className="flex flex-row justify-end">
                    <p className="text-xs h-fit">ขยาย</p>
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={handleMinimized}
                        className="mr-[5px] my-[5px] mx-[3px]
                    cursor-pointer
                 hover:fill-blue-tcct stroke-black hover:stroke-white">
                        <path d="M10 6.66667V13.3333M6.66667 10H13.3333M4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>

                </div>
            </div>
        )
    }
    // [1]
    return (<div style={{ width: `${width / 16}rem` }} className={`menu-bg 
         h-full 
    min-w-300px
    bg-white/70
    absolute left-0 top-0 z-1800
    flex flex-row
    overflow-x-hidden
     scrollbar-thumb-gray-900 scrollbar-track-gray-100
    `}>
        <div className="visable-menu-warpper
        w-full
        ">
            <div className="useless-redbar 
        bg-red-tcct 
        w-full h-1.5"></div>
            <div className="menu-bar 
        bg-white 
        w-full h-14
        flex flex-row
        justify-between
        border-b-1 border-black/10
        ">
                <Link href="/" className="cursor-pointer w-fit h-fit my-auto mx-5">
                    <Image
                        src="/logo.png"
                        width={130}
                        height={70}
                        alt="minimize"
                        className="w-[68px] h-[32px] " />
                </Link>
                <div className="flex flex-row justify-end">
                    <p className="text-xs h-fit">ย่อขนาด</p>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={handleMinimized}
                        className="mr-[5px] my-[5px] mx-[3px]
                 cursor-pointer
                  hover:fill-blue-tcct hover  stroke-black hover:stroke-white">
                        <path d="M4.66667 8H11.3333M2.16667 0.5H13.8333C14.7538 0.5 15.5 1.24619 15.5 2.16667V13.8333C15.5 14.7538 14.7538 15.5 13.8333 15.5H2.16667C1.24619 15.5 0.5 14.7538 0.5 13.8333V2.16667C0.5 1.24619 1.24619 0.5 2.16667 0.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            <div className="filter category
        bg-white w-full h-fit
        border-b-1 border-black/10
        flex flex-row
        gap-x-4 gap-y-2
        p-1
        text-s
        ">
                <p className="my-auto text-black/80 text-nowrap ml-4">ตัวกรองข้อมูล</p>
                <div className="
        flex flex-row flex-wrap 
        gap-x-4 gap-y-2
        p-1
        text-s">
                <FilterButton text="ข้อมูลเฉพาะ" active={filters.specific} onClick={() => setFilter('specific')} />
                <FilterButton text="พื้นที่" active={filters.area} onClick={() => setFilter('area')} />
                <FilterButton text="ประเภทธุรกิจ" active={filters.type} onClick={() => setFilter('type')} />
                </div>

            </div>
            <div>

            </div>
            <div className="p-5">
                {...children}
            </div>
        </div>
        <div className="resize trigger
         w-2 h-full 
         absolute right-0 z-2000
         cursor-col-resize
         "
            onMouseDown={() => {
                isResizing.current = true;
            }}
        >

        </div>
    </div>)
};




const FilterButton = ({ text, onClick, active }) => {

    return (
        <div
            onClick={onClick}
            className={`button
            w-fit h-fit
            px-3
            border-black/10 border-1
            rounded-[5px]
            ${active ? 'bg-blue-tcct text-white' : 'bg-white text-black border-gray-300'}
            cursor-pointer
            text-nowrap
            `}>
            <p>{text}</p>
        </div>
    )
}