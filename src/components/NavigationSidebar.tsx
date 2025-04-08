"use client";

import React from "react";
import { FaListUl, FaThLarge, FaUsers } from "react-icons/fa"; // Example icons

type View = "dashboard" | "allCalls" | "agents";

interface NavigationSidebarProps {
  currentView: View;
  onSetView: (view: View) => void;
}

export default function NavigationSidebar({
  currentView,
  onSetView,
}: NavigationSidebarProps) {
  const navItems = [
    { view: "dashboard" as View, label: "Dashboard", icon: FaThLarge },
    { view: "allCalls" as View, label: "All Calls", icon: FaListUl },
    { view: "agents" as View, label: "Agents", icon: FaUsers },
  ];

  return (
    // Reverted to fixed positioning, 70vh height, vertical centering, rounding, shadow
    <nav className="fixed  top-1/2 -translate-y-1/2 z-40 w-60 h-full  bg-[#344743] text-white flex flex-col items-center justify-start py-6 space-y-6 rl shadow-lg gap-4 p-4">
      {/* Added justify-center back */}

      {/* Optional: Logo placeholder */}
      {/* <div className="absolute top-4">[Logo]</div> */}

      {navItems.map((item) => {
        const isActive = currentView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => onSetView(item.view)}
            className={`flex flex-col items-center p-2 rounded-lg w-full h-16 justify-center transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800 ${
              isActive
                ? "bg-[#4A5B58] rounded-full text-white shadow-inner"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
            title={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}

      {/* Optional: Settings/Logout placeholder at bottom */}
      {/* <div className="absolute bottom-4">[Settings]</div> */}
    </nav>
  );
}
