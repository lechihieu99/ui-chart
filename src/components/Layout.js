import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="flex flex-col md:flex-row w-full">
      <Sidebar />
      <div className="w-full md:w-5/6 md:px-3 bg-[#c1c1c1] routePage">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout