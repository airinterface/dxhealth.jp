import { BlogItem, FileContent } from '@/types';
import Link from 'next/link';

type BlogListProps = {
  current: BlogItem;
  blogList: FileContent[];
};

export default function BlogList({ current, blogList }: BlogListProps) {
  return (
    <>
      <style jsx>
        {`
          div.top {
            font-family: 'GenJyuuGothicMonoMedium', 'Times New Roman', Times;
            font-size: 1rem;
            border-bottom: 1px solid #eaeaea;
            line-height: 2em;
            margin-bottom: 1em;
          }

          ul {
            list-style-type: none;
            list-style-position: inside;
            padding-left: 0;
            margin-block-start: 0px;
            margin-block-end: 0px;
          }

          li {
            font-family: 'GenJyuuGothicMonoMedium', 'Times New Roman', Times;
            font-size: 1em;
            margin-bottom: 1em;
          }

          li:hover,
          li:focus,
          li:active {
            cursor: pointer;
            color: #0070f3;
            border-color: #0070f3;
          }
          @media only screen and (max-width: 800px) {
            ul {
              overflow-x: auto;
              width: 100%;
              overflow-y: hidden;
              display: flex;
              flex-direction: row;
              flex-flow: row nowrap;
            }
            li {
              font-family: 'GenJyuuGothicMonoMedium', 'Times New Roman', Times;
              white-space: normal;
              display: inline-block;
              cursor: pointer;
              margin-right: 1rem;
              padding: 1rem 0.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              align-self: stretch;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            li:hover,
            li:focus,
            li:active {
              color: #0070f3;
              border-color: #0070f3;
            }
            div.cardItem {
              height: 100%;
              display: flex;
              flex-direction: column;
            }

            span.title {
              display: block;
              font-size: 1rem;
              flex: 1;
            }
            span.date {
              display: block;
              font-size: 1rem;
              height: 1.8rem;
              width: 200px;
              text-align: right;
            }
          }
        `}
      </style>
      <div className="top">同じ作者からの投稿</div>
      <ul>
        {blogList.map((item, i) => {
          return (
            <li key={item.key}>
              <Link href={`/blogs/${item.category}/${item.slug}`}>
                <div className="cardItem">
                  <span className="title">{item.title}</span>
                  <span className="date">{item.date}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
