import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[1600px] mx-auto overflow-x-hidden">
      <header>
        <div className="bg-red-tcct w-full h-[12px]" />
        <nav className="bg-white w-full h-auto border-b border-gray-300">
          <div className="max-w-[1320px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between p-4 gap-4">
            <div className="flex flex-row items-center gap-4">
              <Image
                src="/logo.png"
                width={130}
                height={70}
                alt="TCCT"
                className="h-[70px] w-auto"
              />
              <div className="flex flex-col text-center lg:text-left">
                <h2 className="text-sm font-semibold">สำนักงานคณะกรรมการการแข่งขันทางการค้า</h2>
                <h2 className="text-sm font-semibold">TRADE COMPETITION COMMISSION OF THAILAND</h2>
              </div>
            </div>
            <Link href="/map">
              <div className="bg-blue-tcct text-xs px-4 py-2 text-white rounded-lg">
                Explore
              </div>
            </Link>
          </div>
        </nav>
      </header>

      <section className="w-full px-6 py-10 flex flex-col md:flex-row gap-8 items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col gap-5">
          <h1 className="text-4xl md:text-6xl font-bold">TCCT GIS</h1>
          <p className="text-lg md:text-xl">
            Interactive map-based platform designed for organizing and tracking location-based competitions of businesses in Thailand.
          </p>
          <Link href="/map">
            <div className="bg-blue-tcct w-fit px-5 py-3 text-white rounded-xl">
              Explore
            </div>
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            src="/map.png"
            width={800}
            height={450}
            alt="TCCT Map"
            className="w-full h-auto rounded-[30px]"
          />
        </div>
      </section>

      <section className="px-6 py-10">
        <h1 className="text-4xl font-bold mb-5">Competitions</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {[...Array(6)].map((_, i) => (
            <CompetitionCard
              key={i}
              image="/map.png"
              title="Title"
              description="This is the long thingy description that no one reads. But if you read this, that's great!"
            />
          ))}
        </div>
      </section>

      <section className="px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">All factories in Thailand</h1>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            src="/map.png"
            width={800}
            height={450}
            alt="TCCT"
            className="rounded-[25px] w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
          />
        </div>
      </section>

      <footer className="bg-red-tcct text-center text-white py-4">
        Trade Competition Commission of Thailand. All rights reserved.
      </footer>
    </main>
  );
}

const CompetitionCard = ({ image, title, description }) => {
  return (
    <div className="w-full sm:w-[280px] max-w-[325px] flex flex-col hover:bg-blue-tcct p-4 cursor-pointer rounded-lg bg-white shadow-md">
      <Image
        src={image}
        width={400}
        height={225}
        alt="Competition"
        className="w-full h-[200px] object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-3">{title}</h2>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};
