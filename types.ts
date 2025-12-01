
export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export enum GenerationStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export enum ToolType {
  TEXT_TO_IMAGE = 'Text to Image',
  IMAGE_EDITING = 'Image Editing',
  IMAGE_FACE_SWAP = 'Image Face Swap',
  TEXT_TO_VIDEO = 'Text to Video'
}

export interface GenerationItem {
  id: string;
  type: MediaType;
  tool: ToolType;
  status: GenerationStatus;
  prompt: string;
  url?: string;
  timestamp: number;
  width?: number;
  height?: number;
  aspectRatio?: string;
  videoDuration?: number; // In seconds
  isFavorite?: boolean;
}

export interface UserProfile {
  name: string;
  points: number;
}

export type AppView = MediaType | 'home' | 'assets';
