export interface ChatMessage {
  speaker: "Agent" | "Caller";
  text: string;
}

type SatisfactionRating =
  | "Very Positive"
  | "Positive"
  | "Neutral"
  | "Negative"
  | "Very Negative";

export interface CallData {
  id: string;
  agentId: string;
  callerNumber: string;
  transcriptSnippet: string;
  durationSeconds: number;
  chatMessages: ChatMessage[];
  notes?: string;
  date: string;
  satisfaction: SatisfactionRating;
}

export const mockCalls: CallData[] = [
  {
    id: "call_001",
    agentId: "agent_01",
    callerNumber: "555-1234",
    transcriptSnippet: "Hello, thank you for calling Tech Support...",
    durationSeconds: 125,
    chatMessages: [
      {
        speaker: "Agent",
        text: "Hello, thank you for calling Tech Support. My name is Alex. How can I help you today?",
      },
      {
        speaker: "Caller",
        text: "Hi Alex, I need help resetting my password.",
      },
      {
        speaker: "Agent",
        text: "Yes, I can help with that. Can you please provide your username?",
      },
    ],
    notes:
      "User needed password reset for account 'johndoe'. Provided username and reset link sent.",
    date: "2024-07-28",
    satisfaction: "Positive",
  },
  {
    id: "call_002",
    agentId: "agent_02",
    callerNumber: "555-5678",
    transcriptSnippet: "Hi, I'd like to schedule an appointment...",
    durationSeconds: 80,
    chatMessages: [
      {
        speaker: "Caller",
        text: "Hi, I'd like to schedule an appointment for a check-up.",
      },
      {
        speaker: "Agent",
        text: "Certainly. Are there any specific days or times that work best for you?",
      },
      { speaker: "Caller", text: "How about next Tuesday afternoon?" },
      {
        speaker: "Agent",
        text: "We have an opening at 3 PM next Tuesday. Would that work?",
      },
      { speaker: "Caller", text: "Okay, 3 PM works for me. Thank you!" },
    ],
    date: "2024-07-28",
    satisfaction: "Very Positive",
  },
  {
    id: "call_003",
    agentId: "agent_01",
    callerNumber: "555-9876",
    transcriptSnippet: "Yes, my order number is 12345. I need to...",
    durationSeconds: 240,
    chatMessages: [
      {
        speaker: "Caller",
        text: "Yes, my order number is 12345. I need to inquire about the shipping status.",
      },
      {
        speaker: "Agent",
        text: "I can check that for you. One moment please...",
      },
      {
        speaker: "Caller",
        text: "It was supposed to arrive yesterday... Can you check on that for me please? It's quite urgent.",
      },
      {
        speaker: "Agent",
        text: "I see the tracking information here. It shows a delay due to weather. Expected delivery is now tomorrow.",
      },
    ],
    notes:
      "Caller inquired about delayed order #12345. Informed about weather delay, new ETA tomorrow.",
    date: "2024-07-29",
    satisfaction: "Neutral",
  },
  {
    id: "call_004",
    agentId: "agent_03",
    callerNumber: "555-4321",
    transcriptSnippet: "Could you please transfer me to billing?",
    durationSeconds: 45,
    chatMessages: [
      {
        speaker: "Caller",
        text: "Could you please transfer me to billing? I have a question about my last invoice.",
      },
      {
        speaker: "Agent",
        text: "Of course. Please hold while I transfer you.",
      },
      { speaker: "Caller", text: "Thank you... Holding now." },
    ],
    notes: "Transferred caller to billing department for invoice query.",
    date: "2024-07-29",
    satisfaction: "Positive",
  },
  {
    id: "call_005",
    agentId: "agent_04",
    callerNumber: "555-1122",
    transcriptSnippet: "I'm calling about the job posting I saw online...",
    durationSeconds: 310,
    chatMessages: [
      {
        speaker: "Caller",
        text: "I'm calling about the job posting I saw online for the software engineer position. Is it still open?",
      },
      {
        speaker: "Agent",
        text: "Yes, that position is still open and accepting applications.",
      },
      {
        speaker: "Caller",
        text: "Great, I'd like to submit my application. What is the process?",
      },
      {
        speaker: "Agent",
        text: "You can apply directly through the careers page on our website. There is a link in the job description.",
      },
    ],
    date: "2024-07-30",
    satisfaction: "Positive",
  },
  {
    id: "call_006",
    agentId: "agent_03",
    callerNumber: "555-3344",
    transcriptSnippet: "Is this the main office? I need to speak to...",
    durationSeconds: 95,
    chatMessages: [
      {
        speaker: "Caller",
        text: "Is this the main office? I need to speak to someone in the HR department regarding my benefits package...",
      },
      {
        speaker: "Agent",
        text: "Yes, this is the main line. Let me connect you to HR. Please hold.",
      },
      { speaker: "Caller", text: "Yes, I can hold." },
    ],
    notes: "Caller requesting HR for benefits info. Transferred.",
    date: "2024-07-30",
    satisfaction: "Neutral",
  },
  {
    id: "call_007",
    agentId: "agent_01",
    callerNumber: "555-5566",
    transcriptSnippet: "My internet is down again...",
    durationSeconds: 180,
    chatMessages: [
      {
        speaker: "Caller",
        text: "My internet is down again. This is the third time this week.",
      },
      {
        speaker: "Agent",
        text: "I apologize for the recurring issue. Let me check your connection status.",
      },
      { speaker: "Caller", text: "Can you please escalate this issue?" },
      {
        speaker: "Agent",
        text: "Yes, I see the previous reports. I will escalate this to our network team immediately.",
      },
    ],
    notes:
      "Recurring internet outage. Escalated to network team. Ticket #INC00987.",
    date: "2024-07-29",
    satisfaction: "Negative",
  },
  {
    id: "call_008",
    agentId: "agent_04",
    callerNumber: "555-7788",
    transcriptSnippet: "I want to confirm my flight details...",
    durationSeconds: 60,
    chatMessages: [
      {
        speaker: "Caller",
        text: "I want to confirm my flight details for booking reference XYZ789.",
      },
      { speaker: "Agent", text: "Certainly, let me pull up that booking." },
      { speaker: "Caller", text: "Is everything on schedule?" },
      {
        speaker: "Agent",
        text: "Yes, flight BA123 is currently scheduled for on-time departure.",
      },
    ],
    date: "2024-07-30",
    satisfaction: "Very Positive",
  },
  {
    id: "call_009",
    agentId: "agent_02",
    callerNumber: "555-9900",
    transcriptSnippet: "Can I change my appointment time?",
    durationSeconds: 70,
    chatMessages: [
      {
        speaker: "Caller",
        text: "Can I change my appointment time?",
      },
      {
        speaker: "Agent",
        text: "Of course, I can help with that. What time would you like to reschedule to?",
      },
      { speaker: "Caller", text: "How about 4 PM?" },
      {
        speaker: "Agent",
        text: "That works. I'll update your appointment. Thank you for letting me know!",
      },
    ],
    date: "2024-07-30",
    satisfaction: "Positive",
  },
];
