"use client";

import AnalyticsSummary from "@/components/AnalyticsSummary";
import CallsPerDayChart from "@/components/CallsPerDayChart";
import RecentCallsTable, {
  CallWithAgentDetails,
} from "@/components/RecentCallsTable";
import React, { useCallback, useMemo, useState } from "react";

// Assume formatters are imported or defined here/globally if needed by AnalyticsSummary
import { formatDurationMMSS } from "@/utils/formatters";

interface DashboardViewProps {
  // Analytics Data (Original totals might still be needed, or pass all calls data)
  // totalCalls: number;
  // averageDuration: string;
  // totalDuration: string;
  // overallSatisfaction: string;

  // Chart Data (unfiltered)
  callsChartData: { date: string; calls: number }[];

  // Pass all calls data for filtering analytics and recent calls within this component
  allCallsWithAgentDetails: CallWithAgentDetails[];
}

// Keep local formatTotalDuration helper
const formatTotalDuration = (totalSeconds: number): string => {
  if (totalSeconds === 0) return "0s";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
};

// Helper function to get the start of the week (assuming Sunday as start)
const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = date.getDate() - day; // Subtract day index to get Sunday
  return new Date(date.setDate(diff));
};

// Updated helper to format date/period based on filter mode
const formatDateForDisplay = (
  dateString: string, // Expects YYYY-MM-DD
  mode: "day" | "week" | "month" | "year" | "all"
): string => {
  if (mode === "all") return "All Time";
  // Add time part to avoid timezone issues with UTC conversion affecting the date
  const date = new Date(dateString + "T00:00:00");
  if (isNaN(date.getTime())) return "Invalid Date"; // Basic check

  if (mode === "day")
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  if (mode === "week") {
    const startOfWeek = getStartOfWeek(new Date(date)); // Recalculate start to be safe
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return `${startOfWeek.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endOfWeek.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }

  if (mode === "month")
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });

  if (mode === "year") return date.getFullYear().toString();

  return dateString; // Fallback
};

// Remove unused helpers for input element
// const getFilterInputType = (...) => { ... };
// const formatValueForInput = (...) => { ... };
// const parseInputToDateString = (...) => { ... };

export default function DashboardView({
  callsChartData,
  allCallsWithAgentDetails,
}: DashboardViewProps) {
  // Update filterMode state type
  const [filterMode, setFilterMode] = useState<
    "day" | "week" | "month" | "year" | "all" // Add 'week'
  >("all");
  // selectedDateString represents the specific day, or the first day of the week/month/year for filtering
  const [selectedDateString, setSelectedDateString] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    const currentDate = new Date(selectedDateString + "T00:00:00");
    if (filterMode === "day") {
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (filterMode === "week") {
      currentDate.setDate(currentDate.getDate() - 7);
    } else if (filterMode === "month") {
      currentDate.setMonth(currentDate.getMonth() - 1);
    } else if (filterMode === "year") {
      currentDate.setFullYear(currentDate.getFullYear() - 1);
    }
    setSelectedDateString(currentDate.toISOString().split("T")[0]);
  }, [selectedDateString, filterMode]);

  const handleNext = useCallback(() => {
    const currentDate = new Date(selectedDateString + "T00:00:00");
    if (filterMode === "day") {
      currentDate.setDate(currentDate.getDate() + 1);
    } else if (filterMode === "week") {
      currentDate.setDate(currentDate.getDate() + 7);
    } else if (filterMode === "month") {
      // Correctly handle month rollover
      currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (filterMode === "year") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    setSelectedDateString(currentDate.toISOString().split("T")[0]);
  }, [selectedDateString, filterMode]);

  // Filter calls based on selected date/period
  const filteredCalls = useMemo(() => {
    if (filterMode === "all") return allCallsWithAgentDetails;

    const selectedDateObj = new Date(selectedDateString + "T00:00:00");
    const selectedYear = selectedDateObj.getFullYear();
    const selectedMonth = selectedDateObj.getMonth();
    const selectedDay = selectedDateObj.getDate();

    // For week filtering
    let weekStart: Date | null = null;
    let weekEnd: Date | null = null;
    if (filterMode === "week") {
      weekStart = getStartOfWeek(new Date(selectedDateObj)); // Get Sunday
      weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6); // Get Saturday
    }

    return allCallsWithAgentDetails.filter((call) => {
      const callDateObj = new Date(call.date + "T00:00:00");
      const callTime = callDateObj.getTime();
      const callYear = callDateObj.getFullYear();
      const callMonth = callDateObj.getMonth();
      const callDay = callDateObj.getDate();

      if (
        filterMode === "day" &&
        callYear === selectedYear &&
        callMonth === selectedMonth &&
        callDay === selectedDay
      )
        return true;
      // Add week filter logic
      if (
        filterMode === "week" &&
        weekStart &&
        weekEnd &&
        callTime >= weekStart.getTime() &&
        callTime <= weekEnd.getTime()
      )
        return true;
      if (
        filterMode === "month" &&
        callYear === selectedYear &&
        callMonth === selectedMonth
      )
        return true;
      if (filterMode === "year" && callYear === selectedYear) return true;
      return false;
    });
  }, [filterMode, selectedDateString, allCallsWithAgentDetails]);

  // Filter chart data based on selected date/period
  const filteredChartData = useMemo(() => {
    if (filterMode === "all") return callsChartData; // Return original aggregated data if 'All'

    // If filtering by Year, Month or Week, re-aggregate the *filtered calls*
    if (
      filterMode === "year" ||
      filterMode === "month" ||
      filterMode === "week"
    ) {
      const dailyCounts = filteredCalls.reduce((acc, call) => {
        acc[call.date] = (acc[call.date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      // Ensure the chart always shows dates within the selected range, even if they have 0 calls
      const results = Object.entries(dailyCounts)
        .map(([date, calls]) => ({ date, calls }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

      // For week/month/year, ensure all relevant dates within the filtered range are present for the chart.
      // This part could be expanded to fill gaps if needed, but for now just returns filtered dates.
      return results;
    }

    // If filtering by Day, find the specific day's pre-aggregated data (if available)
    // Or just return the count from filteredCalls for that day
    if (filterMode === "day") {
      // Use filteredCalls which already contains only calls for the selected day
      const count = filteredCalls.length;
      return count > 0 ? [{ date: selectedDateString, calls: count }] : [];
      // Original logic using pre-aggregated data:
      // const dayData = callsChartData.find((d) => d.date === selectedDateString);
      // return dayData ? [dayData] : [];
    }

    return []; // Should not reach here
  }, [filterMode, selectedDateString, callsChartData, filteredCalls]);

  // Calculate analytics based on filtered calls
  const filteredAnalytics = useMemo(() => {
    const callsToAnalyze = filteredCalls;
    const totalCalls = callsToAnalyze.length;
    const totalDurationSeconds = callsToAnalyze.reduce(
      (sum, call) => sum + call.durationSeconds,
      0
    );
    const averageDurationSeconds =
      totalCalls > 0 ? totalDurationSeconds / totalCalls : 0;
    const positiveCalls = callsToAnalyze.filter(
      (c) => c.satisfaction === "Positive" || c.satisfaction === "Very Positive"
    ).length;
    const negativeCalls = callsToAnalyze.filter(
      (c) => c.satisfaction === "Negative" || c.satisfaction === "Very Negative"
    ).length;
    const positivePercent =
      totalCalls > 0 ? Math.round((positiveCalls / totalCalls) * 100) : 0;
    const negativePercent =
      totalCalls > 0 ? Math.round((negativeCalls / totalCalls) * 100) : 0;

    return {
      totalCalls,
      averageDuration: averageDurationSeconds,
      totalDuration: totalDurationSeconds,
      positivePercent,
      negativePercent,
    };
  }, [filteredCalls]);

  // Helper for button styling
  const getButtonClass = (mode: typeof filterMode) => {
    return `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      filterMode === mode
        ? "bg-[#74A1E2] text-white"
        : "bg-[#4B515C] text-white hover:bg-gray-300"
    }`;
  };

  return (
    <div>
      {/* --- Filter Controls --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 bg-[#1F2734] rounded-lg shadow ">
        {/* Mode Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-white mr-2">
            Filter By:
          </span>
          <button
            className={`${getButtonClass("all")} bg-[#333B48]`}
            onClick={() => setFilterMode("all")}
          >
            All
          </button>
          <button
            className={`${getButtonClass("year")} bg-[#4B515C]`}
            onClick={() => setFilterMode("year")}
          >
            Year
          </button>
          <button
            className={`${getButtonClass("month")} bg-[#4B515C]`}

            onClick={() => setFilterMode("month")}
          >
            Month
          </button>
          <button
            className={`${getButtonClass("week")} bg-[#4B515C]`}
            onClick={() => setFilterMode("week")}
          >
            Week
          </button>
          <button
            className={`${getButtonClass("day")} bg-[#4B515C]`}
            onClick={() => setFilterMode("day")}
          >
            Day
          </button>
        </div>

        {/* Navigation Controls */}
        <div
          className={`flex items-center gap-2 ${
            filterMode === "all" ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <button
            onClick={handlePrevious}
            disabled={filterMode === "all"}
            className="p-2 rounded-full text-[#74A1E2] bg-[#4B515C] hover:bg-gray-200 disabled:opacity-50"
            aria-label="Previous Period"
          >
            {/* SVG for Previous */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <span className="text-center font-medium text-[#74A1E2] min-w-[180px]">
            {formatDateForDisplay(selectedDateString, filterMode)}
          </span>

          <button
            onClick={handleNext}
            disabled={filterMode === "all"}
            className="p-2 rounded-full text-[#74A1E2] bg-[#4B515C] hover:bg-gray-200 disabled:opacity-50"
            aria-label="Next Period"
          >
            {/* SVG for Next */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Analytics Row & Charts Column Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Analytics Column - Pass filtered analytics */}
        <div className="mb-0 md:mb-8 h-full flex flex-col">
          <AnalyticsSummary
            totalCalls={filteredAnalytics.totalCalls}
            averageDuration={formatDurationMMSS(
              filteredAnalytics.averageDuration
            )}
            totalDuration={formatTotalDuration(filteredAnalytics.totalDuration)}
            overallSatisfaction={`${filteredAnalytics.positivePercent}% Pos / ${filteredAnalytics.negativePercent}% Neg`}
          />
        </div>

        {/* Charts Column - Pass filtered chart data */}
       
          <CallsPerDayChart data={filteredChartData} />
        
      </div>

      {/* Recent Calls Section - Pass filtered calls */}
      <div className="mb-8 bg-[#1F2734] rounded-xl shadow flex flex-col items-stretch p-4 h-[calc(50vh)]">
        <div className="flex justify-between items-center mb-4 px-2 flex-shrink-0">
          <h2 className="text-xl font-semibold text-white">
            {filterMode === "all"
              ? "Recent Calls"
              : `Calls for ${formatDateForDisplay(
                  selectedDateString,
                  filterMode
                )}`}
          </h2>
        </div>
        <RecentCallsTable calls={filteredCalls} />
      </div>
    </div>
  );
}
