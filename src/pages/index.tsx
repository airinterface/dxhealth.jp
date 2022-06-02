import Head from 'next/head';
import Image from 'next/image';
import { getBlogCategory, getFirstBlog } from '@/pages/api/BlogService'
import { useRef, useEffect } from 'react'

import styles from '@/styles/Home.module.css';


interface Props {
  content: string;
  date: string;
}

export default function Home( { content, date }:Props ) {
  const containerRef = useRef(null)
  const categories:any[] = getBlogCategory()

  useEffect(()=> {
    if( containerRef.current ) {
      containerRef.current.replaceWith( new DOMParser().parseFromString(content, 'text/html').body.childNodes[0] );
    }
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>DXHealth</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div ref={containerRef}>
        </div>
        <div className={styles.grid}>
          { categories.map( category => (
                <a href="https://nextjs.org/docs" className={styles.card}>
                  <h2 key="1">{category.name} &rarr;</h2>
                  <p key="2">{category.meta.description}</p>
                </a>
            )
          )}

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=typescript-nextjs-starter"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>  
    </div>
  );
}


Home.getInitialProps =  async () =>{
  const {
    content,
    date
  } = await getFirstBlog()
  console.info( 'content1 == ' + content )
  return {
    content,
    date
  }
}
