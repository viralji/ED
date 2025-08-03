# ChatGuru - Ancient Vedic Wisdom for Modern Life 🕉️

ChatGuru is a spiritual guidance platform that provides personalized wisdom based on Patanjali's Yoga Sutras. Using AI technology, it delivers authentic Vedic teachings tailored to your individual spiritual journey, current challenges, and life stage.

## 🌟 Features

- **Personalized Spiritual Profile**: Complete an initial questionnaire to receive guidance tailored to your spiritual inclination, experience level, and current challenges
- **Authentic Vedic Wisdom**: All responses are grounded in genuine Patanjali Yoga Sutras with proper Sanskrit references
- **Intelligent Conversation**: AI-powered responses that stay focused on spiritual matters while politely redirecting off-topic questions
- **Progressive Learning**: Guidance that evolves with your spiritual development
- **Beautiful UI**: Modern, responsive design with spiritual aesthetics
- **Secure Authentication**: Google OAuth integration for secure, easy sign-in
- **Chat History**: Track your spiritual conversations and growth over time

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI GPT-4 for intelligent responses
- **Animations**: Framer Motion for smooth user experience
- **Icons**: Lucide React for beautiful, spiritual icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance (local or cloud)
- Google OAuth credentials
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vedic-chatguru
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.local` and update with your credentials:
   ```env
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/vedic-chatguru

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
vedic-chatguru/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   │   ├── auth/       # NextAuth configuration
│   │   │   ├── chat/       # Chat API endpoint
│   │   │   └── profile/    # User profile API
│   │   ├── auth/           # Authentication pages
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ChatInterface.tsx       # Main chat interface
│   │   └── ProfileQuestionnaire.tsx # Spiritual profile setup
│   ├── lib/                # Utility functions
│   │   ├── auth.ts         # NextAuth configuration
│   │   ├── mongodb.ts      # Database connection
│   │   └── patanjali-sutras.ts # Yoga Sutras database
│   ├── models/             # Database models
│   │   └── User.ts         # User profile schema
│   └── types/              # TypeScript definitions
├── .env.local              # Environment variables
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🧘‍♂️ How It Works

### 1. Spiritual Profile Creation
New users complete a comprehensive questionnaire covering:
- Spiritual experience level
- Meditation practice frequency
- Philosophical inclination (Devotional, Intellectual, Practical, Mystical)
- Life stage (Student, Householder, Seeker, Renunciant)
- Current challenges and spiritual goals

### 2. AI-Powered Responses
- Questions are analyzed for spiritual relevance
- Relevant Yoga Sutras are matched based on keywords
- Personalized responses are generated considering user profile
- Non-spiritual questions are politely redirected

### 3. Sutra Integration
- Each response includes relevant Patanjali Yoga Sutras
- Sanskrit text, transliteration, and translation provided
- Practical applications suggested for modern life

## 🌸 Spiritual Philosophy

ChatGuru follows the authentic teachings of Patanjali's Yoga Sutras, focusing on:

- **Ethical Foundation** (Yamas and Niyamas)
- **Physical Practice** (Asana and Pranayama)
- **Mental Discipline** (Pratyahara, Dharana, Dhyana)
- **Spiritual Realization** (Samadhi)

The platform maintains sacred boundaries, gently redirecting conversations back to spiritual matters while honoring each user's unique path.

## 🤝 Contributing

We welcome contributions that align with the spiritual mission of this project. Please:

1. Fork the repository
2. Create a feature branch
3. Ensure all changes respect the Vedic principles
4. Submit a pull request with detailed description

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Sage Patanjali** for the timeless wisdom of the Yoga Sutras
- **OpenAI** for AI technology that enables personalized guidance
- **The global yoga community** for keeping these teachings alive

## 📧 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

*"Yoga is the cessation of fluctuations of the mind. Then the seer abides in their own true nature."* - Patanjali Yoga Sutra 1.2-1.3

🕉️ **May this platform serve your spiritual journey with wisdom, compassion, and authenticity.**
