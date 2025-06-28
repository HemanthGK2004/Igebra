// Mock AI service - in production, this would connect to OpenAI/Whisper API
export const aiService = {
  transcribeAudio: async (audioBlob: Blob): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock transcription result
    return "This is a mock transcription of your audio note. In a real implementation, this would be processed by Whisper API to convert your speech to text accurately.";
  },

  summarizeText: async (text: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock summary generation
    const sentences = text.split('.').filter(s => s.trim().length > 0);
    const keyPoints = sentences.slice(0, Math.min(3, sentences.length));
    return `Key points: ${keyPoints.join('. ')}.`;
  },

  generateFlashcards: async (noteContent: string): Promise<Array<{question: string, answer: string}>> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock flashcard generation
    const words = noteContent.split(' ').filter(w => w.length > 4);
    const uniqueWords = [...new Set(words)].slice(0, 5);
    
    return uniqueWords.map(word => ({
      question: `What is the significance of "${word}" in this context?`,
      answer: `${word} is a key concept discussed in the note content.`
    }));
  },

  generateQuizQuestions: async (noteContent: string): Promise<Array<{
    question: string, 
    options: string[], 
    correctAnswer: number,
    explanation: string
  }>> => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock quiz question generation
    const topics = ['concept', 'definition', 'application', 'example', 'principle'];
    
    return topics.slice(0, 3).map((topic, index) => ({
      question: `Which of the following best describes the ${topic} mentioned in the content?`,
      options: [
        `Option A: First possible answer about ${topic}`,
        `Option B: Second possible answer about ${topic}`,
        `Option C: Third possible answer about ${topic}`,
        `Option D: Fourth possible answer about ${topic}`
      ],
      correctAnswer: index % 4,
      explanation: `This is the correct answer because it accurately represents the ${topic} as discussed in the source material.`
    }));
  },

  getStudyRecommendations: async (notes: any[], sessions: any[]): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
      "Review notes from 3 days ago for better retention",
      "Focus on topics with lower accuracy scores",
      "Take a 10-minute break between study sessions",
      "Create more flashcards for complex topics",
      "Try the Pomodoro technique for better focus",
      "Review your weakest subject areas more frequently"
    ];
  }
};