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
var firstFile = null;

const getDatafromDocs = async () => {
  return new Promise( ( resolve, reject ) => {
    fs.readdir(docDir, (err, files) => {
      files.forEach( file => {
        const lPath = path.join( docDir, file );
        if( fs.statSync(lPath).isDirectory() && file != 'meta' ) {
          const [ ignore, category ] = file.split(":") 
          getFiles(path.resolve( lPath ))
          .then( async arr => {
            /* ドキュメントがある場合のみ、カテゴリーを作る　*/
            if( arr.length > 0 ) {
              metaData = loadMetaFile( path.join( lPath, 'meta.json'))
              await insertToMetaCache( category, metaData, arr )
              resolve( compileResult() ) 
            }
          })
        }
      });
    });
  });
}


const compileResult = ()=> {
  return {
    categories,
    catFiles,
    files,
    firstFile
  }
} 
const insertToMetaCache = async (category, metaData, fileArr )=>{
  categories.push( 
    { 
      meta: metaData,
      name: category
    });
  const categoryArr = []
  const sortedFileArr = fileArr.sort((fileA,fileB ) => -1 * ( fileA.mtime - fileB.mtime ) )

  if( firstFile == null || firstFile.mtime > sortedFileArr[0].mtime ) {
    firstFile = sortedFileArr[0]
  }

  sortedFileArr.forEach(fileItem => {

    files[fileItem.path] = fileItem
    categoryArr.push( {
      title: fileItem.title,
      date: fileItem.ctime,
      key: fileItem.path
    })
  })
  catFiles[category]=categoryArr
}

const loadMetaFile = ( filePath ) => {
  let rawdata = fs.readFileSync(filePath);
  let meta = JSON.parse(rawdata);
  return meta;
}

const getFiles = async ( dirpath )=>{
  const res = [];
  return new Promise( ( resolve, reject ) => {
    try{
      fs.readdir(dirpath, (err, _files) => {
        _files.forEach(file => {
          if( file != "meta.json") {
            let filepath = path.join(dirpath, file)
            let relativePath = filepath.replace(currentPath + '/', '')
            const stats = fs.statSync( filepath );
            res.push({
              ...getFileMeta(file),
              path: filepath,
              relativePath,
              filename: file,
              ctime: stats.ctime,
              mtime: stats.mtime
            });
          }
        });
        resolve( res )
      });
    } catch ( e ) {
      reject(e);
    }
  });
}

/* retrieve meta info from file. */
const getFileMeta = ( filename ) => {
  var tags = []
  var metareg = /^([^:]+):([^:]+):?([^.]*)\.md$/
  const [ignore, date, title, tagstr ] = filename.match( metareg )
  if( tagstr.length > 0 ) {
    tags = tagstr.split(',')
  }
  return {
    title,
    tags
  }
}

async function main(){
  var res  = await getDatafromDocs();
  Object.keys( res ).forEach( ( value ) => {
    let content = JSON.stringify( res[value], null, 4 );
    let filePath = path.join( metaPath, `${value}.json`);    
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



