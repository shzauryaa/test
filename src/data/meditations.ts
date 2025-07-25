import { Meditation } from '../types';

export const meditations: Meditation[] = [
  // Happy meditations
  {
    id: '1',
    title: 'Gratitude Flow',
    duration: '10 min',
    description: 'Amplify your joy with gratitude meditation',
    mood: 'happy',
    imageUrl: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    title: 'Sunshine Visualization',
    duration: '8 min',
    description: 'Bask in positive energy and warmth',
    mood: 'happy',
    imageUrl: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  
  // Neutral meditations
  {
    id: '3',
    title: 'Mindful Breathing',
    duration: '12 min',
    description: 'Center yourself with focused breathing',
    mood: 'neutral',
    imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    title: 'Present Moment',
    duration: '15 min',
    description: 'Ground yourself in the here and now',
    mood: 'neutral',
    imageUrl: 'https://images.pexels.com/photos/3775123/pexels-photo-3775123.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  
  // Sad meditations
  {
    id: '5',
    title: 'Healing Light',
    duration: '18 min',
    description: 'Gentle meditation for emotional healing',
    mood: 'sad',
    imageUrl: 'https://images.pexels.com/photos/1051449/pexels-photo-1051449.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '6',
    title: 'Compassionate Heart',
    duration: '14 min',
    description: 'Nurture yourself with loving-kindness',
    mood: 'sad',
    imageUrl: 'https://images.pexels.com/photos/3759659/pexels-photo-3759659.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  
  // Stressed meditations
  {
    id: '7',
    title: 'Stress Release',
    duration: '20 min',
    description: 'Let go of tension and worry',
    mood: 'stressed',
    imageUrl: 'https://images.pexels.com/photos/3810788/pexels-photo-3810788.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '8',
    title: 'Calm Waters',
    duration: '16 min',
    description: 'Find peace in turbulent times',
    mood: 'stressed',
    imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];