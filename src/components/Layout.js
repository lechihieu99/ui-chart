import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div className="flex flex-row w-full">
        <Sidebar />
        <div className="w-5/6 px-3 bg-[#c1c1c1]">
            <Outlet />
        </div>
    </div>
  )
}

export default Layout