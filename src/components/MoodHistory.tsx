import React from 'react';
import { useMoodTracker } from '../hooks/useMoodTracker';
import { moodOptions } from '../data/moods';
import { ArrowLeft, TrendingUp } from 'lucide-react';

interface MoodHistoryProps {
  onBack: () => void;
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ onBack }) => {
  const { getMoodHistory } = useMoodTracker();
  const recentMoods = getMoodHistory(7);

  const getMoodOption = (moodType: string) => {
    return moodOptions.find(option => option.type === moodType);
  };

  const getMoodStats = () => {
    const stats = recentMoods.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([mood, count]) => ({
      mood,
      count,
      percentage: Math.round((count / recentMoods.length) * 100)
    }));
  };

  const stats = getMoodStats();

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
            <h2 className="text-2xl font-bold text-white font-quicksand flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              Your Mood Journey
            </h2>
          </div>
        </div>

        {recentMoods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No mood data yet
            </h3>
            <p className="text-gray-400">
              Start tracking your moods to see your emotional journey
            </p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Last 7 Days Overview
              </h3>
              <div className="space-y-3">
                {stats.map(({ mood, count, percentage }) => {
                  const moodOption = getMoodOption(mood);
                  if (!moodOption) return null;

                  return (
                    <div key={mood} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{moodOption.emoji}</span>
                          <span className="text-white font-medium">{moodOption.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">{percentage}%</div>
                          <div className="text-gray-400 text-sm">{count} days</div>
                        </div>
                      </div>
                      <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${moodOption.color} transition-all duration-700 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Entries */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Recent Entries
              </h3>
              <div className="space-y-3">
                {recentMoods.slice(0, 5).map((entry) => {
                  const moodOption = getMoodOption(entry.mood);
                  if (!moodOption) return null;

                  const date = new Date(entry.timestamp);
                  const isToday = date.toDateString() === new Date().toDateString();
                  const isYesterday = date.toDateString() === new Date(Date.now() - 86400000).toDateString();
                  
                  let dateLabel = date.toLocaleDateString();
                  if (isToday) dateLabel = 'Today';
                  else if (isYesterday) dateLabel = 'Yesterday';

                  return (
                    <div key={entry.id} className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{moodOption.emoji}</span>
                          <div>
                            <div className="text-white font-medium">{moodOption.label}</div>
                            <div className="text-gray-400 text-sm">{moodOption.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-300 text-sm">{dateLabel}</div>
                          <div className="text-gray-500 text-xs">
                            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;