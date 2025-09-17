import { useState } from 'react'
import './App.css'
// import Home from './components/Pages/Home'
// import Subscription from './components/Pages/Subscription'
// import AllSubscriptions from './components/Pages/AllSubscriptions'
// import Profile from './components/Pages/Profile'
// import Video from './components/Pages/Video'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      {/* <Home/> */}
      {/* <Subscription/> */}
      {/* <AllSubscriptions/> */}
      {/* <Profile/> */}
      {/* <Video/> */}
      {/* <p>Hello</p> */}
      <Outlet/>
    </>
  )
}

export default App
