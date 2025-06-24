'use client'
import dynamic from 'next/dynamic';
import NavigationBar from '../components/Navigation.jsx';
import MapFilter from '../components/MapFilter.jsx';
import SearchBox from "../components/Searchbox.jsx";

const MapComponent = dynamic(() => import('../components/MapComponent.jsx'), {
  ssr: false,
});

export default function MapPage() {
  return (<div className='w-[100vw] h-[100vh] flex'>
     <NavigationBar />
     <SearchBox className=""/>
     {/* <MapFilter /> */}
     <MapComponent />
     </div>)
}