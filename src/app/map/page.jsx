'use client'
import dynamic from 'next/dynamic';

import React, { useState, useEffect, use ,createContext } from 'react';
import Menu from '../components/Menu';
import FactorySearchBox from '../components/FactorySearchBox';
import ProvinceSearchBox from '../components/ProvinceSearchbox';
import StoreFilter from '../components/StoreFilter';

export const LAZY_LOAD_THRESHOLD = 13

const MapComponent = dynamic(() => import('../components/MapComponent.jsx'), {
  ssr: false,
});

export default function MapPage() {
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [userSelection, setUserSelection] = useState([]); //A state maintain choices of the user
  const [selected_area_list, setAreaList] = useState([]); //A state maintain list of selected area
  const [polygonCoordinates, setPolygonCoordinates] = useState(null); //A state maintaining coordinates of the areas polygon for display
  const [markers, setMarkers] = useState(null);
  const [mode, modeSelect] = useState(null);
  const [zoom_1l, setZoom1L] = useState(null);//zoom at the top level component, which is this page. value from MapComponent.jsx


useEffect(() => {
  // console.log for debugging
    console.log("mode :", mode)
}, [mode]);

const fetchAreaPolygon = async () => {
  if (selected_area_list && selected_area_list.length > 0) {
        const codes = selected_area_list.map(obj => obj.code);
        const url = `${backend_url}/coor?code=\"${codes.join(',')}\"`;
        console.log("Fetching:", url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const json = typeof data === 'string' ? JSON.parse(data) : data;
      setPolygonCoordinates(json);
    } catch (err) {
      console.error('Error fetching:', err);
      setPolygonCoordinates(null);
    }
  } else {
    setPolygonCoordinates(null);
  }
};

const fetchDataFromBackend = async () => {
  if (selected_area_list.length > 0 && userSelection) {
        const codes = selected_area_list.map(obj => obj.code);
      let url = `${backend_url}/${mode}`;

      //switching apis URL for each mode
      switch (mode) {
        case "factory":
          url = `${backend_url}/${mode}?code=${codes.join(',')}&type=${userSelection.code}`;
          break;
        case "store":
          let selected_stores = Object.keys(userSelection).join(','); // map selected_stores from userSelection : { Lawson: true, TopSmall: true, TescoSmall: true } >> "Lawson,TopSmall,TescoSmall"
          url = `${backend_url}/${mode}?area_code=${codes.join(',')}&store=${selected_stores}&lazy=${a}&coordinates=${a}`;
          break;
        case "ev":
          url = `${backend_url}/${mode}?code=${codes.join(',')}&type=${userSelection.code}`;
          break;
        default:
          return 0; // return 0 in case mode is not selected
      }

        console.log("Fetching:", url);
    try {
      const res = await fetch(url);
      const data = await res.json(); // Assuming backend returns JSON
      // If the response is a stringified GeoJSON, parse it.
      const json = typeof data === 'string' ? JSON.parse(data) : data;
      setMarkers(json);
    } catch (err) {
      console.error('Error fetching:', err);
      setMarkers(null);
    }
  } else {
    setMarkers(null);
  }
};

//fetch and update coordinates on userSelection or area changes
useEffect(() => {
  // console.log for debugging
    console.log("userSelection", userSelection)
    console.log("selected_area_list", selected_area_list)
    fetchAreaPolygon();
    fetchDataFromBackend();
}, [selected_area_list,userSelection]);

  return (
  <div className='w-[100vw] h-[100vh] flex'>
    <Menu
      children={
        mode === "store"
          ? [,
            <ProvinceSearchBox
                key="province"
                lst={selected_area_list}
                setLst={setAreaList}
                baseUrl={backend_url}
              />
            ,
            <StoreFilter setSelectedStoreFunction={setUserSelection}/>
          ]
          : mode === "ev"
          ? ["ev menu here"]
          : mode === "factory"
          ? [
                <FactorySearchBox
                key="business"
                set_factory_type={setUserSelection}
                baseUrl={backend_url}
              />,
              <ProvinceSearchBox
                key="province"
                lst={selected_area_list}
                setLst={setAreaList}
                baseUrl={backend_url}
              />
            ]
          : []
      }

      modeSelectFunc={modeSelect}
    />
    <MapComponent geoJsonObj={polygonCoordinates} markers={markers} mode={mode} setZoom={setZoom1L}/>
  </div>
);
}