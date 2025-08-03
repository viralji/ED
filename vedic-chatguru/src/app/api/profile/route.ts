import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profileData = await req.json();
    
    await dbConnect();
    const user = await UserProfile.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          spiritualProfile: profileData,
          profileCompleted: true
        }
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully',
      profile: user.spiritualProfile 
    });

  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await UserProfile.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      profile: user.spiritualProfile,
      profileCompleted: user.profileCompleted,
      chatHistory: user.chatHistory.slice(-10) // Return last 10 conversations
    });

  } catch (error) {
    console.error('Profile GET API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}