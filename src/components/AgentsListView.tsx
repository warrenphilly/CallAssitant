import React from 'react';
import { AgentData } from '@/data/mockAgents'; // Import AgentData type
import { FaUserCircle } from 'react-icons/fa'; // Example icon

interface AgentsListViewProps {
  agents: AgentData[];
  onAgentSelect: (agent: AgentData) => void;
}

const AgentsListView: React.FC<AgentsListViewProps> = ({ agents, onAgentSelect }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">Agents</h2>
      <ul className="space-y-3">
        {agents.map((agent) => (
          <li
            key={agent.id}
            onClick={() => onAgentSelect(agent)}
            className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-150"
          >
            <FaUserCircle className="w-8 h-8 text-gray-400 mr-3 flex-shrink-0" />
            <div className="flex-grow">
              <p className="font-medium text-white">{agent.name}</p>
              <p className="text-sm text-gray-400">{agent.phoneNumber}</p>
            </div>
            {/* Optional: Add a small indicator or chevron */}
            {/* <FaChevronRight className="w-4 h-4 text-gray-500" /> */}
          </li>
        ))}
      </ul>
      {agents.length === 0 && (
        <p className="text-gray-500 text-center py-4">No agents found.</p>
      )}
    </div>
  );
};

export default AgentsListView; 