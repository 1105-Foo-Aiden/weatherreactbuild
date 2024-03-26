"use client";

import React, { useState } from "react";

export default function NavBarComponent() {
  const [searchvalue, setSearchValue] = useState<string>();

  return (
    <div className="grid grid-cols-3 pt-5 mb-10">
      <div>

      </div>
      <div className="flex gap-8 justify-around ">
        <h1 className="text-4xl">The Weather App</h1>
        </div>
        <div className="gap-4 pr-5 flex justify-end">
          <input type="text" placeholder="Search a City" className="h-10 w-56 text-black" onChange={(e) => setSearchValue(e.target.value)} value={searchvalue} />
          <button className="w-28 h-10 bg-black">Go</button>
        </div>
      
    </div>
  );
}
