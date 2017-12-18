const cheerio = require('cheerio')
const axios = require('axios')

const fetchAndParse = async url => {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

const getListPageUrl = (id, page) => `http://old.hduxiaohui.com/list-${id}-${page}.html`

module.exports = {
  fetchAndParse,
  getListPageUrl
}
