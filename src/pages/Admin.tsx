
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Users, CalendarDays, Flag, Car, ShieldAlert } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";

const Admin = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleNavigation = (path: string, itemName: string) => {
    navigate(path);
    setActiveItem(itemName);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-black">
          <Sidebar variant="floating" className="border-0">
            <SidebarHeader className="border-b border-gray-800 py-4">
              <h2 className="text-xl font-semibold text-center text-racing-red">Panel de Admin</h2>
            </SidebarHeader>
            <SidebarContent>
              <div className="py-4">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === 'dashboard'} 
                      className="gap-3"
                      onClick={() => handleNavigation('/admin', 'dashboard')}
                    >
                      <ShieldAlert />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === 'users'} 
                      className="gap-3"
                      onClick={() => handleNavigation('/admin/users', 'users')}
                    >
                      <Users />
                      <span>Usuarios</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === 'races'} 
                      className="gap-3"
                      onClick={() => handleNavigation('/admin/races', 'races')}
                    >
                      <Flag />
                      <span>Carreras</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === 'pilots'} 
                      className="gap-3"
                      onClick={() => handleNavigation('/admin/pilots', 'pilots')}
                    >
                      <CalendarDays />
                      <span>Pilotos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      isActive={activeItem === 'teams'} 
                      className="gap-3"
                      onClick={() => handleNavigation('/admin/teams', 'teams')}
                    >
                      <Car />
                      <span>Equipos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </SidebarContent>
            <SidebarFooter className="border-t border-gray-800 p-4">
              <SidebarTrigger className="ml-auto" />
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Admin;
