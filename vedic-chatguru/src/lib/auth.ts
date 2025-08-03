import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import dbConnect from './mongodb';
import UserProfile from '@/models/User';

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        await dbConnect();
        
        // Check if user profile exists, if not create one
        const existingProfile = await UserProfile.findOne({ email: user.email });
        
        if (!existingProfile) {
          await UserProfile.create({
            email: user.email,
            name: user.name,
            image: user.image,
            spiritualProfile: {
              experience: 'beginner',
              currentChallenges: [],
              spiritualGoals: [],
              meditationPractice: 'none',
              philosophicalIncline: 'practical',
              lifeStage: 'householder',
              primaryConcerns: []
            },
            chatHistory: [],
            profileCompleted: false
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user?.email) {
        await dbConnect();
        const userProfile = await UserProfile.findOne({ email: session.user.email });
        if (userProfile) {
          session.user.profileCompleted = userProfile.profileCompleted;
          session.user.id = userProfile._id.toString();
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
};