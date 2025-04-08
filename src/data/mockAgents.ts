export interface AgentData {
  id: string;
  name: string;
  phoneNumber: string;
  task: string;
  instructions?: string;
  review?: string;
  totalCalls?: number;
  positive?: number;
  neutral?: number;
  negative?: number;
  overallReview?: string;
  status?: string;
  // Add other relevant agent details here if needed
}

export const mockAgents: AgentData[] = [
  {
    id: "agent_01",
    name: "Alice Wonderland",
    phoneNumber: "555-0101",
    task: "Technical Support",
    instructions:
      "Focus on password resets and basic troubleshooting. Escalate hardware issues immediately to Tier 2.",
  },
  {
    id: "agent_02",
    name: "Bob The Builder",
    phoneNumber: "555-0102",
    task: "Appointments",
    instructions:
      "Confirm patient details before scheduling. Use booking system XYZ. Prioritize urgent requests.",
  },
  {
    id: "agent_03",
    name: "Charlie Chaplin",
    phoneNumber: "555-0103",
    task: "Billing & Transfers",
  },
  {
    id: "agent_04",
    name: "Diana Prince",
    phoneNumber: "555-0104",
    task: "General Inquiries",
    instructions:
      "Handle general questions about services. Direct specific queries to the relevant department (Support, Billing, Appointments). Be polite and professional.",
  },
  {
    id: "vapi_ai_agent",
    name: "AI Business Assistant (Vapi)",
    phoneNumber: "YOUR_VAPI_PHONE_NUMBER", // <-- Replace with your actual Vapi number
    task: "Provides Business Information",
    instructions:
      "Answers caller questions based on the configured business details (hours, services, location, etc.).",
    status: "Active", // You can set a status if needed
  },
];
