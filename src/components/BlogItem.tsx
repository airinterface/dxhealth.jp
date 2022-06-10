import styles from '@/styles/BlogItem.module.scss'
import { BlogItem as BlogItemType } from '@/types'

type BlogItemProp = {
  blog: BlogItemType
}

export default function BlogItem( { blog } : BlogItemProp ) {
  const { content, date, title}  = blog 
  return(
      <div className={styles.blogContent}>
        <h1>{title}</h1>
        <p className="dateItem">{date}</p>
        <div ref={(refNode)=> {
          if( refNode ) {
           refNode.innerHTML = content 
          }
        }}></div>
      </div>
      )
}
