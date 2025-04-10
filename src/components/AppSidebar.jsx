import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'

function AppSidebar() {
  const location = useLocation();
  
  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Add Job",
      url: "/addjob",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className="bg-black text-white h-full">
      <SidebarContent className="bg-black">
        <SidebarGroup className="bg-black">
          <Link to="/">
            <SidebarGroupLabel className="text-white font-bold text-xl  hover:text-red-500 block">
              Job Board
            </SidebarGroupLabel>
          </Link>
          <SidebarGroupContent className="bg-black">
            <SidebarMenu className="bg-black">
              {items.map((item) => (
                <SidebarMenuItem 
                  key={item.title} 
                  className="mb-1 bg-black hover:bg-red-700"
                >
                  <SidebarMenuButton 
                    asChild 
                    active={location.pathname === item.url}
                    className="w-full bg-black hover:bg-red-700"
                  >
                    <Link 
                      to={item.url} 
                      className={`
                        flex items-center gap-3 p-3 rounded-md
                        text-white font-bold bg-black
                        hover:text-red-500
                        transition-colors duration-200
                        ${location.pathname === item.url ? 'bg-red-700 text-red-500' : ''}
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar