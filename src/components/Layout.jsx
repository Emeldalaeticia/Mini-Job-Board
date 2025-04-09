import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from './AppSidebar'

function Layout({ children }) {
  return (
    <SidebarProvider>
        <div className="flex h-screen">
        <AppSidebar />
        
       
     
      <main>
        <SidebarTrigger />
        {children}
      </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout