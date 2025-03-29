import { 
  users, type User, type InsertUser, 
  type Subject, type Lecture, type Assignment, 
  type Submission, type Document, type StudentProgress 
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Subject/Courses methods
  getAllSubjects(): Promise<Subject[]>;
  
  // Lectures methods
  getAllLectures(): Promise<Lecture[]>;
  
  // Assignment methods
  getAllAssignments(): Promise<Assignment[]>;
  
  // Submission methods
  getAllSubmissions(): Promise<Submission[]>;
  
  // Document methods
  getAllDocuments(): Promise<Document[]>;
  
  // Student Progress methods
  getAllStudentProgress(): Promise<StudentProgress[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private subjects: Map<number, Subject>;
  private lectures: Map<number, Lecture>;
  private assignments: Map<number, Assignment>;
  private submissions: Map<number, Submission>;
  private documents: Map<number, Document>;
  private studentProgress: Map<number, StudentProgress>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.subjects = new Map();
    this.lectures = new Map();
    this.assignments = new Map();
    this.submissions = new Map();
    this.documents = new Map();
    this.studentProgress = new Map();
    this.currentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Subject/Courses methods
  async getAllSubjects(): Promise<Subject[]> {
    return Array.from(this.subjects.values());
  }
  
  // Lectures methods
  async getAllLectures(): Promise<Lecture[]> {
    return Array.from(this.lectures.values());
  }
  
  // Assignment methods
  async getAllAssignments(): Promise<Assignment[]> {
    return Array.from(this.assignments.values());
  }
  
  // Submission methods
  async getAllSubmissions(): Promise<Submission[]> {
    return Array.from(this.submissions.values());
  }
  
  // Document methods
  async getAllDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }
  
  // Student Progress methods
  async getAllStudentProgress(): Promise<StudentProgress[]> {
    return Array.from(this.studentProgress.values());
  }
}

export const storage = new MemStorage();
