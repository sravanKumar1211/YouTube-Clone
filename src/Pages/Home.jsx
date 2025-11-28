import React from 'react'
import SideBar from '../Components/SideBar'
import HomePage from '../Components/HomePage'

function Home({sideBar}) {
  return (
    <>
   
    <div className='flex w-\[100\%\] pt-10 pr-12 pb-0 pl-12 box-border'>
       {/* sideBar state value holds boolian val so that side bar can be desplayed or hidden */}
        <SideBar sideBar={sideBar}></SideBar>
        <HomePage></HomePage>

    </div>
    </>
  )
}

export default Home
