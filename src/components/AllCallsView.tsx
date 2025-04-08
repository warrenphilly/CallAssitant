"use client";

import { CallWithAgentDetails } from "@/components/RecentCallsTable"; // Reuse the combined type
import React from "react";
import CallCard from "./CallCard"; // Import the new CallCard component

interface AllCallsViewProps {
  allCalls: CallWithAgentDetails[];
}

// Add getReviewBadgeClass helper (copied again, move to utils ideally)
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

export default function AllCallsView({ allCalls }: AllCallsViewProps) {
  // Simple table view for all calls for now
  return (
    <div className="bg-[#333B48] rounded-xl shadow flex flex-col items-stretch p-4 h-[calc(80vh)] text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-2 flex-shrink-0 border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-200">All Calls</h2>
      </div>
      {/* Calls List */}
      <div className="overflow-y-auto flex-grow space-y-3 pr-2">
        {allCalls.length > 0 ? (
          allCalls.map((call) => (
            <CallCard
              key={call.id}
              call={call}
              getReviewBadgeClass={getReviewBadgeClass}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">No calls found.</div>
        )}
      </div>
    </div>
  );
}
