
import { ApiKey } from "./APIKey";

export const getData = async (longitude:string, latitude:string) => {
  const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${ApiKey}&units=imperial&cnt=40`);
  const data = await promise.json()
    return data;
};


