import useSWR from 'swr';
import { createContext, ReactNode, useContext } from 'react';
import { fetcher, getApiUrl } from '@/lib/utils';
import { User } from '@/lib/types';

// Tambahkan `isLoggedIn` ke dalam tipe User
type UserWithLoginStatus = User & {
  isLoggedIn: boolean;
};

// Buat konteks dengan tipe yang diperbarui
export const ProfileContext = createContext<UserWithLoginStatus>({
  id: 0,
  name: '',
  email: '',
  dob: new Date(),
  phone: '',
  hobby: '',
  isLoggedIn: false, // Nilai default untuk isLoggedIn
});

const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSWR(getApiUrl('user/me'), fetcher);

  // Tentukan status login berdasarkan apakah data ada atau tidak
  const userData = data?.data
    ? { ...data.data, isLoggedIn: true }
    : {
        id: 0,
        name: '',
        email: '',
        dob: new Date(),
        phone: '',
        hobby: '',
        isLoggedIn: false,
      };

  return (
    <ProfileContext.Provider value={userData}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

export default ProfileContextProvider;