import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertSubjectSchema, 
  insertLectureSchema, 
  insertAssignmentSchema, 
  insertSubmissionSchema, 
  insertDocumentSchema, 
  insertStudentProgressSchema, 
  insertLearningRoadmapSchema, 
  insertAiGeneratedContentSchema, 
  insertChatMessageSchema
} from "../shared/schema";
import { z } from "zod";
import * as openaiService from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(userData);
      res.status(201).json({ user: { ...newUser, password: undefined } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // User routes
  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // Subjects/Courses routes
  app.get("/api/subjects", async (req, res) => {
    try {
      const subjects = await storage.getAllSubjects();
      res.json({ subjects });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // Lectures routes
  app.get("/api/lectures", async (req, res) => {
    try {
      const lectures = await storage.getAllLectures();
      res.json({ lectures });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // Assignments routes
  app.get("/api/assignments", async (req, res) => {
    try {
      const assignments = await storage.getAllAssignments();
      res.json({ assignments });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // Submissions routes
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissions = await storage.getAllSubmissions();
      res.json({ submissions });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // Documents routes
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json({ documents });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // Student Progress routes
  app.get("/api/student-progress", async (req, res) => {
    try {
      const studentProgress = await storage.getAllStudentProgress();
      res.json({ studentProgress });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: (error as Error).message });
    }
  });

  // AI Generated Content routes
  app.post("/api/ai/calendar", async (req, res) => {
    try {
      const { studentId } = req.body;
      
      // Use OpenAI to generate a personalized calendar
      const calendar = await openaiService.generateCalendar(studentId);
      
      res.json(calendar);
    } catch (error) {
      console.error("Calendar generation error:", error);
      res.status(500).json({ message: "Failed to generate calendar", error: (error as Error).message });
    }
  });

  app.post("/api/ai/assistant", async (req, res) => {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json({ 
          message: "Invalid request. Please provide a question string." 
        });
      }
      
      // Use OpenAI to generate a response - note that our service now handles errors internally
      // and returns a fallback response instead of throwing
      const response = await openaiService.answerQuestion(question);
      
      res.json(response);
    } catch (error) {
      console.error("AI assistant error:", error);
      // Even if an unexpected error occurs, provide a user-friendly response
      res.json({ 
        response: "I apologize, but I'm having trouble processing your request right now. Please try again in a few moments."
      });
    }
  });

  app.post("/api/ai/mindmap", async (req, res) => {
    try {
      const { lectureId } = req.body;
      
      // Get lecture content from database (in a real app)
      const lectureContent = "Quantum mechanics is a fundamental theory in physics that describes the behavior of matter and energy at the atomic and subatomic scales. Key concepts include wave functions, the Schrödinger equation, quantum entanglement, and the uncertainty principle. Wave-particle duality is a central concept where quantum entities exhibit both wave-like and particle-like properties.";
      
      // Use OpenAI to generate a mind map
      const mindMap = await openaiService.generateMindMap(lectureContent);
      
      res.json(mindMap);
    } catch (error) {
      console.error("Mind map generation error:", error);
      res.status(500).json({ message: "Failed to generate mind map", error: (error as Error).message });
    }
  });

  app.post("/api/ai/summarize", async (req, res) => {
    try {
      const { lectureId } = req.body;
      
      // Get lecture content from database (in a real app)
      const lectureContent = "Quantum mechanics is a fundamental theory in physics that describes the behavior of matter and energy at the atomic and subatomic scales. The theory was developed in the early 20th century to explain phenomena that classical physics could not account for. Key concepts include wave functions, which describe the quantum state of a system; the Schrödinger equation, which governs how these wave functions evolve over time; quantum entanglement, where particles become correlated in ways that cannot be explained by classical physics; and the uncertainty principle, which places limits on how precisely certain pairs of physical properties can be measured simultaneously.";
      
      // Use OpenAI to generate a summary
      const summary = await openaiService.summarizeLecture(lectureContent);
      
      res.json(summary);
    } catch (error) {
      console.error("Lecture summarization error:", error);
      res.status(500).json({ message: "Failed to summarize lecture", error: (error as Error).message });
    }
  });

  app.post("/api/ai/hint", async (req, res) => {
    try {
      const { assignmentId, questionId } = req.body;
      
      // Get assignment question from database (in a real app)
      const assignmentQuestion = "In a hydrogen atom, if we measure the position of the electron with high precision, what happens to our ability to determine its momentum? Explain using the principles of quantum mechanics.";
      
      // Use OpenAI to generate a hint
      const hint = await openaiService.generateHint(assignmentQuestion);
      
      res.json(hint);
    } catch (error) {
      console.error("Hint generation error:", error);
      res.status(500).json({ message: "Failed to generate hint", error: (error as Error).message });
    }
  });

  app.post("/api/ai/generate-quiz", async (req, res) => {
    try {
      const { documentIds } = req.body;
      
      // Get document content from database (in a real app)
      const documentContent = "Quantum mechanics is governed by several key principles. The Heisenberg Uncertainty Principle states that we cannot simultaneously know both the position and momentum of a particle with perfect precision. The Schrödinger equation describes how quantum systems evolve over time, using wave functions to represent the probability distribution of a particle's position or other properties. Quantum entanglement occurs when particles interact in ways such that the quantum state of each particle cannot be described independently of the others, regardless of the distance separating them.";
      
      // Use OpenAI to generate a quiz
      const quiz = await openaiService.generateQuiz(documentContent);
      
      res.json(quiz);
    } catch (error) {
      console.error("Quiz generation error:", error);
      res.status(500).json({ message: "Failed to generate quiz", error: (error as Error).message });
    }
  });

  app.post("/api/ai/plagiarism-check", async (req, res) => {
    try {
      const { submissionId } = req.body;
      
      // Get submission content and reference content from database (in a real app)
      const submissionContent = "Quantum entanglement is a physical phenomenon that occurs when a group of particles are generated, interact, or share spatial proximity in a way such that the quantum state of each particle of the group cannot be described independently of the state of the others, including when the particles are separated by a large distance.";
      const referenceContent = "Quantum entanglement occurs when a pair of particles interact in such a way that the quantum state of each particle cannot be described independently of the others. This remains true even when the particles are separated by a large distance.";
      
      // Use OpenAI to check for plagiarism
      const plagiarismResult = await openaiService.checkPlagiarism(submissionContent, referenceContent);
      
      res.json(plagiarismResult);
    } catch (error) {
      console.error("Plagiarism check error:", error);
      res.status(500).json({ message: "Failed to check plagiarism", error: (error as Error).message });
    }
  });

  app.post("/api/ai/suggestions", async (req, res) => {
    try {
      const { studentIds } = req.body;
      
      // Get student data from database (in a real app)
      const studentData = "Student 1: Attendance 70%, Average Grade: B-, Participation in discussions: Low. Student 2: Attendance 95%, Average Grade: A, Participation in discussions: High but shows confusion on quantum entanglement topics.";
      
      // Use OpenAI to generate suggestions
      const suggestionResult = await openaiService.generateSuggestions(studentData);
      
      res.json(suggestionResult);
    } catch (error) {
      console.error("Suggestion generation error:", error);
      res.status(500).json({ message: "Failed to generate suggestions", error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
