"use client"; // Required for state and event handlers

import AgentDetailSidebar from "@/components/AgentDetailSidebar"; // Verify path
import AllCallsView from "@/components/AllCallsView"; // Import AllCallsView
import DashboardView from "@/components/DashboardView"; // Import DashboardView
import TopBar from "@/components/TopBar"; // Import the new TopBar
import { CallWithAgentDetails } from "@/components/RecentCallsTable"; // Keep type import needed for data processing
import { AgentData, mockAgents } from "@/data/mockAgents"; // Import AgentData type
import { mockCalls } from "@/data/mockCalls";
import React, { useMemo, useState } from "react"; // Import useState, useMemo
import AgentsListView from "@/components/AgentsListView"; // Import the new view

// Define AgentStats here if not imported from a shared location
interface AgentStats {
  totalCalls: number;
  positive: number;
  neutral: number;
  negative: number;
  overallReview: string;
}

// Helper Functions needed in this component
const calculatePercentage = (count: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((count / total) * 100);
};

const getOverallReview = (stats: Omit<AgentStats, "overallReview">): string => {
  if (stats.totalCalls === 0) return "N/A";
  const positivePercent = calculatePercentage(stats.positive, stats.totalCalls);
  const negativePercent = calculatePercentage(stats.negative, stats.totalCalls);

  if (positivePercent >= 75 && negativePercent <= 10) return "Excellent";
  if (positivePercent >= 50 && negativePercent <= 25) return "Good";
  return "Needs Improvement";
};

const getReviewBadgeClass = (review: string): string => {
  switch (review) {
    case "Excellent":
      return "bg-green-200 text-green-900 dark:bg-green-700 dark:text-green-100";
    case "Good":
      return "bg-blue-200 text-blue-900 dark:bg-purple-700 dark:text-purple-100";
    case "Needs Improvement":
      return "bg-yellow-200 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-navy-600 dark:text-navy-100";
  }
};

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [currentView, setCurrentView] = useState<
    "dashboard" | "allCalls" | "agents"
  >("dashboard");

  const handleSelectAgent = (agent: AgentData) => {
    setSelectedAgent(agent);
  };

  const handleCloseAgentDetail = () => {
    setSelectedAgent(null);
  };

  const handleSetView = (view: "dashboard" | "allCalls" | "agents") => {
    setCurrentView(view);
  };

  // Calculate stats for the *selected* agent
  const selectedAgentStats = useMemo(() => {
    if (!selectedAgent) return null;

    const agentCalls = mockCalls.filter(
      (call) => call.agentId === selectedAgent.id
    );
    const stats: Omit<AgentStats, "overallReview"> = {
      totalCalls: agentCalls.length,
      positive: agentCalls.filter(
        (c) =>
          c.satisfaction === "Positive" || c.satisfaction === "Very Positive"
      ).length,
      neutral: agentCalls.filter((c) => c.satisfaction === "Neutral").length,
      negative: agentCalls.filter(
        (c) =>
          c.satisfaction === "Negative" || c.satisfaction === "Very Negative"
      ).length,
    };

    return {
      ...stats,
      overallReview: getOverallReview(stats),
    };
  }, [selectedAgent]); // Removed mockCalls dependency as it's stable

  // --- Combine Call and Agent Data ---
  const agentsMap = useMemo(() => {
    const map = new Map<string, AgentData>();
    mockAgents.forEach((agent) => map.set(agent.id, agent));
    return map;
  }, [mockAgents]);

  // Add agent details and a mock review to each call
  const callsWithAgentDetails: CallWithAgentDetails[] = useMemo(() => {
    return mockCalls
      .map((call) => {
        const agent = agentsMap.get(call.agentId);
        // Add explicit check although ?? handles it
        const agentName = agent ? agent.name : "Unknown Agent";
        const agentPhoneNumber = agent ? agent.phoneNumber : "N/A";
        const mockReview = agent
          ? agent.id.charCodeAt(0) % 3 === 0
            ? "Good"
            : agent.id.charCodeAt(0) % 3 === 1
            ? "Excellent"
            : "Needs Improvement"
          : "N/A";

        return {
          ...call,
          agentName: agentName,
          agentPhoneNumber: agentPhoneNumber,
          agentReview: mockReview,
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [mockCalls, agentsMap]);

  // Keep callsByDate calculation (unfiltered)
  const callsByDate = mockCalls.reduce((acc, call) => {
    const date = call.date;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const callsChartData = Object.entries(callsByDate)
    .map(([date, calls]) => ({ date, calls }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    // Main layout adjustment: Add padding-top for the fixed TopBar
    <main className="flex flex-col lg:flex-row min-h-screen bg-white ">
      {/* Use TopBar instead of NavigationSidebar */}
      <TopBar currentView={currentView} onSetView={handleSetView} />

      {/* Main Content Wrapper - Remove pl-28 (no vertical sidebar space needed) */}
      <div className="flex flex-col flex-1 p-8 sm:p-12 overflow-y-auto bg-[#1F2734]">
        {/* Header - Adjust or remove if title is now in TopBar or redundant */}
        {/* Option 1: Keep header for context (adjust pl if needed) */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex w-full items-center justify-center">
            {" "}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {currentView === "dashboard"
                ? "Dashboard"
                : currentView === "allCalls"
                ? "All Calls"
                : "Agents"}
            </h1>
          </div>
        </div>

        {/* Conditionally Render View Components - Remove pl-16 */}
        <div className="">
          {currentView === "dashboard" ? (
            <DashboardView
              callsChartData={callsChartData}
              allCallsWithAgentDetails={callsWithAgentDetails}
            />
          ) : currentView === "allCalls" ? (
            <AllCallsView allCalls={callsWithAgentDetails} />
          ) : (
            <AgentsListView
              agents={mockAgents}
              onAgentSelect={handleSelectAgent}
            />
          )}
        </div>
      </div>

      {/* Agent Detail Sidebar - Remains, should position itself relative to the viewport or main content area */}
      <AgentDetailSidebar
        agent={selectedAgent}
        agentStats={selectedAgentStats}
        onClose={handleCloseAgentDetail}
        getReviewBadgeClass={getReviewBadgeClass}
        calculatePercentage={calculatePercentage}
      />
    </main>
  );
}
