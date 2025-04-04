"use client";

import React, { useState } from "react";

interface AddAgentFormProps {
  onSubmit: (formData: {
    name: string;
    phoneNumber: string;
    task: string;
  }) => void;
  onCancel: () => void;
}

export default function AddAgentForm({
  onSubmit,
  onCancel,
}: AddAgentFormProps) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation (can be enhanced)
    if (!name || !phoneNumber || !task) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ name, phoneNumber, task });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="agentName"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Agent Name
        </label>
        <input
          type="text"
          id="agentName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="agentPhone"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Phone Number
        </label>
        <input
          type="tel" // Use type="tel" for phone numbers
          id="agentPhone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., 555-0105"
          required
        />
      </div>
      <div>
        <label
          htmlFor="agentTask"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Task / Specialization
        </label>
        <input
          type="text"
          id="agentTask"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="e.g., Sales Support"
          required
        />
      </div>
      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button" // Important: type="button" to prevent form submission
          onClick={onCancel}
          className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Add Agent
        </button>
      </div>
    </form>
  );
}
