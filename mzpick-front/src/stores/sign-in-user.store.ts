// import { create } from "zustand";
// import SignInUser from "../types/sign-in-user.interface";


// interface SignInUserStore {
//     signInUser: SignInUser | null;
//     setSignInUser: (signInUser: SignInUser | null) => void;
// }

// const useStore = create<SignInUserStore>(set => ({
//     signInUser: null,
//     setSignInUser: (signInUser: SignInUser | null) => set(state => ({ ...state, signInUser }))
// }));

// export default useStore;


// import { useCookies } from 'react-cookie';
// // import { create, useStore } from 'zustand';
// // import { SignInUser } from '../types';
// import { useEffect } from 'react';
// import { create } from 'zustand';
// import { signInRequest } from '../apis';
// import { ACCESS_TOKEN } from '../constants';
// import { SignInUser } from '../types';

// interface SignInUserStore {
//     signInUser: SignInUser | null;
//     setSignInUser: (signInUser: SignInUser | null) => void;
// }

// const [cookies, setCookie] = useCookies();

// // Zustand 상태 생성
// const useStore = create<SignInUserStore>(set => ({
//     signInUser: null,
//     setSignInUser: (signInUser: SignInUser | null) => set(state => ({ ...state, signInUser })),
// }));

// // AccessToken 값 설정 및 요청
// const accessToken = useStore((state) => state.signInUser);

// useEffect(() => {
//     const token = cookies[ACCESS_TOKEN];
//     if (token) {
//         signInRequest(token).then();
//         useStore.setState({ signInUser: token });
//     }
// }, [cookies[ACCESS_TOKEN]]);

// export default useStore;
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
    set((state) => ({ ...state, signInUser })), // 상태 업데이트
}));

// 사용하는 컴포넌트에서
const Component = () => {
  const { signInUser, setSignInUser } = useAuthStore();

  const handleLogin = (userData: SignInUser) => {
    setSignInUser(userData);
  };
};

export default useAuthStore;
