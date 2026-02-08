
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFoodRecommendations = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wants food advice: "${query}". You are BhookLagii AI, a food assistant. Recommend 3 types of foods and explain their health benefits. Return a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              benefits: { type: Type.STRING },
            },
            required: ["name", "description", "benefits"]
          }
        }
      },
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Error:", error);
    return [];
  }
};

export const searchPlaces = async (query: string, lat?: number, lng?: number) => {
  if (!query) return [];
  try {
    const contents = `Search for locations or addresses matching: "${query}"`;
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: lat && lng ? { latitude: lat, longitude: lng } : undefined
          }
        }
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (!groundingChunks) return [];

    return groundingChunks
      .filter((chunk: any) => chunk.maps)
      .map((chunk: any) => ({
        title: chunk.maps.title,
        uri: chunk.maps.uri,
      }));
  } catch (error) {
    console.error("Maps Search Error:", error);
    return [];
  }
};
