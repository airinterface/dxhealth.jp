// components/layout.js
import type { ReactElement } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import type { AppProps } from 'next/app';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mainLayout">
      <style jsx>
        {`
          .mainLayout {
            background: #fcfcfc;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          main {
            flex: 1;
            padding: 10px 20px 0px 20px;
            margin: 0;
            overflow-y: scroll;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            overflow-y: auto;
          }
        `}
      </style>
      <Header />
      <main>{children}</main>
      <Nav />
      <Footer />
    </div>
  );
}
