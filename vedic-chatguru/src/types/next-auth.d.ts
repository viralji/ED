import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      profileCompleted: boolean;
    };
  }

  interface User {
    profileCompleted: boolean;
  }
}