import { BlogItem, FileContent } from '@/types'

type BlogListProps ={
  current: BlogItem
  blogList: FileContent[]
}

export default function BlogList({current, blogList}: BlogListProps) {
  return (
    <>
    <h3>同じ作者からの投稿</h3>
    <ul>
    {
      blogList.map( ( item, i )  => {
        return <li key={i}>{item.title}</li>
      })
    }
    </ul>
    </>
    )
}