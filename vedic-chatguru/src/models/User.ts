import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  email: string;
  name: string;
  image?: string;
  spiritualProfile: {
    experience: 'beginner' | 'intermediate' | 'advanced';
    currentChallenges: string[];
    spiritualGoals: string[];
    meditationPractice: 'none' | 'occasional' | 'regular' | 'daily';
    philosophicalIncline: 'devotional' | 'intellectual' | 'practical' | 'mystical';
    lifeStage: 'student' | 'householder' | 'seeker' | 'renunciant';
    primaryConcerns: string[];
  };
  chatHistory: {
    question: string;
    response: string;
    sutraReferences: string[];
    timestamp: Date;
  }[];
  profileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  spiritualProfile: {
    experience: { 
      type: String, 
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    currentChallenges: [{ type: String }],
    spiritualGoals: [{ type: String }],
    meditationPractice: { 
      type: String, 
      enum: ['none', 'occasional', 'regular', 'daily'],
      default: 'none'
    },
    philosophicalIncline: { 
      type: String, 
      enum: ['devotional', 'intellectual', 'practical', 'mystical'],
      default: 'practical'
    },
    lifeStage: { 
      type: String, 
      enum: ['student', 'householder', 'seeker', 'renunciant'],
      default: 'householder'
    },
    primaryConcerns: [{ type: String }]
  },
  chatHistory: [{
    question: { type: String, required: true },
    response: { type: String, required: true },
    sutraReferences: [{ type: String }],
    timestamp: { type: Date, default: Date.now }
  }],
  profileCompleted: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);