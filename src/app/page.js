import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (<main className="max-w-[1600px] overflow-x-hidden">
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
        <div className="m-auto">
          <Link href="/map">
                  <div className="bg-blue-tcct text-xs size-fit p-2.5 px-3 text-white rounded-lg">
          Explore
        </div>
        </Link>
        </div>
      </nav>
    </header>

    <div className=" h-full min-h-[150px] p-15 m-auto">
      <div className="w-[50%] flex flex-col gap-5">
        <h1 className="text-6xl  font-bold">TCCT GIS</h1>
        <p className="text-xl">Interactive map-based platform designed for organizing and tracking location-based competitions of businesses in Thailand.</p>
                  <Link href="/map">
        <div className="bg-blue-tcct size-fit p-3 px-5 text-white rounded-xl">
          Explore
        </div>
        </Link>
      </div>
    </div>
    <div>
       <Image
          src="/map.png"
          width={800}
          height={450}
          sizes="5%"
          style={{ width: 'auto', height: '100%', padding:"1%"}}
          alt="TCCT"
          className="mx-8 rounded-[50px]"
          />
    </div>
    <div className="border-black/30 border-1 m-15 h-fit rounded-xl p-5">
      <h1 className="text-4xl m-5 font-bold">
        Competitions
      </h1>
      <div className="flex flex-row gap-5 flex-wrap">
    <CompetitionCard 
    image="/map.png"
    title="Title"
    description="This is the long thingy description that no one reads. but if you red that's great!"
    />
        <CompetitionCard 
    image="/map.png"
    title="Title"
    description="This is the long thingy description that no one reads. but if you red that's great!"
    />
        <CompetitionCard 
    image="/map.png"
    title="Title"
    description="This is the long thingy description that no one reads. but if you red that's great!"
    />
            <CompetitionCard 
    image="/map.png"
    title="Title"
    description="This is the long thingy description that no one reads. but if you red that's great!"
    />
            <CompetitionCard 
    image="/map.png"
    title="Title"
    description="This is the long thingy description that no one reads. but if you red that's great!"
    />
            <CompetitionCard 
    image="/map.png"
    title="Title"
    description="This is the long thingy description that no one reads. but if you red that's great!"
    />
      </div>
    </div>
    <div className="m-15 p-5 flex flex-row">
      <div className="w-[600px]">
                <h1 className="text-4xl m-5 font-bold">All factories in thailand</h1>
      </div>
             <Image
          src="/map.png"
          width={800}
          height={450}
          sizes="5%"
          alt="TCCT"
          className=" rounded-[25px] w-[500px] h-[560px] object-cover"
          />
    </div>


    <footer className=" bg-red-tcct  text-center">
      Trade competiton commission of Thailand. All right reserved.
    </footer>
  </main>);
}




const CompetitionCard = ({image,title,description}) => {
    return(  <div className="max-w-[325px] flex flex-col flex-warp hover:bg-blue-tcct p-[10px] cursor-pointer rounded-[10px]">
       <Image
          src={image}
          width={400}
          height={225}
          sizes="5%"
          alt="TCCT"
          className="w-full h-[225px] rounded-[5px]"
          />
        <h2 className="text-xl my-3 mx-1 font-bold">{title}</h2>
        <p className="text">{description}</p>
    </div>)
} 