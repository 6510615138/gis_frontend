'use client'
import dynamic from 'next/dynamic';
import NavigationBar from '../components/Navigation.jsx';
import SearchBox from "../components/Searchbox";
import React, { useState, useEffect, use ,createContext } from 'react';

const MapComponent = dynamic(() => import('../components/MapComponent.jsx'), {
  ssr: false,
});

export default function MapPage() {
   const [lst, setLst] = useState([]);
  return (<div className='w-[100vw] h-[100vh] flex'>
     <NavigationBar />
     <SearchBox lst={lst} setLst={setLst} />
    
     <MapComponent />
     </div>)
}