import React, { useContext, useState } from 'react'
import { counterContext } from '../common/MainContext'

export default function Home() {
  let {count,setCount}=useContext(counterContext)
  return (
    <div>
        Home Page
        <button className='bg-red-500 p-2' onClick={()=>setCount(count+1)}>Change Counter</button>
    </div>
  )
}
