"use client";

import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa"; // Or appropriate icons
import { AgentData } from "@/data/mockAgents";
import type { CallData } from "@/data/mockCalls";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  agents: AgentData[]; // Use correct type
  callData: CallData[];
  onAgentSelect: (agent: AgentData) => void; // Add prop
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  agents,
  callData,
  onAgentSelect, // Destructure new prop
}: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-30 w-64 transform bg-white text-gray-800 shadow-lg transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } lg:sticky lg:translate-x-0 lg:shadow-md lg:inset-y-auto lg:h-screen lg:overflow-y-auto lg:bg-gray-50 lg:border-r lg:border-gray-200`}
    >
      <div className="flex justify-start p-2 lg:hidden flex-shrink-0 border-b border-gray-200">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close sidebar"
        >
          {/* Heroicon: x-mark */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {/* AgentsTable component is removed as per the instructions */}
      </div>
    </div>
  );
}
