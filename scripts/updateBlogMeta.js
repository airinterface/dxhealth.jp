const path = require('path')
const fs = require('fs');
const { exec } = require("child_process")
const currentPath = path.resolve(process.cwd())
const docDir = path.join( currentPath , 'docs');
const metaPath = path.join( docDir, 'meta');
console.info( "docDir = " + docDir)
var categories = [];
var catFiles = {}
var files = {}
var sortedFileKeys = [];
const executeCommand = require('./executeCommand')

const getAuthorMap = ()=>{
  let rawdata = fs.readFileSync( path.join( docDir, 'meta', 'authorMap.json'));
  let authors = JSON.parse(rawdata);
  return authors;
}

const getDatafromDocs = async () => {
  const authorMap = getAuthorMap();
  await  new Promise( ( resolve, reject ) => {
    fs.readdir(docDir, async (err, files) => {
      for ( var i =0; i < files.length; i++ ) {
        let file = files[i]
        const lPath = path.join( docDir, file );
        if( fs.statSync(lPath).isDirectory() && file != 'meta' ) {
          const [ ignore, category ] = file.split(":") 
          const arr = await getFiles(category, path.resolve( lPath ), authorMap)
          console.info("arr === " + JSON.stringify( arr ))
          /* ドキュメントがある場合のみ、カテゴリーを作る　*/
          if( arr.length > 0 ) {
            metaData = loadMetaFile( path.join( lPath, 'meta.json'))
            await insertToMetaCache( category, metaData, arr )
          }
        }

      }
      resolve()
    });
  });
  sortedFileKeys = sortFileKeys( sortedFileKeys );
  return compileResult(); 
}

const sortFunction = ( fileA , fileB ) => {
  var res = 0;
  if( fileA.date == fileB.date ) {
    res =   -1 * ( fileA.mtime - fileB.mtime ) 
  } else {
    res = -1 * ( fileA.date - fileB.date )
  }
  return res;
}

const sortFileKeys = (_fileKeys)=>{
  console.log(" sortedFileKeys - " + sortedFileKeys )
  _fileKeys = _fileKeys.sort( sortFunction )
  return _fileKeys;
}

const compileResult = ()=> {
  res =  {
    categories,
    catFiles,
    files,
    sortedFileKeys
  }
  return res;
} 
const insertToMetaCache = async (category, metaData, fileArr )=>{
  categories.push( 
    { 
      meta: metaData,
      name: category
    });
  const categoryArr = []
  const sortedFileArr = fileArr.sort( sortFunction )

  sortedFileArr.forEach(fileItem => {
    sortedFileKeys.push( {
      category: category,
      key: fileItem.key,
      date: fileItem.date

    })
    files[fileItem.key] = fileItem
    categoryArr.push( {
      title: fileItem.title,
      date: fileItem.date,
      key: fileItem.key,
    })
  })
  catFiles[category]=categoryArr
}

const loadMetaFile = ( filePath ) => {
  let rawdata = fs.readFileSync(filePath);
  let meta = JSON.parse(rawdata);
  return meta;
}

const getFiles = async ( category, dirpath, authorMap)=>{
  const res = [];
  return new Promise( ( resolve, reject ) => {
    try{
      fs.readdir(dirpath, async (err, _files) => {
        for( var i = 0; i < _files.length; i ++ ) {
          const file = _files[i];          
          if( file != "meta.json") {
            try{
              let filepath = path.join(dirpath, file)
              let relativePath = filepath.replace(currentPath + '/', '')
              const stats = fs.statSync( filepath );
              let authorKey = await getFileAuthor( relativePath )
              let author = authorMap[authorKey] || authorKey
              res.push({
                ...getFileMeta(file),
                category,
                author,
                authorKey,
                path: filepath,
                key: relativePath,
                relativePath,
                filename: file,
                ctime: stats.ctime,
                mtime: stats.mtime
              });
            } catch( e ) {
               console.info( 'error: ' + e )
            }

          }
        }
        resolve( res )
      });
    } catch ( e ) {
      reject(e);
    }
  });
}

const getFileAuthor = async ( relativeFilePath ) => {
  var author = "unknown"
  var command = `git log -1 --pretty=format:'%an' ${relativeFilePath}`   
  try {
    author = await executeCommand(  command )
  } catch( e ) {
    console.log( e );
  }
  return author;
}

/* retrieve meta info from file. */
const getFileMeta = ( filename ) => {
  var tags = []
  var metareg = /^([^:]+):([^:]+):?([^.]*)\.md$/
  const [ignore, date, slug, tagstr ] = filename.match( metareg )
  if( tagstr.length > 0 ) {
    tags = tagstr.split(',')
  }
  let [_, year, month, day ] =  date.match(/([\d]{4})([\d]{2})([\d]{2})/)
  console.log(`${year}-${month}-${day}T00:00:00Z`)
  let authorDate = new Date(`${year}-${month}-${day}T00:00:00Z`)
  console.log("date = " + authorDate )
  return {
    slug,
    date: authorDate,
    tags
  }
}

async function main(){
  var res  = await getDatafromDocs();
  Object.keys( res ).forEach( ( value ) => {
    let content = JSON.stringify( res[value], null, 4 );
    let filePath = path.join( metaPath, `${value}.json`);
    console.log( 'writing : ' + filePath );
    fs.writeFile( filePath, content, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${filePath} written successfully.`)
      }
    });

  } )
}

if (typeof require !== 'undefined' && require.main === module) {
  main();
} else {
  module.exports.getDatafromDocs = getDatafromDocs;
}



