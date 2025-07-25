import { MoodOption } from '../types';

export const moodOptions: MoodOption[] = [
  {
    type: 'happy',
    emoji: '😊',
    label: 'Happy',
    color: 'from-yellow-400 to-orange-400',
    description: 'Feeling joyful and content'
  },
  {
    type: 'neutral',
    emoji: '😐',
    label: 'Neutral',
    color: 'from-blue-400 to-purple-400',
    description: 'Balanced and calm'
  },
  {
    type: 'sad',
    emoji: '😢',
    label: 'Sad',
    color: 'from-blue-500 to-indigo-500',
    description: 'Feeling down or melancholy'
  },
  {
    type: 'stressed',
    emoji: '😫',
    label: 'Stressed',
    color: 'from-red-400 to-pink-400',
    description: 'Overwhelmed or anxious'
  }
];