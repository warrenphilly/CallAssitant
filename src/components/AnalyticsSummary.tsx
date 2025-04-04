interface AnalyticsProps {
  totalCalls: number;
  averageDuration: string;
  totalDuration: string;
  overallSatisfaction: string;
}

// Helper function to create individual stat cards - Adjusted colors
const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-slate-50 shadow rounded-lg p-4 text-center flex flex-col justify-center min-h-[130px]  border border-gray-200">
    <dt className="text-sm font-medium text-gray-500 truncate mb-1">{title}</dt>
    <dd className="text-2xl font-semibold text-gray-800">{value}</dd>
  </div>
);

export default function AnalyticsSummary({
  totalCalls,
  averageDuration,
  totalDuration,
  overallSatisfaction,
}: AnalyticsProps) {
  return (
    <div className="mb-8 h-full">
      <dl className="grid grid-cols-2 gap-4 h-full">
        <StatCard title="Total Calls" value={totalCalls} />
        <StatCard title="Avg. Call Duration" value={averageDuration} />
        <StatCard title="Total Call Time" value={totalDuration} />
        <StatCard title="Overall Satisfaction" value={overallSatisfaction} />
      </dl>
    </div>
  );
}
