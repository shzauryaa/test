import React, { useState } from 'react';
import { useMoodTracker } from './hooks/useMoodTracker';
import WelcomeScreen from './components/WelcomeScreen';
import MoodSelector from './components/MoodSelector';
import MeditationList from './components/MeditationList';
import MeditationPlayer from './components/MeditationPlayer';
import MoodHistory from './components/MoodHistory';
import { MoodType } from './types';

type Screen = 'welcome' | 'mood-selector' | 'meditation-list' | 'meditation-player' | 'mood-history';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedMeditation, setSelectedMeditation] = useState<string | null>(null);
  const { currentMood, saveMood } = useMoodTracker();

  const handleGetStarted = () => {
    setCurrentScreen('mood-selector');
  };

  const handleMoodSelect = (mood: MoodType) => {
    saveMood(mood);
    setCurrentScreen('meditation-list');
  };

  const handleSelectMeditation = (meditationId: string) => {
    setSelectedMeditation(meditationId);
    setCurrentScreen('meditation-player');
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'meditation-list':
        setCurrentScreen('mood-selector');
        break;
      case 'meditation-player':
        setCurrentScreen('meditation-list');
        break;
      case 'mood-history':
        setCurrentScreen('mood-selector');
        break;
      default:
        setCurrentScreen('mood-selector');
    }
  };

  const handleViewHistory = () => {
    setCurrentScreen('mood-history');
  };

  return (
    <div className="font-quicksand">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={handleGetStarted} />
      )}
      
      {currentScreen === 'mood-selector' && (
        <MoodSelector
          currentMood={currentMood}
          onMoodSelect={handleMoodSelect}
          onViewHistory={handleViewHistory}
        />
      )}
      
      {currentScreen === 'meditation-list' && currentMood && (
        <MeditationList
          mood={currentMood}
          onBack={handleBack}
          onSelectMeditation={handleSelectMeditation}
        />
      )}
      
      {currentScreen === 'meditation-player' && selectedMeditation && (
        <MeditationPlayer
          meditationId={selectedMeditation}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'mood-history' && (
        <MoodHistory onBack={handleBack} />
      )}
    </div>
  );
}

export default App;