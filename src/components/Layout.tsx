// components/layout.js
import type { ReactElement } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import type { AppProps } from 'next/app'
import Header from './Header'

type LayoutProps = {
  children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mainLayout" >
      <style jsx>
      {`
        .mainLayout {
          background: #FCFCFC;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0px;
          left: 0px;
          overflow: hidden;
        }

        main {
          padding:0;
          margin:0;
        }
      `}  
      </style>
      <Header />
      <main>{children}</main>
      <Nav />
      <Footer />
    </div>
  )
}