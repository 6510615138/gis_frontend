'use client'
import dynamic from 'next/dynamic';
import ProvinceSearchBox from "../components/ProvinceSearchbox";
import React, { useState, useEffect, use ,createContext } from 'react';
import Menu from '../components/Menu';
import Link from "next/link";

const MapComponent = dynamic(() => import('../components/MapComponent.jsx'), {
  ssr: false,
});

export default function MapPage() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [lst, setLst] = useState([]);
  const [coor, setCoor] = useState(null);
  useEffect(() => {
    const fetchCoor = async () => {
      if (lst && lst.length > 0) {
        const url = `${backend_url}/coor?code=\"${lst.join(',')}\"`;
        console.log("Fetching:", url);

        try {
          const res = await fetch(url);
          const data = await res.json(); // return as a str

          const geoJson = JSON.parse(data); // make it json
          setCoor(geoJson);
        } catch (err) {
          console.error('Error fetching:', err);
          setCoor(null);
        }
      } else {
        setCoor(null);
      }
    };

    fetchCoor();
  }, [lst, backend_url]);

  return (<div className='w-[100vw] h-[100vh] flex'>
    <Menu children={[<ProvinceSearchBox lst={lst} setLst={setLst} baseUrl={backend_url} />]}/>
     <MapComponent geoJsonString={coor}/>
     </div>)
}