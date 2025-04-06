"use client";

import React from "react";
import { FaListUl, FaThLarge, FaUsers } from "react-icons/fa"; // Import icons

type View = "dashboard" | "allCalls" | "agents";

interface TopBarProps {
  currentView: View;
  onSetView: (view: View) => void;
}

export default function TopBar({ currentView, onSetView }: TopBarProps) {
  const navItems = [
    { view: "dashboard" as View, label: "Dashboard", icon: FaThLarge },
    { view: "allCalls" as View, label: "All Calls", icon: FaListUl },
    { view: "agents" as View, label: "Agents", icon: FaUsers },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent flex p-6 justify-end  ">
      {/* Optional: Logo/Brand on the left */}
      {/* <div className="absolute left-4">[Logo]</div> */}

      <div className="flex space-x-4 sm:space-x-6 md:space-x-8 bg-[#333B48] w-fit rounded-full h-16 text-white shadow-md flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onSetView(item.view)}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-[#333B48] ${ // Adjusted focus offset color
                isActive
                  ? "bg-indigo-600 text-white shadow-inner"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              title={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon className="h-5 w-5 mr-2" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Optional: User Profile/Actions on the right */}
      {/* <div className="absolute right-4">[User Menu]</div> */}
    </nav>
  );
} 