import React from 'react';
import { meditations } from '../data/meditations';
import { MoodType } from '../types';
import { Play, ArrowLeft, Clock } from 'lucide-react';

interface MeditationListProps {
  mood: MoodType;
  onBack: () => void;
  onSelectMeditation: (meditationId: string) => void;
}

const MeditationList: React.FC<MeditationListProps> = ({ 
  mood, 
  onBack, 
  onSelectMeditation 
}) => {
  const moodMeditations = meditations.filter(m => m.mood === mood);
  const moodEmoji = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    stressed: '😫'
  };

  return (
    <div className="min-h-screen bg-[#000102] p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold text-white font-quicksand">
              {moodEmoji[mood]} Meditations for You
            </h2>
          </div>
        </div>

        <div className="space-y-4">
          {moodMeditations.map((meditation) => (
            <div
              key={meditation.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-[#A8D0E6]/30 transition-all duration-300"
            >
              <div className="h-48 relative overflow-hidden">
                <img
                  src={meditation.imageUrl}
                  alt={meditation.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => onSelectMeditation(meditation.id)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-[#A8D0E6] to-[#FFB6B9] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {meditation.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {meditation.description}
                </p>
                <div className="flex items-center text-[#A8D0E6] text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{meditation.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeditationList;