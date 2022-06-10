export interface FileItemType {
  slug: string,
  date: string,
  key: string,
  tags: string[],
  category: string,
  author: string,
  authorKey: string,
  path: string,
  relativePath: string,
  filename: string,
  ctime: string,
  mtime: string

}

export type FileContent = {
  content: string,
  date: string,
  title: string,
  authorKey: string,
  category: string,
  slug: string
}

export interface SortedFileItem {
  category: string  
  key: string
  date: string

}

export interface BlogItem {
  authorKey:string,
  author: string,
  title:string,
  content:string,
  date: string,
  key: string
}
