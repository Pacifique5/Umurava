export type ChallengeDifficulty = 'easy' | 'medium' | 'hard';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: ChallengeDifficulty;
    duration: number;
    targetUrl?: string; // Optional target URL for security challenges
    createdAt: string;
    createdBy?: string; // Optional creator ID
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
}
