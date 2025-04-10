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
  import { Link } from 'react-router-dom'
 

function AppSidebar() {
  // Menu items.
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
    <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <Link to="/">
        <SidebarGroupLabel>Job Board</SidebarGroupLabel>
        </Link>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
             <SidebarMenuItem key={item.title}>
             <SidebarMenuButton 
               asChild 
               active={location.pathname === item.url}
             >
               <Link to={item.url}>
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