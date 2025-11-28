import React, { useState } from 'react'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'

function App() {
  const[sideBar,setSideBar]=useState(true);// state that holds the boolion valof sideBar when HamburgerMenu clicked
  const sideBarFn=(val)=>{ setSideBar(val)};//function for handling sidebar val
  return (
    <>
     {/* passed sidebar function and state to capture state and value */}
    <NavBar sideBarFn={sideBarFn} sideBar={sideBar}></NavBar>
    {/* sidebar passed to home component because side bar is a part of home */}
    <Home sideBar={sideBar}></Home>
    </>
  )
}

export default App
