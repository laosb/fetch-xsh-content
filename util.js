const cheerio = require('cheerio')
const axios = require('axios')

const fetchAndParse = async url => {
  const { data } = await axios.get(url)
  return cheerio.load(data)
}

module.exports = {
  fetchAndParse
}
