"use client";
import { ApiKey } from "./Services/APIKey";


import NavBarComponent from "./Components/NavBarComponent";
import Satr from './Star.png'
import { useEffect, useState } from "react";
import { getData } from "./Services/DataServices";
import { IForecast } from "./Interfaces/Interfaces";
import Image from "next/image";
import { setDefaultHighWaterMark } from "stream";


export default function Home() {
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [data, setData] = useState<IForecast>();


  const getData = async (longitude:string, latitude:string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=imperial&cnt=40`);
    const data = await promise.json()
    return data;
  };
  
useEffect(()=>{
  global.navigator.geolocation.getCurrentPosition(success, error);
}, [])


function success(position: any) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
 } 

 function error(error: any) {
      console.log(error.message);
    }
  
   
  

  return (
    <>
      <NavBarComponent />
      <div className="grid grid-cols-3 grid-rows-1">
        <div className="flex justify-center">
          <h1 className="text-4xl underline flex justify-center w-fit">Favorites</h1>
          <div className="grid grid-cols-2" id="Favorites"></div>
        </div>
        <div>
        <div className="flex justify-center gap-4">
          <h1 className="text-6xl">Stockton</h1>
          <p><Image width={50} height={50} src={Satr.src} alt="favStar" onClick={() => alert()}/></p>
          </div>
        </div>
        <div>
          <div className="pt-20 pr-20 grid justify-center grid-rows-5">
          <div>
            <p className="text-6xl flex justify-center">Today</p>
          </div>
          <div>
            <p className="text-5xl flex justify-center">
              11/27
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[60px] flex justify-center">
              41F/ <p className="text-[40px] opacity-50 pt-6">5C</p>
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[40px]">Hi: 63F/</p>
            <p className="text-[35px] opacity-50 pt-3">17C</p>
          </div>
          <div className="flex items-center">
            <p className="text-[40px]">Lo: 32F/</p>
            <p className="text-[35px] opacity-50 pt-3">0C</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
