'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lotus, Sparkles, Heart, Brain, BookOpen, Users } from 'lucide-react';
import ProfileQuestionnaire from '@/components/ProfileQuestionnaire';
import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchUserProfile();
    }
  }, [session]);

  const fetchUserProfile = async () => {
    setIsLoadingProfile(true);
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        setShowQuestionnaire(!data.profileCompleted);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleProfileComplete = async (profileData: any) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        setShowQuestionnaire(false);
        fetchUserProfile();
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Lotus className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LandingPage onSignIn={() => signIn('google')} />;
  }

  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Lotus className="w-12 h-12 text-orange-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Preparing your spiritual journey...</p>
        </div>
      </div>
    );
  }

  if (showQuestionnaire) {
    return <ProfileQuestionnaire onComplete={handleProfileComplete} />;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-orange-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Lotus className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="font-bold text-gray-800">ChatGuru</h1>
              <p className="text-sm text-gray-600">Vedic Wisdom Guide</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{session.user?.name}</p>
              <p className="text-xs text-gray-600">{userProfile?.profile?.experience || 'Beginner'} Practitioner</p>
            </div>
            <img
              src={session.user?.image || ''}
              alt={session.user?.name || ''}
              className="w-10 h-10 rounded-full border-2 border-orange-200"
            />
            <button
              onClick={() => signOut()}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
}

function LandingPage({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Lotus className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold text-gray-800">ChatGuru</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignIn}
            className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-200"
          >
            Sign in with Google
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Ancient Wisdom for{' '}
              <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                Modern Life
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover timeless guidance through Patanjali's Yoga Sutras. ChatGuru helps you navigate life's challenges 
              with 2,000-year-old wisdom tailored to your personal spiritual journey.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignIn}
              className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all duration-200"
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Heart className="w-8 h-8 text-red-500" />,
              title: "Personalized Wisdom",
              description: "Receive guidance tailored to your spiritual profile, current challenges, and life stage."
            },
            {
              icon: <BookOpen className="w-8 h-8 text-blue-500" />,
              title: "Authentic Sutras",
              description: "Every response is grounded in genuine Patanjali Yoga Sutras with proper Sanskrit references."
            },
            {
              icon: <Brain className="w-8 h-8 text-purple-500" />,
              title: "Practical Application",
              description: "Ancient wisdom translated into actionable guidance for modern life situations."
            },
            {
              icon: <Lotus className="w-8 h-8 text-orange-500" />,
              title: "Spiritual Growth",
              description: "Progressive guidance that evolves with your spiritual development and understanding."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
              title: "Daily Practice",
              description: "Receive suggestions for meditation, breathwork, and ethical living based on the sutras."
            },
            {
              icon: <Users className="w-8 h-8 text-green-500" />,
              title: "Sacred Boundaries",
              description: "ChatGuru stays focused on spiritual wisdom, gently redirecting off-topic conversations."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-orange-100 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands who have found peace, clarity, and purpose through ancient Vedic wisdom. 
              Your personalized spiritual guide awaits.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignIn}
              className="bg-gradient-to-r from-orange-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-200"
            >
              Start with Google
            </motion.button>
            <p className="text-sm text-gray-500 mt-4">
              Free to begin • Secure with Google OAuth • Your spiritual journey starts now
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
