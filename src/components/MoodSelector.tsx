import React from 'react';
import { moodOptions } from '../data/moods';
import { MoodType } from '../types';
import { TrendingUp } from 'lucide-react';

interface MoodSelectorProps {
  currentMood: MoodType | null;
  onMoodSelect: (mood: MoodType) => void;
  onViewHistory: () => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  currentMood, 
  onMoodSelect, 
  onViewHistory 
}) => {
  return (
    <div className="min-h-screen bg-[#000102] p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-quicksand">
            How are you feeling?
          </h2>
          <p className="text-gray-400">
            Select your current mood to get personalized support
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {moodOptions.map((mood) => (
            <button
              key={mood.type}
              onClick={() => onMoodSelect(mood.type)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                currentMood === mood.type
                  ? `border-transparent bg-gradient-to-br ${mood.color} shadow-lg`
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className={`font-semibold mb-1 ${
                currentMood === mood.type ? 'text-white' : 'text-gray-200'
              }`}>
                {mood.label}
              </div>
              <div className={`text-sm ${
                currentMood === mood.type ? 'text-white/80' : 'text-gray-400'
              }`}>
                {mood.description}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onViewHistory}
          className="w-full bg-gray-800/50 border border-gray-700 text-gray-200 py-3 px-4 rounded-xl font-medium hover:bg-gray-700/50 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <TrendingUp className="w-5 h-5" />
          <span>View Mood History</span>
        </button>
      </div>
    </div>
  );
};

export default MoodSelector;