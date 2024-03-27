"use client";
import { ApiKey } from "./Services/APIKey";


import NavBarComponent from "./Components/NavBarComponent";
import Satr from './Star.png'
import { useEffect, useState } from "react";
// import { getData } from "./Services/DataServices";
import { IForecast } from "./Interfaces/Interfaces";
import Image from "next/image";
import DayForcastComponent from "./Components/DayForcastComponent";
import { GetMaxMin } from "./Services/DataServices";



export default function Home() {
  const [longitude, setLongitude] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [forecastData, setForecastData] = useState<IForecast>();
  const [successBool, setSuccessBool] = useState<Boolean>(false)
  const [currentDayMax, setCurrentDayMax] = useState<number>()
  const [currentDayMin, setCurrentDayMin] = useState<number>()
  const [currentStatus, setCurrentStatus] = useState<string>()
  const [DayOneMax, setDayOneMax] = useState<number>()
  const [DayOneMin, setDayOneMin] = useState<number>()
  const [DayTwoMax, setDayTwoMax] = useState<number>()
  const [DayTwoMin, setDayTwoMin] = useState<number>()
  const [DayThreeMax, setDayThreeMax] = useState<number>()
  const [DayThreeMin, setDayThreeMin] = useState<number>()
  const [DayFourMax, setDayFourMax] = useState<number>()
  const [DayFourMin, setDayFourMin] = useState<number>()
  const [DayFiveMax, setDayFiveMax] = useState<number>()
  const [DayFiveMin, setDayFiveMin] = useState<number>()
  const [StatusDay1, setStatusDay1] = useState<string>("")
  const [StatusDay2, setStatusDay2] = useState<string>("")
  const [StatusDay3, setStatusDay3] = useState<string>("")
  const [StatusDay4, setStatusDay4] = useState<string>("")
  const [StatusDay5, setStatusDay5] = useState<string>("")
  const [date, setdate] = useState<Date>()

  const getData = async (longitude:string, latitude:string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=imperial&cnt=40`);
    const data:IForecast = await promise.json()
    return data;
  };
  
useEffect(()=>{
  global.navigator.geolocation.getCurrentPosition(success, error);
}, [])


function success(position: any) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setdate(new Date().toLocaleDateString("default", {day:"numeric", month:"numeric"}))
    
    
    setSuccessBool(true)
 } 

 function error(error: any) {
      console.log(error.message);
    }
useEffect(()=>{
  if(successBool){
    const fetchData = async() =>{ 
      const weatherData = await getData(longitude, latitude)

      setForecastData(weatherData)
      setCurrentStatus(`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`)
      const { StatusDay1, StatusDay2, StatusDay3, StatusDay4, StatusDay5, currentMax, currentMin, DayOneMax, DayOneMin, DayTwoMax, DayTwoMin, DayThreeMax, DayThreeMin, DayFourMax, DayFourMin, DayFiveMax, DayFiveMin, } = GetMaxMin(weatherData)
      setStatusDay1(`https://openweathermap.org/img/wn/${StatusDay1}@2x.png`), setStatusDay2(`https://openweathermap.org/img/wn/${StatusDay2}@2x.png`), setStatusDay3(`https://openweathermap.org/img/wn/${StatusDay3}@2x.png`), setStatusDay4(`https://openweathermap.org/img/wn/${StatusDay4}@2x.png`), setStatusDay5(`https://openweathermap.org/img/wn/${StatusDay5}@2x.png`)
      setCurrentDayMax(currentMax), setCurrentDayMin(currentMin), setDayOneMax(DayOneMax), setDayOneMin(DayOneMin), setDayTwoMax(DayTwoMax), setDayTwoMin(DayTwoMin), setDayThreeMax(DayThreeMax), setDayThreeMin(DayThreeMin), setDayFourMax(DayFourMax), setDayFourMin(DayFourMin), setDayFiveMax(DayFiveMax), setDayFiveMin(DayFiveMin) }
    fetchData()
  }
}, [successBool])
  

  return (
    <>
      <NavBarComponent />
      <div className="grid grid-cols-3 grid-rows-1">
        <div className="flex justify-center">
          <h1 className="text-4xl underline flex justify-center w-fit">Favorites</h1>
          <div className="grid grid-cols-2" id="Favorites"></div>
        </div>
        <div>
        <div className="grid grid-rows-4 w-full justify-center h-56 gap-4">
          <div className="flex justify-center h-auto">
            <h1 className="text-6xl ">{forecastData && forecastData.city.name}</h1>
            <p><Image width={50} height={50} src={Satr.src} alt="favStar" onClick={() => alert()} className=""/></p>
          </div>
          <div className="flex justify-center">
            <img src={currentStatus} alt="Current Status" className=" h-96"/>
          </div>
          
          </div>
        </div>
        <div>
          <div className="pt-20 pr-20 grid justify-center grid-rows-5 gap-0">
          <div>
            <p className="text-6xl flex justify-center">Today</p>
          </div>
          <div>
            <p className="text-5xl flex justify-center">
              {date}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[60px] flex justify-center">
              {forecastData && Math.round(forecastData.list[0].main.temp)}F/ <p className="text-[40px] opacity-50 pt-6">{forecastData && Math.round((forecastData.list[0].main.temp -32) * 5/9)}C</p>
            </p>
          </div>
          <div className="flex items-center grid-rows-2">
            <p className="text-[40px]">Hi: {currentDayMax}F/</p>
            <p className="text-[35px] opacity-50">{currentDayMax && Math.floor((currentDayMax - 32) * 5/9)}C</p>
          </div>
          <div className="flex items-center">
            <p className="text-[40px]">Lo: {currentDayMin}F/</p>
            <p className="text-[35px] opacity-50">{currentDayMin && Math.round((currentDayMin - 32) * 5/9)}C</p>
          </div>
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-5">
        <DayForcastComponent dateMultipler={2} Max={DayOneMax} Min={DayOneMin} Status={StatusDay1} />
        <DayForcastComponent dateMultipler={3} Max={DayTwoMax} Min={DayTwoMin} Status={StatusDay1} />
        <DayForcastComponent dateMultipler={4} Max={DayThreeMax} Min={DayThreeMin} Status={StatusDay1} />
        <DayForcastComponent dateMultipler={5} Max={DayFourMax} Min={DayFourMin} Status={StatusDay1} />
        <DayForcastComponent dateMultipler={2} Max={DayFiveMax} Min={DayFiveMin} Status={StatusDay1} />
        
      </div>
    </>
  );
}
