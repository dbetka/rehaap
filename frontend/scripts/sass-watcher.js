const path = require('path')
const { readdir } = require('fs').promises
const { writeFile } = require('fs')
const chokidar = require('chokidar')
const { Reset, FgRed, FgGreen, FgCyan } = require('./lib/console-colors')

const projectDir = __dirname.replace('frontend/scripts', '')
const sourceDir = __dirname.replace('scripts', '') + 'src/'
const styleDir = 'src/style'
const dest = sourceDir + 'style/__cache__/index.sass'

const message = ({
  result = 'Processing...',
  action = 'Watching...',
  done = false,
}) => {
  const log = (...params) => console.log(params.join('') + Reset)
  console.clear()
  log(FgRed, 'sass-watcher', Reset, '        @dbetka')
  log('  input:   ', styleDir)
  log('  dest:    ', dest.replace(projectDir, ''))
  log('  status:  ', FgCyan, action)
  log('  ')
  log('  result:  ', FgCyan, (done ? FgGreen + 'Cached!' : result))
}
const isCache = (path) => path.indexOf('__cache__') >= 0

let timeoutId = null

function onChange (path) {
  message({ action: 'Indexing...' })

  if (isCache(path) === false) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      createStyleCache().then(() => message({ done: true }))
    }, 500)
  }
}

message({ action: 'Initialization...' })

setTimeout(() => {
  createStyleCache().then(() => message({ done: true }))

  chokidar.watch(styleDir, { persistent: true, ignoreInitial: true })
    .on('add', path => onChange(path))
    .on('unlink', path => onChange(path))
}, 500)

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
    const res = path.resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  }))
  return Array.prototype.concat(...files)
}

function createStyleCache () {
  return getFiles(styleDir)
    .then(array => {
      let fileContent = ''
      for (const file of array) {
        const fileSrc = file.replace(sourceDir, '')
        if (fileSrc.indexOf('__cache__') >= 0) continue
        fileContent += `@import "${fileSrc}"\n`
      }
      return writeTextIntoFile(dest, fileContent)
    })
}
