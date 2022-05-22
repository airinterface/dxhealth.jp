const path = require('path')
const fs = require('fs');
const docDir = path.join( path.resolve(process.cwd()), 'docs');
const metaFile = path.join( docDir, 'meta.json');
console.info( "docDir = " + docDir)
var categories = [];
var catFiles = {}
var files = {}
var metaCache = {}
const getDatafromDocs = async () => {
  return new Promise( ( resoleve, reject ) => {
    fs.readdir(docDir, (err, files) => {
      files.forEach( file => {
        const lPath = path.join( docDir, file );
        if( fs.statSync(lPath).isDirectory() ) {
          const [ ignore, category ] = file.split(":") 
          getFiles(path.resolve( lPath ))
          .then( arr => {
            /* ドキュメントがある場合のみ、カテゴリーを作る　*/
            if( arr.length > 0 ) {
              insertToMetaCache( category, arr )  
            }
          })
        }
      });
    });
  });
}

const insertToMetaCache = (category, fileArr )=>{

}

const getFiles = async ( dirpath )=>{
  const res = [];
  return new Promise( ( resolve, reject ) => {
    try{
      fs.readdir(dirpath, (err, files) => {
        files.forEach(file => {
          let filepath = path.join(dirpath, file)
          const stats = fs.statSync( filepath );
          getFileMeta( file )
          res.push({
            ...getFileMeta(file),
            path: filepath,
            filename: file,
            ctime: stats.ctime,
            mtime: stats.mtime
          });
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
