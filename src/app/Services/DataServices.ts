import { ICityGet, IForecast } from "../Interfaces/Interfaces";

let Apikey = process.env.NEXT_PUBLIC_API_KEY;
console.log(Apikey)
export const getData = async (longitude: number, latitude: number) => {
  const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${Apikey}&units=imperial&cnt=40`);
  const data: IForecast = await promise.json();
  return data;
};

export const GetMaxMin = (data: IForecast) => {
  const compareDay: Date = new Date();
  const compareDay2: Date = new Date(compareDay.getTime() + 86400000);
  const compareDay3: Date = new Date(compareDay.getTime() + 86400000 * 2);
  const compareDay4: Date = new Date(compareDay.getTime() + 86400000 * 3);
  const compareDay5: Date = new Date(compareDay.getTime() + 86400000 * 4);
  const compareDay6: Date = new Date(compareDay.getTime() + 86400000 * 5);
  //Max Arrays
  let day1MaxArr: number[] = [];
  let day2MaxArr: number[] = [];
  let day3MaxArr: number[] = [];
  let day4MaxArr: number[] = [];
  let day5MaxArr: number[] = [];
  let day6MaxArr: number[] = [];
  //Min Arrays
  let day1MinArr: number[] = [];
  let day2MinArr: number[] = [];
  let day3MinArr: number[] = [];
  let day4MinArr: number[] = [];
  let day5MinArr: number[] = [];
  let day6MinArr: number[] = [];
  //Status arrays
  let day1StatusArr: string[] = [];
  let day2StatusArr: string[] = [];
  let day3StatusArr: string[] = [];
  let day4StatusArr: string[] = [];
  let day5StatusArr: string[] = [];

  for (let i = 0; i < data.list.length; i++) {
    let dayTime2 = new Date(data.list[i].dt * 1000);
    if (dayTime2.toLocaleDateString("en-US") ===compareDay.toLocaleDateString("en-US")) {
      day1MaxArr.push(data.list[i].main.temp_max);
      day1MinArr.push(data.list[i].main.temp_min);
    } else if (dayTime2.toLocaleDateString("en-US") ===compareDay2.toLocaleDateString("en-US")) {
      day2MaxArr.push(data.list[i].main.temp_max);
      day2MinArr.push(data.list[i].main.temp_min);
      day1StatusArr.push(data.list[i].weather[0].icon);
    } else if (dayTime2.toLocaleDateString("en-US") ===compareDay3.toLocaleDateString("en-US")) {
      day3MaxArr.push(data.list[i].main.temp_max);
      day3MinArr.push(data.list[i].main.temp_min);
      day2StatusArr.push(data.list[i].weather[0].icon);
    } else if (dayTime2.toLocaleDateString("en-US") ===compareDay4.toLocaleDateString("en-US")) {
      day4MaxArr.push(data.list[i].main.temp_max);
      day4MinArr.push(data.list[i].main.temp_min);
      day3StatusArr.push(data.list[i].weather[0].icon);
    } else if (dayTime2.toLocaleDateString("en-US") ===compareDay5.toLocaleDateString("en-US")) {
      day5MaxArr.push(data.list[i].main.temp_max);
      day5MinArr.push(data.list[i].main.temp_min);
      day4StatusArr.push(data.list[i].weather[0].icon);
    } else if (dayTime2.toLocaleDateString("en-US") === compareDay6.toLocaleDateString("en-US")) {
      day6MaxArr.push(data.list[i].main.temp_max);
      day6MinArr.push(data.list[i].main.temp_min);
      day5StatusArr.push(data.list[i].weather[0].icon);
    }
  }

  function StatusMode(statusArr: string[]) {
    const frequency: any = {};

    statusArr.forEach((status) => {
      frequency[status] = (frequency[status] || 0) + 1;
    });

    let mostCommonStatus;
    let maxFrequency = 0;

    Object.keys(frequency).forEach((status) => {
      if (frequency[status] > maxFrequency) {
        maxFrequency = frequency[status];
        mostCommonStatus = status;
      }
    });

    return mostCommonStatus;
  }
  const StatusDay1 = StatusMode(day1StatusArr);
  const StatusDay2 = StatusMode(day2StatusArr);
  const StatusDay3 = StatusMode(day3StatusArr);
  const StatusDay4 = StatusMode(day4StatusArr);
  const StatusDay5 = StatusMode(day5StatusArr);

  const currentMax = Math.floor(Math.max(...day1MaxArr));
  const currentMin = Math.floor(Math.min(...day1MinArr));
  const DayOneMax = Math.floor(Math.max(...day2MaxArr));
  const DayOneMin = Math.floor(Math.min(...day2MaxArr));
  const DayTwoMax = Math.floor(Math.max(...day3MaxArr));
  const DayTwoMin = Math.floor(Math.min(...day3MinArr));
  const DayThreeMax = Math.floor(Math.max(...day4MaxArr));
  const DayThreeMin = Math.floor(Math.min(...day4MinArr));
  const DayFourMax = Math.floor(Math.max(...day5MaxArr));
  const DayFourMin = Math.floor(Math.min(...day5MaxArr));
  const DayFiveMax = Math.floor(Math.max(...day6MinArr));
  const DayFiveMin = Math.floor(Math.min(...day6MinArr));

  return {compareDay2, compareDay3, compareDay4, compareDay5, compareDay6, StatusDay1, StatusDay2, StatusDay3, StatusDay4, StatusDay5, currentMax, currentMin, DayOneMax, DayOneMin, DayTwoMax, DayTwoMin, DayThreeMax, DayThreeMin, DayFourMax, DayFourMin, DayFiveMax, DayFiveMin, };
};

export const GetCity = async (city: string) => {
  const CityLookup = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${Apikey}`);
  const cityName: ICityGet[] = await CityLookup.json();
  let latitude = cityName[0].lat;
  let longitude = cityName[0].lon;
  return { longitude, latitude };
};

const saveToLocalStorage = (city: string) => {
  let favorites = getlocalStorage();
  if (!favorites.includes(city)) {favorites.push(city);}
  localStorage.setItem("Favorites", JSON.stringify(favorites));
};
const getlocalStorage = () => {
  let localStorageData = localStorage.getItem("Favorites");
  if (localStorageData == null) {return [];}
  return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (city: string) => {
  let favorites = getlocalStorage();
  let namedIndex = favorites.indexOf(city);
  favorites.splice(namedIndex, 1);
  localStorage.setItem("Favorites", JSON.stringify(favorites));
};
export { saveToLocalStorage, getlocalStorage, removeFromLocalStorage };
