export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  progress: number;
  milestone?: string;
};

export type Note = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  updatedAt?: string;
};

export type UploadedDocument = {
  id: string;
  name: string;
  type: "pdf" | "txt" | "md" | "doc";
  uploadedAt: string;
};

export type ChatMessage = {
  id: string;
  author: "user" | "ai";
  content: string;
  timestamp: string;
};

export type Portfolio = {
  totalHours: number;
  topics: string[];
  skills: Record<string, number>;
  completedCourses: number;
  timeline: {
    id: string;
    title: string;
    description: string;
    date: string;
  }[];
  nextSkills: {
    id: string;
    title: string;
    description: string;
  }[];
};
