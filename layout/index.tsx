
import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from '@/components/ui/sonner'
import DropdownContainer from '@/container/dropdown-container'

import Link from 'next/link'
import HeaderPageContainer from '@/container/header-page-container'

const MainLayout = ({
  children,
  isUserLogin = false,
}: {
  children: ReactNode
  isUserLogin: boolean
}) => {
  

  if (!isUserLogin) {
    return (
      <div className='flex justify-center items-center'>
        <Head>
          <title>Sanber Daily</title>
          <meta name="description" content="Sanber Daily" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col w-[480px] items-center justify-center">
          <HeaderPageContainer />
          <main className="w-full max-w-sm">{children}</main>
          <Toaster />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex justify-center items-center" >
      <Head>
        <title>Sanber Daily</title>
        <meta name="description" content="Sanber Daily" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center0 text-gray-900">
        <header className="max-w-xl bg-white dark:bg-gray-800 shadow-md p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <h1 className="text-xl font-bold">Sanber Daily</h1>
            </Link>
            <div className="flex justify-center items-center gap-2">
              <DropdownContainer />
            </div>
          </div>
        </header>
        <main className="container mx-auto max-w-xl p-4">{children}</main>
        <Toaster />
      </div>
    </div>
  )
}

export default MainLayout
