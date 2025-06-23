import Image from "next/image";
import React from "react";

export default function Home() {
  return (<main>
    <header>
      <div className="bg-red-tcct w-full h-[12px]"></div>
      <nav className="bg-white w-full h-[64px] flex flex-row border-b-1 border-gray-300">
        <div className="w-[1320px] h-full flex flex-row m-auto">
        <Image
          src="/logo.png"
          width={130}
          height={70}
          sizes="5%"
          style={{ width: 'auto', height: '100%', padding:"1%"}}
          alt="TCCT"/>

        <a className="flex flex-col my-auto font-semibold">
          <h2>สำนักงานคณะกรรมการการแข่งขันทางการค้า</h2>
          <h2>TRADE COMPETITION COMMISSION OF THAILAND</h2>
        </a>
        </div>
      </nav>
    </header>

    <div className=" h-full min-h-[150px] p-15 m-auto">
      <div className="w-[500px] flex flex-col gap-5">
        <h1 className="text-4xl">TCCT GIS</h1>
        <p>Interactive map-based platform designed for organizing and tracking location-based competitions of businesses in Thailand.</p>
        <div className="bg-blue-tcct size-fit p-3 text-white rounded-md">
          Explore
        </div>
      </div>
    </div>


    <footer className=" bg-red-tcct  text-center">
      Trade competiton commission of Thailand. All right reserved.
    </footer>
  </main>);
}

