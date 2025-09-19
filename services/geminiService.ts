
import { GoogleGenAI, Modality, type GenerateContentResponse } from "@google/genai";
import type { ImageEditResult } from '../types';

const MODEL_NAME = 'gemini-2.5-flash-image-preview';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function editImage(
  prompt: string,
  base64ImageData: string,
  mimeType: string
): Promise<ImageEditResult> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    const result: ImageEditResult = { imageUrl: null, text: null };

    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          result.text = part.text;
        } else if (part.inlineData) {
          const { data, mimeType } = part.inlineData;
          result.imageUrl = `data:${mimeType};base64,${data}`;
        }
      }
    }

    if (!result.imageUrl) {
      throw new Error("API did not return an image. It might be due to safety policies or an invalid prompt.");
    }
    
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error('The configured API key is invalid. Please check your setup.');
        }
        throw new Error(`Failed to edit image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
