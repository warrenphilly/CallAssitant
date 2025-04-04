"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Helper function to format total seconds into Hh Mm Ss or Mm Ss
const formatTooltipDuration = (totalSeconds: number): string => {
  if (isNaN(totalSeconds) || totalSeconds < 0) return "0s";
  if (totalSeconds === 0) return "0s";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(" ");
};

interface DurationChartDataPoint {
  date: string;
  totalDurationSeconds: number;
}

interface CallTimePerDayChartProps {
  data: DurationChartDataPoint[];
}

export default function CallTimePerDayChart({
  data,
}: CallTimePerDayChartProps) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No duration data available for chart.
      </p>
    );
  }

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 shadow-lg rounded-md p-2 text-xs">
          <p className="label font-semibold text-gray-700">{`${label}`}</p>
          <p className="intro text-gray-600">
            {`Total Duration: ${formatTooltipDuration(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 h-80 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Total Call Time per Day
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} />
          <YAxis
            tickFormatter={(tick) => formatTooltipDuration(tick)}
            tick={{ fontSize: 10, fill: "#6b7280" }}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "10px",
              color: "#374151",
            }}
          />
          <Bar
            dataKey="totalDurationSeconds"
            fill="#4f46e5"
            name="Total Duration"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
