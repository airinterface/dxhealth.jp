import Head from 'next/head';
import Image from 'next/image';
import { getBlogCategory, getFirstBlogLists} from '@/pages/api/BlogService'
import { FileContent } from '@/types'
import { useRef, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Link from 'next/link'


import styles from '@/styles/Home.module.css';


interface Props {
  blogs : FileContent[]
}

export default function Home( { blogs } :Props ) {
  const containerRef = useRef(null)
  const categories:any[] = getBlogCategory()

  return (
    <div className={styles.container}>
      <Head>
        <title>DXHealth</title>
        <meta
          name="description"
          content="Up to date Digital Health technology and its use"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div ref={containerRef}>
        </div>
        <div className={styles.grid}>
          { blogs.map( ( blogItem, i )=> (
                <Link key={i} href={`/blogs/${blogItem.category}/${blogItem.slug}`}>
                  <div  className={styles.card}>
                    <h2 key="1">{blogItem.title} &rarr;</h2>
                    <p>{blogItem.date}</p>
                  </div>
                </Link>
            )
          )}
        </div>
      </main>  
    </div>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
  const blogs = await getFirstBlogLists( 6 )
  return {
    props: {
      blogs: blogs
    }
  }
}
