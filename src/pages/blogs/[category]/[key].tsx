import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import { BlogItem as BlogItemType, FileContent } from '@/types';
import { getBlog, getMoreFromBlogByAuthorKey } from '@/pages/api/BlogService';
import styles from '@/styles/Blog.module.scss';
import BlogItem from '@/components/BlogItem';
import BlogList from '@/components/BlogList';

interface contextParam extends GetServerSidePropsContext {
  params: {
    category: string;
    key: string;
  };
}

type ServerProps = InferGetServerSidePropsType<typeof getServerSideProps>;

type BlogProp = {
  blog: BlogItemType | null;
  blogList: FileContent[];
};

interface BlogProps {
  props: BlogProp;
}

export default function Blog(props: ServerProps) {
  const router = useRouter();
  console.info(`props = ` + props);
  const { blog, blogList } = props;
  const { title } = blog;

  return (
    <div className={styles.container}>
      <Head>
        <title>DXHealth - {title}</title>
        <meta name="description" content="decentralized dx web3 {title}" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.blogItem}>
        <BlogItem blog={blog} />
      </div>
      <div className={styles.blogList}>
        <BlogList current={blog} blogList={blogList} />
      </div>
    </div>
  );
}

export const getServerSideProps = (context: contextParam) => {
  const { category, key } = context.params;
  const blog: BlogItemType | null = getBlog(category, key);
  const blogList: FileContent[] =
    blog != null ? getMoreFromBlogByAuthorKey(blog.authorKey, 10) : [];

  return {
    props: {
      blog,
      blogList,
    }, // will be passed to the page component as props
  };
};
