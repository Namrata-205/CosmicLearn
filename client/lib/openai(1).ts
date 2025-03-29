import { apiRequest } from "./queryClient";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

interface CalendarResponse {
  days: Array<{
    date: number;
    events: Array<{
      type: "lecture" | "assignment" | "quiz";
    }>;
  }>;
  events: Array<{
    title: string;
    description: string;
    time: string;
    type: "lecture" | "assignment" | "quiz";
  }>;
}

interface AIAssistantResponse {
  response: string;
}

interface MindMapResponse {
  nodes: Array<{
    id: string;
    label: string;
  }>;
  edges: Array<{
    source: string;
    target: string;
  }>;
}

interface SummaryResponse {
  keyPoints: string[];
  summary: string;
}

interface HintResponse {
  hint: string;
  explanation: string;
}

interface QuizResponse {
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
}

export async function getAIGeneratedCalendar(): Promise<CalendarResponse> {
  const response = await apiRequest(
    "POST",
    "/api/ai/calendar",
    { studentId: 1 }
  );
  return response.json();
}

export async function askAIAssistant(question: string): Promise<AIAssistantResponse> {
  try {
    const response = await apiRequest(
      "POST",
      "/api/ai/assistant",
      { question }
    );
    
    // Our server now handles API failures gracefully and returns 200
    // with a message instead of throwing an error
    const data = await response.json();
    
    // No need to check for API key issues anymore as we're providing generic responses
    
    return data;
  } catch (error) {
    console.error("Error in askAIAssistant:", error);
    
    // Return a user-friendly error message
    return {
      response: "I'm having trouble connecting to my knowledge base. Please check your internet connection and try again."
    };
  }
}

export async function generateMindMap(lectureId: number): Promise<MindMapResponse> {
  const response = await apiRequest(
    "POST",
    "/api/ai/mindmap",
    { lectureId }
  );
  return response.json();
}

export async function summarizeLecture(lectureId: number): Promise<SummaryResponse> {
  const response = await apiRequest(
    "POST",
    "/api/ai/summarize",
    { lectureId }
  );
  return response.json();
}

export async function getAssignmentHint(assignmentId: number, questionId: number): Promise<HintResponse> {
  const response = await apiRequest(
    "POST",
    "/api/ai/hint",
    { assignmentId, questionId }
  );
  return response.json();
}

export async function generateQuiz(documentIds: number[]): Promise<QuizResponse> {
  const response = await apiRequest(
    "POST",
    "/api/ai/generate-quiz",
    { documentIds }
  );
  return response.json();
}

export async function checkPlagiarism(submissionId: number): Promise<{ score: number }> {
  const response = await apiRequest(
    "POST",
    "/api/ai/plagiarism-check",
    { submissionId }
  );
  return response.json();
}

export async function getSuggestions(studentIds: number[]): Promise<{ suggestions: string[] }> {
  const response = await apiRequest(
    "POST",
    "/api/ai/suggestions",
    { studentIds }
  );
  return response.json();
}
