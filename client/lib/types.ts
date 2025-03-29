export interface CalendarDay {
  date: number;
  events: CalendarEvent[];
}

export interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: "lecture" | "assignment" | "quiz" | "other";
}

export interface Course {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  completionDate?: string;
  progress?: number;
}

export interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

export interface RevisionTask {
  id: number;
  subject: string;
  topic: string;
  description: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  deadline: string;
  submitted: boolean;
  checked: boolean;
  plagiarismScore?: number;
  subjectId: number;
  studentId: number;
}

export interface Submission {
  id: number;
  assignmentId: number;
  studentId: number;
  content: string;
  submittedAt: string;
  plagiarismScore?: number;
}

export interface StudentPerformance {
  id: number;
  name: string;
  avatar?: string;
  grades: {
    subjectId: number;
    subjectName: string;
    score: number;
    grade: string;
  }[];
  attendance: number;
  participation: number;
  overallRating: number;
}

export interface Document {
  id: number;
  title: string;
  type: string;
  tags: string[];
  uploadedAt: string;
  teacherId: number;
  subjectId: number;
}

export interface MindMap {
  id: number;
  lectureId: number;
  nodes: {
    id: string;
    label: string;
    x?: number;
    y?: number;
  }[];
  edges: {
    source: string;
    target: string;
  }[];
}

export interface Quiz {
  id: number;
  title: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  documentIds: number[];
}
