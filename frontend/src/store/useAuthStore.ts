import { CognitoUserSession, CognitoUser } from 'amazon-cognito-identity-js';
import { StateCreator, create } from 'zustand';

interface AuthStore {
  user: CognitoUser | null;
  session: CognitoUserSession | null;
  setUserAndSession: (user: AuthStore['user'], session: AuthStore['session']) => void;
  clearUserAndSession: () => void;
  isLoading: boolean;
}

// Define un StateCreator personalizado
const createState: StateCreator<AuthStore> = (set) => ({
  user: null,
  session: null,
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading: !isLoading }),
  setUserAndSession: (user, session) => set({ user, session }),
  clearUserAndSession: () => set({ user: null, session: null }),
});

export const useAuthStore = create<AuthStore>(createState);
