const { fetchAndParse } = require('./util')

const parseContentByUrl = async url => {
  const $ = await fetchAndParse(url)
  return {
    title: $('#main > div.contentblock.corBlock.mar-t-10.lf.w75p > div > h1').text(),
    excerpt: $('#main > div.contentblock.corBlock.mar-t-10.lf.w75p > div > h3').text(),
    content: $('#content').html(),
    publishedAt: new Date($('#main > div.contentblock.corBlock.mar-t-10.lf.w75p > div > h2').text().split('　 ')[0])
  }
}

module.exports = {
  parseContentByUrl
}
