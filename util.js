const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const throttle = require('p-throttle')

const axiosGet = throttle(axios.get, 7, 1000)

// let counter = 0

const fetchAndParse = async url => {
  try {
    const { data } = await axiosGet(url)
    // console.log(`    Request #${++counter}`)
    return cheerio.load(data)
  } catch (e) { console.log(e) }
}

const getListPageUrl = (id, page) => `http://old.hduxiaohui.com/list-${id}-${page}.html`

const writeFile = (rPath, content) => fs.writeFileSync(path.resolve(process.env.OUTPUT, rPath), content, 'utf-8')

const createDir = dir => mkdirp.sync(path.resolve(process.env.OUTPUT, dir))

module.exports = {
  fetchAndParse,
  getListPageUrl,
  createDir,
  writeFile
}
