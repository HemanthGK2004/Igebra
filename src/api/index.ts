import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export const register = async (data: { email: string; password: string; name: string; role?: string }) =>
  api.post("/register", data);

export const login = async (data: { email: string; password: string }) =>
  api.post("/login", data);

export const createNote = async (data: Partial<Note>) => api.post("/notes", data);
export const getNotes = async (params?: { search?: string; category?: string; sort?: string }) =>
  api.get("/notes", { params });
export const updateNote = async (id: string, data: Partial<Note>) => api.put(`/notes/${id}`, data);
export const deleteNote = async (id: string) => api.delete(`/notes/${id}`);

export const createAudioNote = async (data: FormData) => 
  api.post("/audio-notes", data, { headers: { "Content-Type": "multipart/form-data" } });
export const transcribeAudioNote = async (id: string) => api.post(`/audio-notes/transcribe/${id}`);
export const getAudioNotes = async () => api.get("/audio-notes");

export const createStudySession = async (data: Partial<StudySession>) => api.post("/study-sessions", data);
export const getStudySessions = async () => api.get("/study-sessions");

export const createStudyGoal = async (data: Partial<StudyGoal>) => api.post("/study-goals", data);
export const getStudyGoals = async () => api.get("/study-goals");

export const getEvents = async () => api.get("/events");

export const getDashboardStats = async () => api.get("/dashboard/stats");

export const summarizeText = async (content: string) => api.post("/notes/summarize", { content });