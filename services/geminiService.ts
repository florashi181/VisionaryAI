import { GoogleGenAI } from "@google/genai";
import { MediaType } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY || ''; 
  // Note: For Veo, the key is often injected via the window selection flow, 
  // but we still initialize the client with the env var if available for standard calls.
  return new GoogleGenAI({ apiKey });
};

export const generateImageWithGemini = async (prompt: string): Promise<string> => {
  const ai = getClient();
  
  // Using gemini-2.5-flash-image as requested for standard generation
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: prompt }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        // imageSize is NOT supported for gemini-2.5-flash-image, removing it to fix 500 error
      }
    }
  });

  // Extract image from parts
  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("No image data found in response");
};

export const generateVideoWithVeo = async (prompt: string): Promise<string> => {
  // Check for paid API key selection requirement for Veo
  // Cast window to any to avoid type conflict with existing global AIStudio definition
  const win = window as any;
  if (win.aistudio) {
    const hasKey = await win.aistudio.hasSelectedApiKey();
    if (!hasKey) {
       await win.aistudio.openSelectKey();
       // We assume success after the dialog closes/promise resolves as per instructions
    }
  }

  // Re-initialize client to pick up any potentially selected key context
  const ai = getClient();

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  // Polling for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 5000)); // Poll every 5s
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!videoUri) {
    throw new Error("Video generation failed or returned no URI");
  }

  // Append API key if we have one in env, otherwise the fetch might fail depending on how the proxy works.
  // The guidelines say: "You must append an API key when fetching from the download link."
  const fetchUrl = `${videoUri}&key=${process.env.API_KEY}`;
  
  // Fetch the actual video bytes to display it
  const videoResponse = await fetch(fetchUrl);
  if (!videoResponse.ok) {
     throw new Error("Failed to download generated video");
  }
  
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};

export const generateAsset = async (type: MediaType, prompt: string): Promise<string> => {
  if (type === MediaType.VIDEO) {
    return generateVideoWithVeo(prompt);
  } else {
    return generateImageWithGemini(prompt);
  }
};