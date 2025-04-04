"use client";

import { CallData } from "@/data/mockCalls"; // Assuming CallData is exported from mockCalls
import { formatDurationMMSS } from "@/utils/formatters";
import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Use Agent icon

// Define and export the combined type
export interface CallWithAgentDetails extends CallData {
  agentName: string;
  agentPhoneNumber: string;
  agentReview: string;
}

interface RecentCallsProps {
  calls: CallWithAgentDetails[];
}

// Add getReviewBadgeClass helper (copied from AgentsTable for now, ideally move to utils)
const getReviewBadgeClass = (review: string): string => {
  switch (review) {
    case "Excellent":
      return "bg-green-100 text-green-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Needs Improvement":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default function RecentCallsList({ calls }: RecentCallsProps) {
  // Display latest 4 calls
  const displayedCalls = calls.slice(0, 4);

  return (
    // Container for vertical list of cards
    <div className="w-full flex-grow overflow-y-auto pr-1 space-y-3">
      {displayedCalls.length === 0 ? (
        <p className="text-center text-gray-500 py-6 w-full">
          No recent calls to display.
        </p>
      ) : (
        displayedCalls.map((call: CallWithAgentDetails) => {
          return (
            // Call Card - List Item Style
            <div
              key={call.id}
              // Add onClick handler if navigation/modal opening is desired
              // onClick={() => alert(`Show details for ${call.id}`)}
              className="flex items-start p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-150 cursor-default shadow border border-gray-200 space-x-3"
              title={`Call from ${call.callerNumber} handled by ${call.agentName}`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                <FaUserCircle size={28} color="#6b7280" />
              </div>

              {/* Details Column */}
              <div className="flex-grow min-w-0">
                <p
                  className="text-sm font-semibold text-gray-800 truncate"
                  title={call.agentName}
                >
                  Agent: {call.agentName}
                </p>
                <p
                  className="text-xs text-gray-500 truncate"
                  title={call.callerNumber}
                >
                  Caller: {call.callerNumber}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Duration: {formatDurationMMSS(call.durationSeconds)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Date: {call.date} {/* Added Date */}
                </p>
              </div>

              {/* Review Badge */}
              <div className="flex-shrink-0 mt-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${getReviewBadgeClass(
                    call.agentReview // Use mock review from props
                  )}`}
                >
                  {call.agentReview}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
