"use client";

import { CallWithAgentDetails } from "@/components/RecentCallsTable";
import React, { useMemo } from "react";
import * as Recharts from "recharts";

// Helper: Get start of week (copied from DashboardView, ideally move to utils)
const getStartOfWeek = (date: Date): Date => {
  const d = new Date(date); // Create a copy
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, ...
  const diff = d.getDate() - day; // Subtract day index to get Sunday
  return new Date(d.setDate(diff));
};

// Helper: Get all weeks (start dates as YYYY-MM-DD) that overlap with a given month
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllWeeksInMonth = (year: number, month: number): string[] => {
  const weeks: string[] = [];
  const firstOfMonth = new Date(year, month, 1);
  const lastOfMonth = new Date(year, month + 1, 0);

  const currentWeekStart = getStartOfWeek(new Date(firstOfMonth));

  while (currentWeekStart <= lastOfMonth) {
    weeks.push(currentWeekStart.toISOString().split("T")[0]);
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeks;
};

interface ChartDataPoint {
  label: string;
  calls: number;
  sortKey?: string | number;
}

interface CallsPerDayChartProps {
  calls: CallWithAgentDetails[];
  mode: "day" | "week" | "month" | "year" | "all";

  selectedDateString: string;
}

// Helper to format chart axis labels
const formatAxisLabel = (value: string | number): string => {
  // Placeholder - adjust formatting as needed based on aggregation level
  return String(value);
};

export default function CallsPerDayChart({
  calls,
  mode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectedDateString,
}: CallsPerDayChartProps) {
  const aggregatedData = useMemo((): ChartDataPoint[] => {
    if (!calls) return [];

    // --- Aggregation Logic ---
    const aggregated: Record<string, number> = {};

    if (mode === "day") {
      // Day mode: Show total for the day (Hourly not possible with current data)
      if (calls.length > 0) {
        const dayLabel = new Date(
          calls[0].date + "T00:00:00"
        ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return [
          { label: `${dayLabel} (Total)`, calls: calls.length, sortKey: 1 },
        ];
      } else {
        return [];
      }
    }

    calls.forEach((call) => {
      const callDate = new Date(call.date + "T00:00:00");
      let key = "";
      let sortKey: string | number | undefined = undefined;

      if (mode === "all" || mode === "week") {
        // Daily aggregation for week/all
        key = call.date; // YYYY-MM-DD
        sortKey = call.date;
      } else if (mode === "month") {
        // Weekly aggregation for month
        const startOfWeek = getStartOfWeek(callDate);
        key = startOfWeek.toISOString().split("T")[0]; // YYYY-MM-DD (start of week)
        sortKey = key;
      } else if (mode === "year") {
        // Monthly aggregation for year
        key = `${callDate.getFullYear()}-${(callDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`; // YYYY-MM
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sortKey = key; // Keep track for sorting later if needed, even if label changes
      }

      if (key) {
        aggregated[key] = (aggregated[key] || 0) + 1;
      }
    });

    // Format for Recharts
    return Object.entries(aggregated)
      .map(([key, count]) => {
        let label = key;
        let sortKey: string | number = key;
        // Format label based on mode
        if (mode === "all" || mode === "week") {
          const date = new Date(key + "T00:00:00");
          label = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "numeric",
            day: "numeric",
          }); // e.g., Mon 4/1
          sortKey = key; // Keep YYYY-MM-DD for sorting
        } else if (mode === "month") {
          const startDate = new Date(key + "T00:00:00");
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
          label = `Week of ${startDate.toLocaleDateString("en-US", {
            month: "numeric",
            day: "numeric",
          })}`; // e.g., Week of 4/1
          sortKey = key; // Keep YYYY-MM-DD for sorting
        } else if (mode === "year") {
          const date = new Date(`${key}-01T00:00:00`); // Need a day for Date parsing
          label = date.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          }); // e.g., Apr 2024
          sortKey = key; // Keep YYYY-MM for sorting
        }

        return { label, calls: count, sortKey };
      })
      .sort((a, b) => {
        if (a.sortKey < b.sortKey) return -1;
        if (a.sortKey > b.sortKey) return 1;
        return 0;
      });
  }, [calls, mode]);

  const chartTitle = useMemo(() => {
    switch (mode) {
      case "day":
        return "Calls for the Day";
      case "week":
        return "Calls per Day";
      case "month":
        return "Calls per Week";
      case "year":
        return "Calls per Month";
      case "all":
        return "Calls per Day (All Time)";
      default:
        return "Calls";
    }
  }, [mode]);

  if (!aggregatedData || aggregatedData.length === 0) {
    return (
      <div className="bg-[#344743] shadow-lg rounded-xl p-4 sm:p-6 h-80  flex flex-col">
        <h3 className="text-lg font-semibold mb-4 flex-shrink-0 text-white">
          {chartTitle}
        </h3>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-center text-gray-500">
            No call data available for this period.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#344743] shadow-lg rounded-xl p-4 sm:p-6 h-80  flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex-shrink-0 text-white">
        {chartTitle}
      </h3>
      <div className="flex-grow">
        <Recharts.ResponsiveContainer width="100%" height="100%">
          <Recharts.LineChart
            data={aggregatedData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <Recharts.CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <Recharts.XAxis
              dataKey="label"
              tickFormatter={formatAxisLabel}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <Recharts.YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              width={30}
            />
            <Recharts.Tooltip
              wrapperStyle={{ fontSize: "12px" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
              }}
              itemStyle={{ color: "#374151" }}
            />
            <Recharts.Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            />
            <Recharts.Line
              type="monotone"
              dataKey="calls"
              stroke="#A0ECA8"
              strokeWidth={2}
              name="Number of Calls"
              dot={false}
            />
          </Recharts.LineChart>
        </Recharts.ResponsiveContainer>
      </div>
    </div>
  );
}
