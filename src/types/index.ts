export interface MoodEntry {
  id: string;
  mood: MoodType;
  timestamp: number;
  date: string;
}

export type MoodType = 'happy' | 'sad' | 'neutral' | 'stressed';

export interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
  description: string;
}

export interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  mood: MoodType;
  audioUrl?: string;
  imageUrl: string;
}