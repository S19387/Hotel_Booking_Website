import React from 'react'
import YogaFooter from './YogaFooter'
import YogaNavBar from './YogaNavBar'
import { Outlet } from 'react-router-dom'

const Yogalayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className=" flex justify-between items-center sticky top-0 z-50">
        <YogaNavBar/>
      </nav>

      <main className="flex-grow">
       <Outlet />
      </main>

      <YogaFooter />
    </div>
  )
}

export default Yogalayout;
