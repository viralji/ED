import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import UserProfile from '@/models/User';
import { OpenAI } from 'openai';
import { getRelevantSutras, patanjaliSutras } from '@/lib/patanjali-sutras';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    await dbConnect();
    const user = await UserProfile.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Extract keywords from the user's message for sutra matching
    const messageKeywords = extractKeywords(message);
    const relevantSutras = getRelevantSutras(messageKeywords);

    // Create context about the user's spiritual profile
    const userContext = createUserContext(user);

    // Check if the question is related to spiritual/philosophical matters
    const isVedicQuestion = await isQuestionVedic(message);

    let response: string;
    let sutraReferences: string[] = [];

    if (!isVedicQuestion) {
      // Politely redirect non-vedic questions
      response = generateRedirectionResponse(user.spiritualProfile.philosophicalIncline);
    } else {
      // Generate Vedic wisdom response
      const aiResponse = await generateVedicResponse(message, userContext, relevantSutras);
      response = aiResponse.response;
      sutraReferences = aiResponse.sutraReferences;
    }

    // Save the interaction to chat history
    user.chatHistory.push({
      question: message,
      response,
      sutraReferences,
      timestamp: new Date()
    });
    await user.save();

    return NextResponse.json({
      response,
      sutraReferences,
      relevantSutras: relevantSutras.slice(0, 3) // Include up to 3 relevant sutras
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function extractKeywords(message: string): string[] {
  const spiritualKeywords = [
    'peace', 'calm', 'meditation', 'stress', 'anxiety', 'fear', 'anger',
    'love', 'compassion', 'wisdom', 'consciousness', 'mind', 'thought',
    'ego', 'self', 'soul', 'god', 'divine', 'suffering', 'attachment',
    'detachment', 'liberation', 'moksha', 'dharma', 'karma', 'purpose',
    'meaning', 'truth', 'reality', 'illusion', 'maya', 'practice',
    'discipline', 'concentration', 'focus', 'awareness', 'presence',
    'breath', 'breathing', 'pranayama', 'asana', 'yoga', 'spiritual',
    'enlightenment', 'awakening', 'realization', 'surrender', 'devotion',
    'service', 'relationships', 'family', 'work', 'career', 'balance'
  ];

  return spiritualKeywords.filter(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );
}

function createUserContext(user: any): string {
  const profile = user.spiritualProfile;
  return `User Profile:
- Experience Level: ${profile.experience}
- Meditation Practice: ${profile.meditationPractice}
- Philosophical Inclination: ${profile.philosophicalIncline}
- Life Stage: ${profile.lifeStage}
- Current Challenges: ${profile.currentChallenges.join(', ')}
- Spiritual Goals: ${profile.spiritualGoals.join(', ')}`;
}

async function isQuestionVedic(message: string): Promise<boolean> {
  const prompt = `Determine if the following question is related to spirituality, philosophy, personal growth, mental wellbeing, yoga, meditation, life guidance, or ancient wisdom. Reply with only "true" or "false".

Question: "${message}"`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 10,
      temperature: 0.1,
    });

    return completion.choices[0]?.message?.content?.trim().toLowerCase() === 'true';
  } catch (error) {
    console.error('Error checking if question is vedic:', error);
    return true; // Default to treating as vedic if check fails
  }
}

function generateRedirectionResponse(philosophicalIncline: string): string {
  const responses = {
    devotional: "🙏 Namaste, dear seeker. I am ChatGuru, devoted to guiding you on the path of ancient Vedic wisdom through Patanjali's Yoga Sutras. While I understand you may have other questions, my purpose is to help you discover the eternal truths within yourself. Perhaps we could explore how the timeless wisdom of yoga can illuminate whatever challenges you're facing? What aspect of your inner journey would you like to explore today?",
    
    intellectual: "🕉️ Greetings, fellow seeker of truth. I am ChatGuru, dedicated to sharing the profound wisdom of Patanjali's Yoga Sutras. My role is to help you explore the depths of Vedic philosophy and its practical applications for modern life. Rather than discussing other topics, shall we delve into the ancient teachings that can provide lasting insights? What philosophical question about life, consciousness, or the nature of reality interests you?",
    
    practical: "🌅 Hello, friend. I am ChatGuru, here to offer practical guidance rooted in the timeless wisdom of Patanjali's Yoga Sutras. My purpose is to help you apply ancient Vedic principles to navigate life's challenges with greater wisdom and peace. Instead of other topics, let's focus on how these eternal teachings can serve your daily life. What practical challenge or life situation could benefit from yogic wisdom?",
    
    mystical: "✨ Divine soul, I am ChatGuru, a humble guide on the mystical path of Patanjali's Yoga Sutras. My essence is devoted to helping you explore the deeper mysteries of consciousness and spiritual realization. While worldly matters have their place, our time together is sacred for inner exploration. What aspect of your spiritual journey or inner experience calls for the light of ancient wisdom?"
  };

  return responses[philosophicalIncline as keyof typeof responses] || responses.practical;
}

async function generateVedicResponse(
  message: string, 
  userContext: string, 
  relevantSutras: any[]
): Promise<{ response: string; sutraReferences: string[] }> {
  
  const sutraContext = relevantSutras.map(sutra => 
    `Sutra ${sutra.chapter}.${sutra.sutraNumber}: "${sutra.translation}" - ${sutra.commentary}`
  ).join('\n\n');

  const prompt = `You are ChatGuru, a wise spiritual guide who responds exclusively based on Patanjali's Yoga Sutras. You embody ancient Vedic wisdom with compassion and practical insight.

${userContext}

Relevant Yoga Sutras:
${sutraContext}

User's Question: "${message}"

Instructions:
1. Respond only with wisdom from Patanjali's Yoga Sutras
2. Tailor your response to the user's spiritual profile and current challenges
3. Be compassionate, wise, and practical
4. Reference specific sutras when relevant
5. Offer actionable spiritual guidance
6. Keep response concise but profound (200-300 words)
7. End with a gentle encouragement or practice suggestion
8. Use a warm, sage-like tone

Response format should be natural conversation, not formal teaching.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I cannot provide guidance at this moment. Please try again.';
    
    // Extract sutra references from the response
    const sutraReferences = extractSutraReferences(response, relevantSutras);

    return { response, sutraReferences };
  } catch (error) {
    console.error('Error generating vedic response:', error);
    return {
      response: "🙏 Forgive me, dear seeker. The cosmic energies seem disrupted at this moment. Please ask your question again, and I shall do my best to share the wisdom of the ancient sages with you.",
      sutraReferences: []
    };
  }
}

function extractSutraReferences(response: string, relevantSutras: any[]): string[] {
  const references: string[] = [];
  
  relevantSutras.forEach(sutra => {
    const sutraRef = `${sutra.chapter}.${sutra.sutraNumber}`;
    if (response.includes(sutraRef) || response.includes(`${sutra.chapter}-${sutra.sutraNumber}`)) {
      references.push(sutraRef);
    }
  });

  return references;
}