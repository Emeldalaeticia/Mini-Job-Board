import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from './AppSidebar'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

function Layout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
         
          <header className="sticky top-0 z-50 bg-black text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger className="text-white hover:bg-gray-800" />
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/addjob" >
              <Button variant="ghost" className="text-white hover:bg-red-700">
                For Employers
              </Button>
              </Link>
              <Button variant="ghost" className="text-white hover:bg-red-700">
                Login
              </Button>
            </div>
          </header>
          
          {/* Main content area */}
          <main className="flex-1 overflow-auto bg-white">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Layout