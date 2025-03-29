import OpenAI from "openai";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey || apiKey === "181005") {
  console.warn("Warning: Invalid or missing OPENAI_API_KEY. Using fallback responses.");
}

const openai = new OpenAI({
  apiKey: apiKey
});

// Helper function to safely parse JSON from OpenAI response
const safeJsonParse = (text: string | null | undefined) => {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {};
  }
};

export async function generateCalendar(studentId: number) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that generates personalized learning schedules. Format your response as JSON following this structure: {days: [{date: number, events: [{type: 'lecture' | 'assignment' | 'quiz'}]}], events: [{title: string, description: string, time: string, type: 'lecture' | 'assignment' | 'quiz'}]}"
        },
        {
          role: "user",
          content: `Generate a personalized 2-week calendar for a student interested in physics, chemistry, and mathematics with focus on quantum mechanics and organic chemistry. Use studentId: ${studentId} to personalize content.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error generating calendar:", error);
    throw error;
  }
}

export async function answerQuestion(question: string) {
  // If API key is invalid, provide a useful fallback response
  if (!apiKey || apiKey === "181005") {
    console.log("Using fallback response for AI assistant");
    
    // Generic responses based on detected topics in the question
    const scienceTopics = ['physics', 'chemistry', 'biology', 'science', 'atom', 'molecule', 'cell'];
    const mathTopics = ['math', 'algebra', 'calculus', 'equation', 'formula', 'geometry', 'trigonometry'];
    const literatureTopics = ['literature', 'book', 'novel', 'poem', 'author', 'writing', 'story'];
    
    let response = '';
    
    const lowerQuestion = question.toLowerCase();
    
    if (scienceTopics.some(topic => lowerQuestion.includes(topic))) {
      response = "Based on general scientific principles, I can tell you that science is a systematic approach to understanding the natural world through observation and experimentation. For detailed information on this specific scientific topic, I recommend checking your course textbook or visiting educational websites like Khan Academy.";
    } else if (mathTopics.some(topic => lowerQuestion.includes(topic))) {
      response = "Mathematics is all about patterns, relationships, and problem-solving. To fully address this specific math question, you'd benefit from reviewing your course materials or checking online resources like Khan Academy or Paul's Online Math Notes.";
    } else if (literatureTopics.some(topic => lowerQuestion.includes(topic))) {
      response = "Literature allows us to explore different perspectives and human experiences through written works. For more specific analysis on this literary topic, I recommend consulting your course materials or checking online resources like SparkNotes or LitCharts.";
    } else {
      response = "I understand your question, but I'm currently running in a demonstration mode with limited knowledge. For the most accurate information on this topic, I recommend consulting your course materials or relevant educational websites.";
    }
    
    return { response };
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI educational assistant who helps students understand complex topics in physics, chemistry, and mathematics. You provide clear, concise explanations with relevant examples. You are knowledgeable, accurate, and supportive."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    return {
      response: response.choices[0].message.content || "I'm sorry, I couldn't process that question. Please try again."
    };
  } catch (error) {
    console.error("Error answering question:", error);
    
    // Return a friendly error message instead of throwing
    return {
      response: "I apologize, but I'm having trouble connecting to my knowledge base right now. Please try again in a few moments, or check if the OpenAI API key is valid."
    };
  }
}

export async function generateMindMap(lectureContent: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that generates mind maps from lecture content. Format your response as JSON following this structure: {nodes: [{id: string, label: string}], edges: [{source: string, target: string}]}"
        },
        {
          role: "user",
          content: `Generate a mind map for the following lecture content: ${lectureContent}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error generating mind map:", error);
    throw error;
  }
}

export async function summarizeLecture(lectureContent: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that summarizes lecture content. Format your response as JSON following this structure: {keyPoints: string[], summary: string}"
        },
        {
          role: "user",
          content: `Summarize the following lecture content and extract key points: ${lectureContent}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error summarizing lecture:", error);
    throw error;
  }
}

export async function generateHint(assignmentQuestion: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that provides hints for assignments without giving away the full solution. Format your response as JSON following this structure: {hint: string, explanation: string}"
        },
        {
          role: "user",
          content: `Provide a helpful hint for the following assignment question: ${assignmentQuestion}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error generating hint:", error);
    throw error;
  }
}

export async function generateQuiz(documentContent: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that generates quizzes from educational content. Format your response as JSON following this structure: {questions: [{question: string, options: string[], correctAnswer: number}]}"
        },
        {
          role: "user",
          content: `Generate a quiz with multiple-choice questions based on the following content: ${documentContent}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}

export async function checkPlagiarism(submissionContent: string, referenceContent: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that checks for plagiarism in student submissions. Format your response as JSON following this structure: {score: number} where score is a percentage from 0 to 100."
        },
        {
          role: "user",
          content: `Compare the following submission with the reference content and provide a plagiarism score: 
          
          Submission: ${submissionContent}
          
          Reference: ${referenceContent}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error checking plagiarism:", error);
    throw error;
  }
}

export async function generateSuggestions(studentData: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an AI educational assistant that provides teaching suggestions based on student data. Format your response as JSON following this structure: {suggestions: string[]}"
        },
        {
          role: "user",
          content: `Generate teaching suggestions based on the following student data: ${studentData}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "{}";
    return safeJsonParse(content);
  } catch (error) {
    console.error("Error generating suggestions:", error);
    throw error;
  }
}