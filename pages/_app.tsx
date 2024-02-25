
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"
import {Provider} from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store from '@/redux/store'
import {siteConfig} from '@/config/site'
import {toastOptions} from '@/config/toaster'
import ModalManager from '@/components/ui/modals/ModalManager'
import '@/styles/globals.scss'


const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider 
      client={queryClient}
    >
     <SessionProvider session={pageProps.session}>
      <Provider store={store}>

         <Head>
          <title>{siteConfig?.title}</title>
          <meta 
            name="description" 
            content={siteConfig?.description} 
          />
          <link rel="shortcut icon" href="/icon.ico" />
        </Head>

        <Toaster 
          toastOptions={toastOptions}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalManager />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
     </SessionProvider>
    </QueryClientProvider>
    )
}
