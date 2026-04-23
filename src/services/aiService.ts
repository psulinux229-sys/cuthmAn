import { GoogleGenAI, Type } from "@google/genai";
import { Milestone } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getAiMilestoneSuggestions(title: string, description: string, category: string): Promise<Omit<Milestone, 'id'>[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an architectural clarity assistant for Axiom Focus, please suggest 3-5 concrete, actionable milestones for the following goal:
      
      Goal: ${title}
      Category: ${category}
      Description: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    throw error;
  }
}
