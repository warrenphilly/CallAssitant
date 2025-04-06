"use client";

import React from "react";
import * as Recharts from "recharts";

interface ChartDataPoint {
  date: string;
  calls: number;
}

interface CallsPerDayChartProps {
  data: ChartDataPoint[];
}

export default function CallsPerDayChart({ data }: CallsPerDayChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[#333B48] shadow-lg rounded-xl p-4 sm:p-6 h-80  flex flex-col">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 flex-shrink-0 text-white">
          Calls per Day
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
    <div className="bg-[#333B48] shadow-lg rounded-xl p-4 sm:p-6 h-80  flex flex-col">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex-shrink-0 text-white">
        Calls per Day
      </h3>
      <div className="flex-grow">
        <Recharts.ResponsiveContainer width="100%" height="100%">
          <Recharts.LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <Recharts.CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <Recharts.XAxis
              dataKey="date"
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
              stroke="#8b5cf6"
              strokeWidth={2}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
              name="Number of Calls"
              connectNulls
            />
          </Recharts.LineChart>
        </Recharts.ResponsiveContainer>
      </div>
    </div>
  );
}
