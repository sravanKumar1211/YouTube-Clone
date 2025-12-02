import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import {Route,Routes} from 'react-router-dom'
import Video from './Pages/Video';
import ChannelPage from './Pages/ChannelPage';
import VideoUploard from './Pages/VideoUploard';
import SignIn from './Components/SignIn'
import Login from './Components/Login'

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
      <Route path ='/user/:id' element={<ChannelPage sideBar={sideBar}></ChannelPage>}></Route>
      <Route path ='/:id/uploard' element={<VideoUploard></VideoUploard>}></Route>
      <Route path ='/signin' element={<SignIn></SignIn>}></Route>
      <Route path ='/login' element={<Login></Login>}></Route>

    </Routes>
    </>
  )
}

export default App
