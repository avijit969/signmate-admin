import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import SideBarWrapper from './components/SideBarWrapper'


function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default Layout