"use client";

import { AgentData } from "@/data/mockAgents";
import { CallData } from "@/data/mockCalls";
import React, { useMemo, useState } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import AddAgentForm from "./AddAgentForm";
import Modal from "./Modal";

interface AgentsTableProps {
  agents: AgentData[];
  callData: CallData[];
  onAgentSelect: (agent: AgentData) => void;
}

interface AgentStats {
  totalCalls: number;
  positive: number;
  neutral: number;
  negative: number;
  overallReview: string;
}

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
      return "bg-green-100 text-green-800";
    case "Good":
      return "bg-blue-100 text-blue-800";
    case "Needs Improvement":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
};

export default function AgentsTable({
  agents,
  callData,
  onAgentSelect,
}: AgentsTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const agentStats = useMemo(() => {
    const statsMap: Record<string, Omit<AgentStats, "overallReview">> = {};
    agents.forEach((agent) => {
      statsMap[agent.id] = {
        totalCalls: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
      };
    });
    callData.forEach((call) => {
      const agentId = call.agentId;
      if (statsMap[agentId]) {
        statsMap[agentId].totalCalls += 1;
        switch (call.satisfaction) {
          case "Very Positive":
          case "Positive":
            statsMap[agentId].positive += 1;
            break;
          case "Neutral":
            statsMap[agentId].neutral += 1;
            break;
          case "Negative":
          case "Very Negative":
            statsMap[agentId].negative += 1;
            break;
        }
      }
    });
    const finalStats: Record<string, AgentStats> = {};
    Object.keys(statsMap).forEach((agentId) => {
      const currentStats = statsMap[agentId];
      finalStats[agentId] = {
        ...currentStats,
        overallReview: getOverallReview(currentStats),
      };
    });
    return finalStats;
  }, [callData, agents]);

  const handleAddAgentClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddAgentSubmit = (formData: {
    name: string;
    phoneNumber: string;
    task: string;
  }) => {
    console.log("New Agent: ", formData);
    handleCloseModal();
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-xl font-semibold text-gray-700">Agents</h2>
        <button
          onClick={handleAddAgentClick}
          className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1.5 rounded-md text-sm transition-colors duration-150"
          aria-label="Add new agent"
        >
          <FaPlus />
          <span className="ml-1.5">Add Agent</span>
        </button>
      </div>

      <div className="overflow-y-auto flex-grow p-4 space-y-3">
        {agents.length === 0 ? (
          <p className="text-center text-sm text-gray-500 py-4">
            No agents available.
          </p>
        ) : (
          agents.map((agent) => {
            const stats = agentStats[agent.id] || {
              totalCalls: 0,
              positive: 0,
              neutral: 0,
              negative: 0,
              overallReview: "N/A",
            };

            return (
              <div
                key={agent.id}
                onClick={() => onAgentSelect(agent)}
                className="flex items-center p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-150 cursor-pointer shadow border border-gray-200"
                title={agent.name}
              >
                <div className="mr-3 flex-shrink-0">
                  <FaUserCircle size={28} color="#6b7280" />
                </div>

                <div className="flex-grow min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {agent.name}
                  </p>
                </div>

                <span
                  className={`ml-3 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${getReviewBadgeClass(
                    stats.overallReview
                  )}`}
                >
                  {stats.overallReview}
                </span>
              </div>
            );
          })
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Agent"
      >
        <AddAgentForm
          onSubmit={handleAddAgentSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
