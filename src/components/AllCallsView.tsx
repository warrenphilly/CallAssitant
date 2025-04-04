"use client";

import { CallWithAgentDetails } from "@/components/RecentCallsTable"; // Reuse the combined type
import { formatDurationMMSS } from "@/utils/formatters";
import React from "react";
import { FaChevronLeft, FaUserCircle } from "react-icons/fa";

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
    <div className="bg-white rounded-xl shadow flex flex-col items-stretch p-4 h-[calc(80vh)]">
      {" "}
      {/* Example Height */}
      {/* Header - Button Removed */}
      <div className="flex justify-between items-center mb-4 px-2 flex-shrink-0 border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-700">All Calls</h2>
      </div>
      {/* Calls Table/List */}
      <div className="overflow-y-auto flex-grow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            {" "}
            {/* Sticky Header */}
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Agent
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Caller
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Duration
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Review
              </th>
              {/* Add more columns if needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allCalls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800 flex items-center">
                  <FaUserCircle className="mr-2 text-gray-400" size={20} />
                  {call.agentName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {call.callerNumber}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {call.date}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 tabular-nums">
                  {formatDurationMMSS(call.durationSeconds)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-center text-sm">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getReviewBadgeClass(
                      call.agentReview
                    )}`}
                  >
                    {call.agentReview}
                  </span>
                </td>
                {/* Add onClick to row or a details button if needed */}
              </tr>
            ))}
            {allCalls.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-500">
                  No calls found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
