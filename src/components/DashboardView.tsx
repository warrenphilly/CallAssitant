"use client";

import AnalyticsSummary from "@/components/AnalyticsSummary";
import CallsPerDayChart from "@/components/CallsPerDayChart";
import RecentCallsTable, {
  CallWithAgentDetails,
} from "@/components/RecentCallsTable";
import React from "react";

interface DashboardViewProps {
  // Analytics Data
  totalCalls: number;
  averageDuration: string;
  totalDuration: string;
  overallSatisfaction: string;
  // Chart Data
  callsChartData: { date: string; calls: number }[];
  // Recent Calls Data (limited)
  recentCalls: CallWithAgentDetails[];
}

export default function DashboardView({
  totalCalls,
  averageDuration,
  totalDuration,
  overallSatisfaction,
  callsChartData,
  recentCalls,
}: DashboardViewProps) {
  return (
    <div>
      {/* Analytics Row & Charts Column Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Analytics Column */}
        <div className="mb-0 md:mb-8 h-full flex flex-col">
          <AnalyticsSummary
            totalCalls={totalCalls}
            averageDuration={averageDuration}
            totalDuration={totalDuration}
            overallSatisfaction={overallSatisfaction}
          />
        </div>

        {/* Charts Column - only CallsPerDayChart */}
       
          <CallsPerDayChart data={callsChartData} />
       
      </div>

      {/* Recent Calls Section - Spanning full width below */}
      <div className="mb-8 bg-white rounded-xl flex flex-col items-stretch p-4 h-[calc(50vh)]">
        {/* Header - Button Removed */}
        <div className="flex justify-between items-center mb-4 px-2 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-700">Recent Calls</h2>
          {/* Removed All Calls Button */}
        </div>
        {/* Call List - Use recentCalls prop */}
        <RecentCallsTable calls={recentCalls} />
      </div>
    </div>
  );
}
