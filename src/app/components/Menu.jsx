import Image from "next/image";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import SearchBox from "./ProvinceSearchbox";
import Link from 'next/link'

const [minWidth, maxWidth, defaultWidth] = [400, 900, 350];

export default function Menu({ children, buttonSetAbove, dataSelectFunc }) {

    const [menu_button, setMenuButton] = useState({
        ev: false,
        store: false,
        factory: false,
        sugar: false,
        ice: false,
    });
    const setMenu = (name) => {
        let buttons = {
            ev: false,
            store: false,
            factory: false,
            sugar: false,
            ice: false,
        }
        buttons[name] = true;
        setMenuButton(buttons);
    };
    useEffect(() => {
        if (dataSelectFunc) {
            var keys = Object.keys(menu_button);
            var filtered = keys.filter(function (key) {
                return menu_button[key]
            });
            dataSelectFunc(filtered[0]);
        }
    }, [menu_button]);

    const handleClick = (toggle) => {
        setButton(prev => ({
            ...prev,
            [toggle]: prev[toggle] === 1 ? 0 : 1
        }));
        if (buttonSetAbove) {
            buttonHole(button);
        }

    };

    const [filters, setFilters] = useState({
        data: false,
        area: true,
        type: true,
    });
    const setFilter = (name) => {
        setFilters(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };
    useEffect(() => {
        if (buttonSetAbove) {
            buttonSetAbove(filters);
        }
    }, [filters]);


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
        flex flex-col
        gap-x-4 gap-y-2
        p-1
        text-s
        ">
                <h1 className="my-auto text2xl text-black text-nowrap ml-4">เมนู</h1>
                <div className="
        grid grid-cols-3  gap-2
        p-1 
        text-s">
                    <MenuCard text="สถานีชาร์จ" active={menu_button.ev} onClick={() => setMenu("ev")} type="ev" />
                    <MenuCard text="ร้านสะดวกซื้อ" active={menu_button.store} onClick={() => setMenu("store")} type="store" />
                    <MenuCard text="โรงงาน" active={menu_button.factory} onClick={() => setMenu("factory")} type="factory" />
                    <MenuCard text="โรงงานน้ำตาล" active={menu_button.sugar} onClick={() => setMenu("sugar")} type="sugar" />
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

const MenuCard = ({ text, img, onClick, active, type }) => {

    return (
        <div
            onClick={onClick}
            className={`button
            w-full h-fit
            max-w-[120px]
            border-black/10 border-1
            rounded-[5px]
            ${active ? 'bg-blue-tcct text-white stroke-white' : 'bg-white text-black border-gray-300'}
            cursor-pointer
            text-nowrap
            `}>

            {type === "ice" ? (
                // SVG1
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`mx-auto my-2 ${active ? "stroke-white" : "stroke-black"} max-w-[45px]`}>
                    <path d="M12 2V18M12 22V18M12 18L15 21M12 18L9 21M15 3L12 6L9 3"  strokeLinecap="round" />
                    <path d="M3.33978 7.00042L6.80389 9.00042M6.80389 9.00042L17.1962 15.0004M6.80389 9.00042L5.70581 4.90234M6.80389 9.00042L2.70581 10.0985M17.1962 15.0004L20.6603 17.0004M17.1962 15.0004L21.2943 13.9023M17.1962 15.0004L18.2943 19.0985"  strokeLinecap="round" />
                    <path d="M20.66 7.00042L17.1959 9.00042M17.1959 9.00042L6.80364 15.0004M17.1959 9.00042L18.294 4.90234M17.1959 9.00042L21.294 10.0985M6.80364 15.0004L3.33954 17.0004M6.80364 15.0004L2.70557 13.9023M6.80364 15.0004L5.70557 19.0985"  strokeLinecap="round" />
                </svg>
            )
                : type === "store" ? (
                    // SVG2
                    <svg className={`mx-auto my-2 ${active ? "stroke-white" : "stroke-black"} max-w-[45px]`} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3"  fill="none"><path d="M52,27.18V52.76a2.92,2.92,0,0,1-3,2.84H15a2.92,2.92,0,0,1-3-2.84V27.17" /><polyline points="26.26 55.52 26.26 38.45 37.84 38.45 37.84 55.52" /><path d="M8.44,19.18s-1.1,7.76,6.45,8.94a7.17,7.17,0,0,0,6.1-2A7.43,7.43,0,0,0,32,26a7.4,7.4,0,0,0,5,2.49,11.82,11.82,0,0,0,5.9-2.15,6.66,6.66,0,0,0,4.67,2.15,8,8,0,0,0,7.93-9.3L50.78,9.05a1,1,0,0,0-.94-.65H14a1,1,0,0,0-.94.66Z" /><line x1="8.44" y1="19.18" x2="55.54" y2="19.18" /><line x1="21.04" y1="19.18" x2="21.04" y2="8.4" /><line x1="32.05" y1="19.18" x2="32.05" y2="8.4" /><line x1="43.01" y1="19.18" x2="43.01" y2="8.4" /></svg>
                )
                    : type === "factory" ? (
                        // SVG2
                        <svg className={`mx-auto my-2 ${active ? "stroke-white" : "stroke-black"} max-w-[45px]`} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512" stroke="#ffffff">
                            <g>
                                <g>
                                    <g>
                                        <path d="M495.832,199.411h-55.809L429.794,10.197C429.485,4.479,424.758,0,419.032,0h-53.895
				c-5.727,0-10.453,4.479-10.763,10.197l-10.228,189.214h-22.692L311.226,10.197C310.917,4.479,306.19,0,300.463,0h-53.895
				c-5.727,0-10.455,4.479-10.763,10.197l-10.228,189.214H16.168c-5.953,0-10.779,4.827-10.779,10.779v291.032
				c0,5.952,4.826,10.779,10.779,10.779h479.663c5.952,0,10.779-4.827,10.779-10.779V210.189
				C506.611,204.237,501.784,199.411,495.832,199.411z M375.349,21.558h33.472l9.614,177.853h-52.699L375.349,21.558z
				 M256.78,21.558h33.472l9.614,177.853h-52.698L256.78,21.558z M218.274,490.442H70.063V394.92h148.211V490.442z M218.274,373.362
				H70.063v-23.046h148.211V373.362z M485.053,490.442H239.832V339.537c0-5.952-4.826-10.779-10.779-10.779H59.284
				c-5.953,0-10.779,4.827-10.779,10.779v150.905H26.947V220.968h458.105V490.442z"/>
                                        <path d="M275.402,426.718h77.608c5.952,0,10.779-4.827,10.779-10.779s-4.827-10.779-10.779-10.779h-66.829v-54.844h155.756
				v65.623c0,5.952,4.827,10.779,10.779,10.779c5.952,0,10.779-4.827,10.779-10.779v-76.402c0-5.952-4.827-10.779-10.779-10.779
				H275.402c-5.952,0-10.779,4.827-10.779,10.779v76.402C264.623,421.891,269.45,426.718,275.402,426.718z"/>
                                        <path d="M404.749,405.16h-1.078c-5.952,0-10.779,4.827-10.779,10.779c0,5.952,4.827,10.779,10.779,10.779h1.078
				c5.952,0,10.779-4.827,10.779-10.779C415.528,409.987,410.702,405.16,404.749,405.16z"/>
                                        <path d="M59.284,307.2h66.021c5.953,0,10.779-4.827,10.779-10.779v-43.116c0-5.952-4.826-10.779-10.779-10.779H59.284
				c-5.953,0-10.779,4.827-10.779,10.779v43.116C48.505,302.373,53.331,307.2,59.284,307.2z M70.063,264.084h44.463v21.558H70.063
				V264.084z"/>
                                        <path d="M168.421,307.2h66.021c5.953,0,10.779-4.827,10.779-10.779v-43.116c0-5.952-4.826-10.779-10.779-10.779h-66.021
				c-5.953,0-10.779,4.827-10.779,10.779v43.116C157.642,302.373,162.468,307.2,168.421,307.2z M179.2,264.084h44.463v21.558H179.2
				V264.084z"/>
                                    </g>
                                </g>
                            </g>
                        </svg>

                    )
                        : type === "sugar" ? (

                            <svg className={`mx-auto my-2 ${active ? "stroke-white" : "stroke-black"} max-w-[45px]`} version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"  >

                                <g>
                                    <path className="st0" d="M474.01,89.302L273.876,3.673C268.215,1.235,262.201,0,256,0c-6.191,0-12.195,1.235-17.876,3.673
		L37.991,89.302c-16.74,7.161-27.564,23.558-27.564,41.777v249.853c0,18.21,10.824,34.606,27.564,41.777l200.143,85.628
		C243.815,510.766,249.819,512,256,512c6.18,0,12.186-1.234,17.876-3.663l200.134-85.628c16.739-7.171,27.563-23.567,27.563-41.777
		V131.078C501.573,112.86,490.749,96.462,474.01,89.302z M41.027,380.932V131.078c0-1.313,0.176-2.616,0.539-3.899l205.785,88.048
		V479.01L50.038,394.587C44.563,392.246,41.027,386.878,41.027,380.932z M461.962,394.587L264.659,479.01V215.228l205.776-88.048
		c0.363,1.283,0.538,2.586,0.538,3.899v249.853C470.973,386.878,467.437,392.246,461.962,394.587z M256,30.6
		c2.018,0,3.987,0.401,5.828,1.195l193.776,82.906L256,200.104L56.395,114.701l193.767-82.906C252.014,31.001,253.982,30.6,256,30.6
		z"/>
                                </g>
                            </svg>
                        )
                            : type === "ev" ? (
                                <svg className={`mx-auto my-2 ${active ? "stroke-white" : "stroke-black"} max-w-[45px]`} viewBox="0 0 80 80" enableBackground="new 0 0 80 80" id="Layer_1" version="1.1" xmlns="http://www.w3.org/2000/svg">

                                    <g>

                                        <path d="   M42,73h5c2.209,0,4-1.791,4-4c0-2.209-1.791-4-4-4H13c-2.209,0-4,1.791-4,4c0,2.209,1.791,4,4,4h23" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" />

                                        <path d="   M14,65V13c0-2.209,1.791-4,4-4h24c2.209,0,4,1.791,4,4v52" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" />

                                        <path d="   M36,33H24c-2.209,0-4-1.791-4-4V19c0-2.209,1.791-4,4-4h12c2.209,0,4,1.791,4,4v10C40,31.209,38.209,33,36,33z" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" />

                                        <g>

                                            <path d="    M46,40h9c2.209,0,4,1.791,4,4v8.5c0,1.933,1.567,3.5,3.5,3.5h0c1.933,0,3.5-1.567,3.5-3.5V34" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" />

                                            <g>

                                                <path d="     M61,31v-1c0-1.657,1.343-3,3-3h4c1.657,0,3,1.343,3,3v1c0,1.657-1.343,3-3,3h-4C62.343,34,61,32.657,61,31z" fill="none"  strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" />

                                                <line strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" x1="63" x2="63" y1="24" y2="27.171" />

                                                <line   strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" x1="69" x2="69" y1="24" y2="27.171" />

                                            </g>

                                        </g>

                                    </g>

                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                            )
            }
            <p className="text-center">{text}</p>
        </div>
    )
}


