import categories from '../../../docs/meta/categories.json'
import files from '../../../docs/meta/files.json'
import { FileItemType, SortedFileItem, BlogItem, FileContent } from '@/types'
import sortedFileKeys from '../../../docs/meta/sortedFileKeys.json'
const fs = require("fs");
const MarkdownIt = require('markdown-it')

const md = MarkdownIt();



type categoryType = {
  meta: any,
  name: string
}

export const getBlogCategory = ():any =>{
  return categories
}

const getFileContent = ( path: string ) => {
  var content = null;
  try {
    content = fs.readFileSync( path, 'utf8');
    const [_, title ] = content.match(/#(.+)/)
    content =  md.render( content )
    return { 
      title,
      content
    }

  } catch (err) {
    console.log(err);
    return { 
      title:"",
      content:""
    }
  }
}

export const getFirstBlogLists = async ( maxLength : number ): Promise<FileContent[]> => {
  const res = [];
  var content = '';
  const max = Math.min( maxLength, sortedFileKeys.length )
  const _files = files as Record<string, any>
  for( var i=0; i< max; i++ ) {
    let fileInfo  = sortedFileKeys[i];
    let fileItem = _files[fileInfo.key]
    res.push ( createListItemFromFileItem( fileItem ))
  }
  return res;
}

const createListItemFromFileItem = ( fileItem: FileItemType ): FileContent=> {
    let path = fileItem.path
    let { content, title } = getFileContent( path )
    let date =  ( new Date( fileItem.date ) ).toString()
    return {
      title,
      category: fileItem.category,
      authorKey: fileItem.authorKey,
      slug: fileItem.slug,
      key: fileItem.key,
      content,
      date: ( new Date( date )).toLocaleDateString()
    };
}


export const getMoreFromBlogByAuthorKey = ( authorKey: string, maxLength: number = 10 ): FileContent[] => {
  const res: FileContent[] = []
  let currentNum = 0; 
  let max = Math.min( maxLength, sortedFileKeys.length )
  let i = 0;
  const _files = files as Record<string, any>

  while( i < max && currentNum < max ) {
    let fileInfo  = sortedFileKeys[i];
    let fileItem = _files[fileInfo.key]
    if( fileItem.authorKey == authorKey ) {
      currentNum++;
      res.push ( createListItemFromFileItem( fileItem ))
    }
    i++;
  }
  return res;
}

export const getBlog = ( category:string, slug:string ): BlogItem | null => {
  var res = null;
  const _files = files as Record<string, any>
  const fileItem: SortedFileItem | undefined = sortedFileKeys.find( ( item:SortedFileItem ) => ( item.category === category && item.key.indexOf(`:${slug}`) > 0  ))
  if( fileItem ){
    const { key } = fileItem
    let file = _files[key]
    let { path, author, authorKey } = file
    let { content, title } = getFileContent( path )
    let date =  ( new Date( fileItem.date ) ).toString()
    content = content.replace( /^\<h1\>.+\<\/h1\>\n?/, '')
    res = {
      key,
      title,
      author,
      authorKey,
      content,
      date: ( new Date( date )).toLocaleDateString()
    }
  }

  return res;
}
