import React from 'react'
import SideBar from '../Components/SideBar'
import HomePage from '../Components/HomePage'

function Home({ sideBar, search }) {
  return (
    <>
      <div 
        className="
          flex 
          flex-col lg:flex-row 
          w-full 
          pt-10 
          px-4 sm:px-6 md:px-10 lg:px-12 
          pb-0 
          box-border
        "
      >
        {/* Sidebar */}
        <SideBar sideBar={sideBar} />

        {/* Homepage Content */}
        <div className="flex-1 w-full">
          <HomePage sideBar={sideBar} search={search} />
        </div>
      </div>
    </>
  )
}

export default Home
