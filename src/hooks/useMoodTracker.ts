import { useState, useEffect } from 'react';
import { MoodEntry, MoodType } from '../types';

const STORAGE_KEY = 'zenvibes-moods';

export const useMoodTracker = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedMoods = JSON.parse(stored);
        setMoods(parsedMoods);
        
        // Get today's mood if it exists
        const today = new Date().toDateString();
        const todayMood = parsedMoods.find((entry: MoodEntry) => 
          new Date(entry.timestamp).toDateString() === today
        );
        if (todayMood) {
          setCurrentMood(todayMood.mood);
        }
      } catch (error) {
        console.error('Error loading mood data:', error);
      }
    }
  }, []);

  const saveMood = (mood: MoodType) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      timestamp: Date.now(),
      date: new Date().toDateString()
    };

    const today = new Date().toDateString();
    const updatedMoods = moods.filter(m => 
      new Date(m.timestamp).toDateString() !== today
    );
    updatedMoods.push(entry);

    setMoods(updatedMoods);
    setCurrentMood(mood);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMoods));
  };

  const getMoodHistory = (days: number = 7) => {
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    return moods
      .filter(mood => mood.timestamp >= cutoff)
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  return {
    moods,
    currentMood,
    saveMood,
    getMoodHistory
  };
};