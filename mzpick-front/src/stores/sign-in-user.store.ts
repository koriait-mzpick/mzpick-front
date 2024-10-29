import { create } from 'zustand';

type SignInUser = {
  userId: string;
  userName: string;
  // signInUser에 필요한 다른 속성들...
};

type AuthState = {
  signInUser: SignInUser | null;
  setSignInUser: (signInUser: SignInUser) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  signInUser: null,
  setSignInUser: (signInUser) =>
    set((state) => ({ ...state, signInUser })), 
}));


const Component = () => {

  const { signInUser, setSignInUser } = useAuthStore();

  const handleLogin = (userData: SignInUser) => {
    setSignInUser(userData);
  };
};

export default useAuthStore;
