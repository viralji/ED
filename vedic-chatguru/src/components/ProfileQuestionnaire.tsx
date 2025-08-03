'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Lotus, Heart, Brain, Compass } from 'lucide-react';

interface ProfileData {
  experience: 'beginner' | 'intermediate' | 'advanced';
  currentChallenges: string[];
  spiritualGoals: string[];
  meditationPractice: 'none' | 'occasional' | 'regular' | 'daily';
  philosophicalIncline: 'devotional' | 'intellectual' | 'practical' | 'mystical';
  lifeStage: 'student' | 'householder' | 'seeker' | 'renunciant';
  primaryConcerns: string[];
}

interface ProfileQuestionnaireProps {
  onComplete: (data: ProfileData) => void;
}

const questions = [
  {
    id: 'experience',
    title: 'What is your experience with yoga and meditation?',
    subtitle: 'This helps me understand your current spiritual foundation',
    icon: <Lotus className="w-8 h-8 text-orange-500" />,
    type: 'single',
    options: [
      { value: 'beginner', label: 'Beginner', description: 'New to spiritual practices' },
      { value: 'intermediate', label: 'Intermediate', description: 'Some experience with meditation or yoga' },
      { value: 'advanced', label: 'Advanced', description: 'Regular practitioner with deep experience' }
    ]
  },
  {
    id: 'meditationPractice',
    title: 'How often do you currently meditate?',
    subtitle: 'Understanding your practice frequency helps personalize guidance',
    icon: <Brain className="w-8 h-8 text-purple-500" />,
    type: 'single',
    options: [
      { value: 'none', label: 'I don\'t meditate', description: 'No current meditation practice' },
      { value: 'occasional', label: 'Occasionally', description: 'Sometimes when I feel stressed' },
      { value: 'regular', label: 'Regularly', description: 'Few times a week' },
      { value: 'daily', label: 'Daily', description: 'Consistent daily practice' }
    ]
  },
  {
    id: 'philosophicalIncline',
    title: 'Which approach to spirituality resonates with you most?',
    subtitle: 'This helps me tailor responses to your natural inclination',
    icon: <Compass className="w-8 h-8 text-blue-500" />,
    type: 'single',
    options: [
      { value: 'devotional', label: 'Devotional (Bhakti)', description: 'Heart-centered, love and surrender' },
      { value: 'intellectual', label: 'Intellectual (Jnana)', description: 'Knowledge and self-inquiry' },
      { value: 'practical', label: 'Practical (Karma)', description: 'Action and service-oriented' },
      { value: 'mystical', label: 'Mystical (Raja)', description: 'Meditation and inner experiences' }
    ]
  },
  {
    id: 'lifeStage',
    title: 'Which life stage best describes you currently?',
    subtitle: 'Ancient wisdom recognizes different life phases requiring different guidance',
    icon: <Heart className="w-8 h-8 text-green-500" />,
    type: 'single',
    options: [
      { value: 'student', label: 'Student (Brahmacharya)', description: 'Learning and personal development' },
      { value: 'householder', label: 'Householder (Grihastha)', description: 'Family and career responsibilities' },
      { value: 'seeker', label: 'Seeker (Vanaprastha)', description: 'Spiritual seeking while fulfilling duties' },
      { value: 'renunciant', label: 'Renunciant (Sannyasa)', description: 'Focused primarily on spiritual pursuits' }
    ]
  },
  {
    id: 'currentChallenges',
    title: 'What challenges are you currently facing?',
    subtitle: 'Select all that apply - this helps me provide relevant guidance',
    icon: <Compass className="w-8 h-8 text-red-500" />,
    type: 'multiple',
    options: [
      { value: 'stress', label: 'Stress and Anxiety', description: 'Mental tension and worry' },
      { value: 'relationships', label: 'Relationship Issues', description: 'Difficulties with others' },
      { value: 'purpose', label: 'Lack of Purpose', description: 'Feeling lost or directionless' },
      { value: 'anger', label: 'Anger and Irritation', description: 'Difficulty controlling emotions' },
      { value: 'attachment', label: 'Attachments', description: 'Clinging to outcomes or possessions' },
      { value: 'focus', label: 'Lack of Focus', description: 'Scattered mind and poor concentration' },
      { value: 'fear', label: 'Fear and Insecurity', description: 'Anxieties about future or change' },
      { value: 'restlessness', label: 'Mental Restlessness', description: 'Difficulty finding peace' }
    ]
  },
  {
    id: 'spiritualGoals',
    title: 'What are your spiritual aspirations?',
    subtitle: 'What do you hope to achieve through spiritual practice?',
    icon: <Lotus className="w-8 h-8 text-indigo-500" />,
    type: 'multiple',
    options: [
      { value: 'peace', label: 'Inner Peace', description: 'Calmness and tranquility' },
      { value: 'wisdom', label: 'Wisdom and Understanding', description: 'Deeper insight into life' },
      { value: 'compassion', label: 'Compassion', description: 'Love and kindness for all beings' },
      { value: 'liberation', label: 'Liberation (Moksha)', description: 'Freedom from suffering' },
      { value: 'self-realization', label: 'Self-Realization', description: 'Knowing your true nature' },
      { value: 'service', label: 'Service to Others', description: 'Contributing to others\' wellbeing' },
      { value: 'balance', label: 'Life Balance', description: 'Harmony between different aspects of life' },
      { value: 'presence', label: 'Present Moment Awareness', description: 'Living fully in the now' }
    ]
  }
];

export default function ProfileQuestionnaire({ onComplete }: ProfileQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<ProfileData>>({});

  const handleResponse = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete the questionnaire
      const profileData: ProfileData = {
        experience: responses.experience as ProfileData['experience'] || 'beginner',
        currentChallenges: responses.currentChallenges as string[] || [],
        spiritualGoals: responses.spiritualGoals as string[] || [],
        meditationPractice: responses.meditationPractice as ProfileData['meditationPractice'] || 'none',
        philosophicalIncline: responses.philosophicalIncline as ProfileData['philosophicalIncline'] || 'practical',
        lifeStage: responses.lifeStage as ProfileData['lifeStage'] || 'householder',
        primaryConcerns: [...(responses.currentChallenges as string[] || [])]
      };
      onComplete(profileData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepComplete = () => {
    const question = questions[currentStep];
    const response = responses[question.id as keyof ProfileData];
    
    if (question.type === 'multiple') {
      return Array.isArray(response) && response.length > 0;
    }
    return response !== undefined && response !== '';
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Question Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {currentQuestion.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-gray-600">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.type === 'multiple' 
                  ? (responses[currentQuestion.id as keyof ProfileData] as string[])?.includes(option.value)
                  : responses[currentQuestion.id as keyof ProfileData] === option.value;

                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (currentQuestion.type === 'multiple') {
                        const current = (responses[currentQuestion.id as keyof ProfileData] as string[]) || [];
                        const updated = isSelected
                          ? current.filter(v => v !== option.value)
                          : [...current, option.value];
                        handleResponse(currentQuestion.id, updated);
                      } else {
                        handleResponse(currentQuestion.id, option.value);
                      }
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">
                          {option.label}
                        </div>
                        <div className="text-sm text-gray-600">
                          {option.description}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="flex items-center px-8 py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200"
          >
            {currentStep === questions.length - 1 ? 'Complete Profile' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}