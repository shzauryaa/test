import React, { useState, useEffect } from 'react';
import { meditations } from '../data/meditations';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface MeditationPlayerProps {
  meditationId: string;
  onBack: () => void;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ 
  meditationId, 
  onBack 
}) => {
  const meditation = meditations.find(m => m.id === meditationId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Parse duration to get total seconds
  const totalMinutes = parseInt(meditation?.duration || '0');
  const totalSeconds = totalMinutes * 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          setProgress((newTime / totalSeconds) * 100);
          
          if (newTime >= totalSeconds) {
            setIsPlaying(false);
            return totalSeconds;
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, progress, totalSeconds]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const restart = () => {
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!meditation) {
    return (
      <div className="min-h-screen bg-[#000102] flex items-center justify-center">
        <div className="text-white">Meditation not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000102] relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={meditation.imageUrl}
          alt={meditation.title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000102]/80 via-[#000102]/60 to-[#000102]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <button
            onClick={onBack}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Player Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 font-quicksand">
              {meditation.title}
            </h1>
            <p className="text-gray-300 text-lg">
              {meditation.description}
            </p>
          </div>

          {/* Progress Circle */}
          <div className="relative w-64 h-64 mx-auto mb-8">
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(168, 208, 230, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className="transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#A8D0E6" />
                  <stop offset="100%" stopColor="#FFB6B9" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-lg font-semibold mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-gray-400 text-sm">
                / {formatTime(totalSeconds)}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={restart}
              className="p-4 text-gray-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-gradient-to-r from-[#A8D0E6] to-[#FFB6B9] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            
            <div className="w-6 h-6" /> {/* Spacer for symmetry */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationPlayer;