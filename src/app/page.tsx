"use client";

import Satr from "./Star.png";
import { useEffect, useState } from "react";
import { IForecast } from "./Interfaces/Interfaces";
import Image from "next/image";
import DayForcastComponent from "./Components/DayForcastComponent";
import { GetCity, GetMaxMin, getData, getlocalStorage, removeFromLocalStorage, saveToLocalStorage } from "./Services/DataServices";
import favStar from "./FilledStar.png";


export default function Home() {
  const [longitude, setLongitude] = useState<number>(27);
  const [latitude, setLatitude] = useState<number>(-121);
  const [forecastData, setForecastData] = useState<IForecast>();
  const [successBool, setSuccessBool] = useState<Boolean>(false);
  const [currentDayMax, setCurrentDayMax] = useState<number>();
  const [currentDayMin, setCurrentDayMin] = useState<number>();
  const [currentStatus, setCurrentStatus] = useState<string>();
  const [DayOneMax, setDayOneMax] = useState<number>();
  const [DayOneMin, setDayOneMin] = useState<number>();
  const [DayTwoMax, setDayTwoMax] = useState<number>();
  const [DayTwoMin, setDayTwoMin] = useState<number>();
  const [DayThreeMax, setDayThreeMax] = useState<number>();
  const [DayThreeMin, setDayThreeMin] = useState<number>();
  const [DayFourMax, setDayFourMax] = useState<number>();
  const [DayFourMin, setDayFourMin] = useState<number>();
  const [DayFiveMax, setDayFiveMax] = useState<number>();
  const [DayFiveMin, setDayFiveMin] = useState<number>();
  const [StatusDay1, setStatusDay1] = useState<string>("");
  const [StatusDay2, setStatusDay2] = useState<string>("");
  const [StatusDay3, setStatusDay3] = useState<string>("");
  const [StatusDay4, setStatusDay4] = useState<string>("");
  const [StatusDay5, setStatusDay5] = useState<string>("");
  const [compareDay2, setCompareDay2] = useState<Date>();
  const [compareDay3, setCompareDay3] = useState<Date>();
  const [compareDay4, setCompareDay4] = useState<Date>();
  const [compareDay5, setCompareDay5] = useState<Date>();
  const [compareDay6, setCompareDay6] = useState<Date>();
  const [searchvalue, setSearchValue] = useState<string>("");
  const [fav, setFav] = useState<Boolean>();
  const [date, setdate] = useState<any>();
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchCityValue, setSearchCityValue] = useState<string>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    setFavorites(getlocalStorage())
  }, []);

  function success(position: any) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
    setdate(new Date().toLocaleDateString("default", { day: "numeric", month: "numeric", }));
    setSuccessBool(true);
  }

  function error(error: any) {
    console.log(error.message);
  }
  useEffect(() => {
    if (successBool) {
      const fetchData = async () => {
        const weatherData = await getData(longitude, latitude);
        setForecastData(weatherData);
        setCurrentStatus(`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`);
        const {compareDay2, compareDay3, compareDay4, compareDay5, compareDay6, StatusDay1, StatusDay2, StatusDay3, StatusDay4, StatusDay5, currentMax, currentMin, DayOneMax, DayOneMin, DayTwoMax, DayTwoMin, DayThreeMax, DayThreeMin, DayFourMax, DayFourMin, DayFiveMax, DayFiveMin, } = GetMaxMin(weatherData);
        setStatusDay1(`https://openweathermap.org/img/wn/${StatusDay1}@2x.png`),
        setStatusDay2(`https://openweathermap.org/img/wn/${StatusDay2}@2x.png`), 
        setStatusDay3(`https://openweathermap.org/img/wn/${StatusDay3}@2x.png`), 
        setStatusDay4(`https://openweathermap.org/img/wn/${StatusDay4}@2x.png`), 
        setStatusDay5(`https://openweathermap.org/img/wn/${StatusDay5}@2x.png`), 
        setCurrentDayMax(currentMax), setCurrentDayMin(currentMin), setDayOneMax(DayOneMax), setDayOneMin(DayOneMin), setDayTwoMax(DayTwoMax), setDayTwoMin(DayTwoMin), setDayThreeMax(DayThreeMax),
        setDayThreeMin(DayThreeMin), setDayFourMax(DayFourMax), setDayFourMin(DayFourMin), setDayFiveMax(DayFiveMax), setDayFiveMin(DayFiveMin), setCompareDay2(compareDay2), setCompareDay3(compareDay3), setCompareDay4(compareDay4), setCompareDay5(compareDay5), setCompareDay6(compareDay6) 
      };
      fetchData();
    }
  }, [latitude, longitude]);
  
  useEffect(() =>{
    const GetNewData = async() =>{
      const { longitude, latitude } = await GetCity(searchCityValue!);
      setLatitude(latitude);
      setLongitude(longitude);
    }
    GetNewData()
  }, [searchCityValue])

  const HandleSearchBtn = () =>{
    setSearchCityValue(searchvalue)
  }


  const handleFav = () => {
    setFav(!fav);
    setFavorites(getlocalStorage())
    if( forecastData && !favorites.includes(forecastData!.city.name)){
      saveToLocalStorage(forecastData.city.name)
    }
    else{
      removeFromLocalStorage(forecastData!.city.name)
    } 
    setFavorites(getlocalStorage())
  };


  return (
    <>
      <div className="grid grid-cols-3 pt-5 mb-10">
        <div></div>
        <div className="flex gap-8 justify-around ">
          <h1 className="text-4xl">The Weather App</h1>
        </div>
        <div className="gap-4 pr-5 flex justify-end">
          <input type="text" placeholder="Search a City" className="h-10 w-56 text-black" onChange={(e) => setSearchValue(e.target.value)} value={searchvalue} />
          <button className="w-28 h-10 bg-black" onClick={(HandleSearchBtn)}>
            Go
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-flow-rows">
        <div>
          <div className="flex justify-center">
           <h1 className="text-4xl underline w-fit shadow-lg">
            Favorites
          </h1> 
          </div>
          <div className="grid grid-cols-2 grid-flow-row pt-5 pr-10">
            {
              favorites.map((city, id) =>{
                return(
                  <div key={id}>
                      <div className="bg-blue-950 w-fit h-fit rounded-xl shadow-xl ml-10">
                    <p className="text-3xl flex text-middle py-1 px-2">{city}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="grid grid-rows-4 w-full justify-center h-40 gap-4">
          <div className="flex justify-center h-4">
            <h1 className="text-6xl ">
              {forecastData && forecastData.city.name}
            </h1>
            <p>
              <Image width={50} height={50} src={forecastData && favorites.includes(forecastData.city.name) ? favStar.src : Satr.src} alt="favStar" onClick={handleFav} />
            </p>
          </div>
          <div className="flex justify-center">
            <img src={currentStatus} alt="Current Status" className="w-auto h-96 " />
          </div>
        </div>
        <div className="pt-20 pr-20 grid justify-center grid-rows-5 gap-0">
          <div>
            <p className="text-6xl flex justify-center">Today</p>
          </div>
          <div>
            <p className="text-5xl flex justify-center">{date}</p>
          </div>
          <div className="flex items-center">
            <p className="text-[60px] flex justify-center">
              {forecastData && Math.round(forecastData.list[0].main.temp)}F/
            </p>
            <p className="text-[40px] opacity-50 pt-6">
              {forecastData &&
                Math.round(((forecastData.list[0].main.temp - 32) * 5) / 9)}
              C
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-[30px]">Hi: {currentDayMax}F/</p>
            <p className="text-[25px] opacity-50 pt-2">
              {currentDayMax && Math.floor(((currentDayMax - 32) * 5) / 9)}C
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-[30px]">Lo: {currentDayMin}F/</p>
            <p className="text-[25px] opacity-50 pt-2">
              {currentDayMin && Math.round(((currentDayMin - 32) * 5) / 9)}C
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 justify-center mt-10">
        <DayForcastComponent date={compareDay2} Max={DayOneMax} Min={DayOneMin} Status={StatusDay1}/>
        <DayForcastComponent date={compareDay3} Max={DayTwoMax} Min={DayTwoMin} Status={StatusDay2} />
        <DayForcastComponent date={compareDay4} Max={DayThreeMax} Min={DayThreeMin} Status={StatusDay3} />
        <DayForcastComponent date={compareDay5} Max={DayFourMax} Min={DayFourMin} Status={StatusDay4} />
        <DayForcastComponent date={compareDay6} Max={DayFiveMax} Min={DayFiveMin} Status={StatusDay5} />
      </div>
    </>
  );
}
