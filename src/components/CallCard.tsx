"use client";

import React, { useState } from 'react';
import { CallWithAgentDetails } from '@/components/RecentCallsTable'; // Adjust path if needed
import { formatDurationMMSS } from '@/utils/formatters';
import { FaUserCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CallCardProps {
  call: CallWithAgentDetails;
  getReviewBadgeClass: (review: string) => string;
}

const CallCard: React.FC<CallCardProps> = ({ call, getReviewBadgeClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border border-gray-700 rounded-lg bg-[#28303D] shadow-sm overflow-hidden">
      {/* Card Header (Clickable) */}
      <div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#333B48] transition-colors"
        onClick={toggleOpen}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <FaUserCircle className="text-gray-400 flex-shrink-0" size={24} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#8BAEE5] truncate" title={`Caller: ${call.callerNumber}`}>
              Caller: {call.callerNumber}
            </p>
            <p className="text-xs text-gray-400 truncate" title={`Agent: ${call.agentName}`}>
              Agent: {call.agentName}
            </p>
             <p className="text-xs text-gray-400 mt-0.5">{call.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0 pl-2">
           {/* Review Badge */}
           <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getReviewBadgeClass(
              call.agentReview
            )}`}
          >
            {call.agentReview}
          </span>
          {/* Chevron Icon */}
          {isOpen ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </div>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="border-t border-gray-700 p-4 bg-[#2D3645]">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm text-gray-300">
             <div><span className="font-medium text-gray-400">Duration:</span> {formatDurationMMSS(call.durationSeconds)}</div>
             <div><span className="font-medium text-gray-400">Direction:</span> {call.direction}</div>
             <div><span className="font-medium text-gray-400">Agent Phone:</span> {call.agentPhoneNumber}</div>
             {/* Add more metadata fields as needed */}
          </div>


          {/* Transcript */}
          <h4 className="text-md font-semibold mb-2 text-gray-200 border-b border-gray-600 pb-1">Transcript</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2 text-sm">
            {call.transcript && call.transcript.length > 0 ? (
              call.transcript.map((entry, index) => (
                <div key={index} className={`flex ${entry.speaker === 'Agent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[75%] ${
                      entry.speaker === 'Agent'
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-gray-600 text-gray-200'
                    }`}
                  >
                     <span className="font-semibold block text-xs mb-0.5 opacity-80">{entry.speaker}</span>
                    {entry.text}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">No transcript available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallCard; 