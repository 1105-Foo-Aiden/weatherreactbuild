'use client'
import React, { useEffect, useState } from 'react'

export default function DayForcastComponent(props:any) {
  console.log(props.dateMultipler)
  return (
    <div className='grid justify-center container grid-rows-5'>

        <p>{props.Max}/{props.Max && Math.round((props.Max - 32) * 5/9)}</p>
        <p>{props.Min}/{props.Min && Math.round((props.Min -32) * 5/9)}</p>
    </div>
  )
}
