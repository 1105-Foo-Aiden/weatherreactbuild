'use client'
import React, { useEffect, useState } from 'react'

export default function DayForcastComponent(props:any) {
  

  return (
    <div className='grid justify-center container'>
      <img src={props.Status} alt="Status Image" className='flex justify-center w-56 h-auto'/>
        <div className="flex">
          <p className='text-[40px]'>High: {props.Max}F/</p>
          <p className='text-[35px] opacity-50 pt-2'>{props.Max && Math.round((props.Max - 32) * 5/9)}C</p>
        </div>
        <div className="flex">
          <p className='text-[40px]'>Low: {props.Min}F/</p>
          <p className='text-[35px] opacity-50 pt-2'>{props.Min && Math.round((props.Min -32) * 5/9)}C</p>
        </div>
        
    </div>
  )
}
