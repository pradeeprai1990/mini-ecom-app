import React, { createContext, useEffect, useState } from 'react'
export let counterContext=createContext()

//Provider
//Consumer
export default function MainContext({children}) {

  let [cart,setCart]=useState( JSON.parse(localStorage.getItem("CART")) ?? [])

  let [count,setCount]=useState( Number(localStorage.getItem("COUNT")) || 0) 
  
  let obj={count,setCount,cart,setCart}



  useEffect(()=>{
        localStorage.setItem("COUNT",count)
  },[count])

  useEffect(()=>{
      localStorage.setItem("CART",JSON.stringify(cart))
  },[cart])


  return (
    <counterContext.Provider value={obj}>
        {children}
    </counterContext.Provider>
  )
}
