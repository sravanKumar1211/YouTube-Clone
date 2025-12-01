import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import {Route,Routes} from 'react-router-dom'
import Video from './Pages/Video';
import PofilePage from './Pages/PofilePage';
import VideoUploard from './Pages/VideoUploard';

function App() {
  const[sideBar,setSideBar]=useState(true);// state that holds the boolion valof sideBar when HamburgerMenu clicked
  const sideBarFn=(val)=>{ setSideBar(val)};//function for handling sidebar val

  

  return (
    <>
     {/* passed sidebar function and state to capture state and value */}
    <NavBar sideBarFn={sideBarFn} sideBar={sideBar}></NavBar>
    {/* sidebar passed to home component because side bar is a part of home */}
    <Routes>
      <Route path ='/' element={<Home sideBar={sideBar}></Home>}></Route>
      <Route path ='/watch/:id' element={<Video></Video>}></Route>
      <Route path ='/user/:id' element={<PofilePage sideBar={sideBar}></PofilePage>}></Route>
      <Route path ='/:id/uploard' element={<VideoUploard></VideoUploard>}></Route>

    </Routes>
    </>
  )
}

export default App
