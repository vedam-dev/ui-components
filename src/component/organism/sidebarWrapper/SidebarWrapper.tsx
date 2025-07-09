import React, { useState } from "react";
import SidebarDrawer, {
  SidebarItem,
} from "../sidebardrawer/SidebarDrawer";
import TopBar from "../topbar/TopBar";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";

const items: SidebarItem[] = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    text: "Dashboard",
    onClick: () => console.log("Dashboard"),
  },
  {
    id: "users",
    icon: <PeopleIcon />,
    text: "Users",
    onClick: () => console.log("Users"),
  },
  {
    id: "analytics",
    icon: <AnalyticsIcon />,
    text: "Analytics",
    onClick: () => console.log("Analytics"),
  },
  {
    id: "settings",
    icon: <SettingsIcon />,
    text: "Settings",
    onClick: () => console.log("Settings"),
  },
];

const SidebarWrapper = () => {
  const topbarHeight = 106;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div>
      <TopBar
        studentId="VED2025"
        studentName="Sameeksha Kapoor"
        studentPhoto="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        streakCount={365}
        coinCount={8765}
        notificationCount={3}
        onMenuClick={toggleSidebar} 
        onProfileClick={() => console.log("Profile clicked")}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex:isSidebarExpanded?0:20
        }}
      />

      <SidebarDrawer
        items={items}
        anchor="left"
        collapsedWidth={84}
        expandedWidth={200}
        expanded={isSidebarExpanded} 
        onToggleExpand={setIsSidebarExpanded}
        onItemClick={(item) => {
          console.log("You clicked:", item.id);
        }}
        paperSx={{
          bgcolor: "background.default",
          marginTop: `${topbarHeight}px`,
          height: `calc(100vh - ${topbarHeight}px)`,
          zIndex:isSidebarExpanded?0:10
        }}
      />
    </div>
  );
};

export default SidebarWrapper;
