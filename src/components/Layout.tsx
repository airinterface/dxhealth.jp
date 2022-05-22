// components/layout.js
import type { ReactElement } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import type { AppProps } from 'next/app'

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <main>{children}</main>
      <Nav />
      <Footer />
    </>
  )
}