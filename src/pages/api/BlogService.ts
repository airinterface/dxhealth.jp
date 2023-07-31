import categories from '../../../docs/meta/categories.json';
import files from '../../../docs/meta/files.json';
import { FileItemType, SortedFileItem, BlogItem, FileContent } from '@/types';
import sortedFileKeys from '../../../docs/meta/sortedFileKeys.json';
const fs = require(`fs`);
const md = require(`markdown-it`)();
const anchor = require('markdown-it-anchor').default

md.use(anchor, {
  level: 1,
  // slugify: string => string,
  permalink: false,
  // renderPermalink: (slug, opts, state, permalink) => {},
  permalinkClass: 'header-anchor',
  permalinkSymbol: '¶',
  permalinkBefore: false
})


type categoryType = {
  meta: any;
  name: string;
};

export const getBlogCategory = (): any => {
  return categories;
};

const getFileContent = (path: string) => {
  let content = null;
  try {
    content = fs.readFileSync(path, `utf8`);
    const [_, title] = content.match(/#(.+)/);
    content = md.render(content);
    return {
      title,
      content,
    };
  } catch (err) {
    console.log(err);
    return {
      title: ``,
      content: ``,
    };
  }
};

export const getFirstBlogLists = async (
  maxLength: number,
): Promise<FileContent[]> => {
  const res = [];
  const content = ``;
  const max = Math.min(maxLength, sortedFileKeys.length);
  const _files = files as Record<string, any>;
  for (let i = 0; i < max; i++) {
    const fileInfo = sortedFileKeys[i];
    const fileItem = _files[fileInfo.key];
    res.push(createListItemFromFileItem(fileItem));
  }
  return res;
};

const createListItemFromFileItem = (fileItem: FileItemType): FileContent => {
  const path = fileItem.path;
  const { content, title } = getFileContent(path);
  const date = new Date(fileItem.date).toString();
  return {
    title,
    category: fileItem.category,
    authorKey: fileItem.authorKey,
    slug: fileItem.slug,
    key: fileItem.key,
    content,
    date: new Date(date).toLocaleDateString(),
  };
};

export const getMoreFromBlogByAuthorKey = (
  authorKey: string,
  maxLength = 10,
): FileContent[] => {
  const res: FileContent[] = [];
  let currentNum = 0;
  const max = Math.min(maxLength, sortedFileKeys.length);
  let i = 0;
  const _files = files as Record<string, any>;

  while (i < max && currentNum < max) {
    const fileInfo = sortedFileKeys[i];
    const fileItem = _files[fileInfo.key];
    if (fileItem.authorKey == authorKey) {
      currentNum++;
      res.push(createListItemFromFileItem(fileItem));
    }
    i++;
  }
  return res;
};

export const getBlog = (category: string, slug: string): BlogItem | null => {
  let res = null;
  const _files = files as Record<string, any>;
  const fileItem: SortedFileItem | undefined = sortedFileKeys.find(
    (item: SortedFileItem) =>
      item.category === category && item.key.indexOf(`:${slug}`) > 0,
  );
  if (fileItem) {
    const { key } = fileItem;
    const file = _files[key];
    const { path, author, authorKey } = file;
    /* eslint-disable  prefer-const*/
    let { content, title } = getFileContent(path);
    const date = new Date(fileItem.date).toString();
    console.info("content============")
    console.info(content.substring(0, 10))
    content = content.replace(/^\<h1[^\>]*\>[^\<]+\<\/h1\>\n?/, ``);
    res = {
      key,
      title,
      author,
      authorKey,
      content,
      date: new Date(date).toLocaleDateString(),
    };
  }

  return res;
};
