import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

import '@/styles/global.scss';

type LayoutProps = AppProps & {
  Component: React.ReactNode,
};

export default function MyApp({ Component, pageProps }: LayoutProps) {
    
    return ( 
      <Layout>
        <Component {...pageProps} />
      </Layout>
      )
}
