import categories from '../../../docs/meta/categories.json'
import firstFile from '../../../docs/meta/firstFile.json'
const fs = require("fs");
const MarkdownIt = require('markdown-it')

const md = MarkdownIt();

export type FileContent = {
  content: string,
  date: string
}

type categoryType = {
  meta: any,
  name: string
}

export const getBlogCategory = ():any =>{
  return categories
}

export const getFirstBlog = async (): Promise<FileContent> => {
  var content = '';
  if( firstFile.path ) {
    try {
      content = fs.readFileSync( firstFile.path, 'utf8');
      content =  md.render( content )
    } catch (err) {
      console.log(err);
    }
  }
  return {
    content,
    date: ( new Date( firstFile.mtime ) ).toString()
  }
}
