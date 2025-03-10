// import '@/styles/globals.css';
// import type { AppProps } from 'next/app';
// import Layout from '@/layout';
// import NotifLayout from '@/layout/notifLayout';
// import LoginRegister from '@/layout/loginRegister';
// import ProfileContextProvider from '@/context'; // Pastikan ini mengimpor Provider yang sudah dimodifikasi
// import { useRouter } from 'next/router';
// import { Toast } from '@/components/ui/toast';
// import { useToast } from '@/hooks/useToast';

// export default function App({ Component, pageProps }: AppProps) {
//   const router = useRouter();
//   const { toastConfig, hideToast } = useToast();

//   // Tentukan layout berdasarkan path
//   const DefaultLayout =
//     router.pathname.startsWith('/login') || router.pathname.startsWith('/register')
//       ? LoginRegister
//       : router.pathname.startsWith('/notification')
//       ? NotifLayout
//       : Layout;

//   return (
//     <ProfileContextProvider>
//       <DefaultLayout>
//         {toastConfig && (
//           <Toast
//             title={toastConfig.title}
//             description={toastConfig.description}
//             variant={toastConfig.variant}
//             onClose={hideToast}
//           />
//         )}
//         <Component {...pageProps} />
//       </DefaultLayout>
//     </ProfileContextProvider>
//   );
// }

import ProfileContextProvider from '@/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'

const MainLayout = dynamic(() => import('@/layout'), { ssr: false })

export default function App({ Component, pageProps }: AppProps) {
  const isLogin = !!Cookies.get('token')

  return (
    <ProfileContextProvider>
      <MainLayout isUserLogin={isLogin}>
        <Component {...pageProps} />
      </MainLayout>
    </ProfileContextProvider>
  )
}
