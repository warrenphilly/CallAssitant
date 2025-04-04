"use client";

import type { AgentData } from "@/data/mockAgents"; // Import correct type
import React from "react";
// Define or import AgentStats type properly
interface AgentStats {
  totalCalls: number;
  positive: number;
  neutral: number;
  negative: number;
  overallReview: string;
}

interface AgentDetailSidebarProps {
  agent: AgentData | null;
  agentStats: AgentStats | null;
  onClose: () => void;
  // Add props for helper functions
  getReviewBadgeClass: (review: string) => string;
  calculatePercentage: (count: number, total: number) => number;
}

export default function AgentDetailSidebar({
  agent,
  agentStats,
  onClose,
  getReviewBadgeClass, // Destructure helpers
  calculatePercentage,
  
}: AgentDetailSidebarProps) {
  if (!agent || !agentStats) {
    return null;
  }

  // Updated positioning: fixed right-0, translates based on presence (always present when agent selected)
  // lg: sticky, takes full height
  return (
    <div className="fixed inset-y-0 right-0 z-20 w-64 transform bg-white text-gray-800 shadow-lg transition-transform duration-300 ease-in-out translate-x-0 lg:sticky lg:h-screen lg:overflow-y-auto border-l border-gray-200 flex flex-col">
      {/* Header with Close Button - Added flex-shrink-0 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
        <h3
          className="text-lg font-semibold truncate text-gray-700"
          title={agent.name}
        >
          {agent.name} Details
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close agent details"
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

      {/* Agent Details Content - Added flex-grow, overflow-y-auto */}
      <div className="p-4 space-y-4 text-sm overflow-y-auto flex-grow text-gray-600">
        <div>
          <p className="font-semibold text-gray-500 mb-1">Contact</p>
          <p>
            <strong>Name:</strong> {agent.name}
          </p>
          <p>
            <strong>Phone:</strong> {agent.phoneNumber}
          </p>
          <p>
            <strong>Status:</strong> {agent.status}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-500 mb-1">Assignment</p>
          <p>
            <strong>Task:</strong>{" "}
            {agent.task || <span className="italic text-gray-500">N/A</span>}
          </p>
          <p className="font-semibold text-gray-500 mt-2 mb-1">Instructions:</p>
          <p className="whitespace-pre-wrap bg-gray-100 p-2 rounded text-xs border border-gray-300 min-h-[4em] text-gray-700">
            {agent.instructions || (
              <span className="italic text-gray-500">No instructions set.</span>
            )}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-500 mb-1">Performance</p>
          <p>
            <strong>Overall Review:</strong>
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getReviewBadgeClass(
                agentStats.overallReview
              )}`}
            >
              {agentStats.overallReview}
            </span>
          </p>
          <p>
            <strong>Total Calls:</strong> {agentStats.totalCalls}
          </p>
          <p>
            <strong>Positive:</strong> {agentStats.positive} (
            {calculatePercentage(agentStats.positive, agentStats.totalCalls)}%)
          </p>
          <p>
            <strong>Neutral:</strong> {agentStats.neutral} (
            {calculatePercentage(agentStats.neutral, agentStats.totalCalls)}%)
          </p>
          <p>
            <strong>Negative:</strong> {agentStats.negative} (
            {calculatePercentage(agentStats.negative, agentStats.totalCalls)}%)
          </p>
        </div>
      </div>
    </div>
  );
}

// Removed duplicate helper/type definitions
