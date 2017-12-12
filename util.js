const cheerio = require('cheerio')
const axios = require('axios')

const fetchAndParse = async url => {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

const foreachListItem = async (url, eachCons) => {
  const $ = await fetchAndParse(url)
  return $('ul.listmod>li').each(eachCons($))
}

module.exports = {
  fetchAndParse,
  foreachListItem
}
