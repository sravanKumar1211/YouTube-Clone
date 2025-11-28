import React from 'react'
import SideBar from '../Components/SideBar'
import HomePage from '../Components/HomePage'

function Home() {
  return (
    <>
   
    <div className='flex w-\[100\%\] pt-10 pr-12 pb-0 pl-12 box-border'>
         <SideBar></SideBar>
         <HomePage></HomePage>

    </div>
    </>
  )
}

export default Home
