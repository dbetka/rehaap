// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readdir } = require('fs').promises
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { writeFile } = require('fs')

function writeTextIntoFile (destination, text) {
  return new Promise((resolve, reject) => {
    writeFile(destination, text, error => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

async function getFiles (dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  }))
  return Array.prototype.concat(...files)
}

getFiles('src/style').then(array => {
  let fileContent = ''
  const sourceDir = __dirname.replace('scripts', '') + 'src/'
  for (const file of array) {
    const fileSrc = file.replace(sourceDir, '')
    if (fileSrc.indexOf('__cache__') >= 0) continue
    fileContent += `@import "${fileSrc}"\n`
  }
  const dest = sourceDir + 'style/__cache__/index.sass'
  writeTextIntoFile(dest, fileContent).then(() => console.log('done!'))
})
