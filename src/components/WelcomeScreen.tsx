import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#000102] flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#A8D0E6] to-[#FFB6B9] rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <Sparkles className="absolute top-0 right-20 w-6 h-6 text-[#FFB6B9] animate-bounce" />
          <Sparkles className="absolute bottom-4 left-16 w-4 h-4 text-[#A8D0E6] animate-bounce delay-300" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 font-quicksand">
          Zen<span className="bg-gradient-to-r from-[#A8D0E6] to-[#FFB6B9] bg-clip-text text-transparent">Vibes</span>
        </h1>
        
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          Your personal sanctuary for mindfulness and emotional wellness. 
          Track your moods and find peace through guided meditation.
        </p>
        
        <button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-[#A8D0E6] to-[#FFB6B9] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#9CC4DB] hover:to-[#FF9FA4]"
        >
          Begin Your Journey
        </button>
        
        <div className="mt-8 flex justify-center space-x-4 text-2xl opacity-60">
          <span className="animate-bounce">🧘‍♀️</span>
          <span className="animate-bounce delay-100">✨</span>
          <span className="animate-bounce delay-200">🌸</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;