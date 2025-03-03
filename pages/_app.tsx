import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/layout'
import NotifLayout from '@/layout/notifLayout'
import { useRouter } from 'next/router';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const DefaultLayout = router.pathname.startsWith("/notification")
  ? NotifLayout
  : Layout;
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
 
}
