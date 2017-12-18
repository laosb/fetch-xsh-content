const { fetchAndParse, getListPageUrl } = require('./util')

const foreachListItem = async (url, eachCons, info) => {
  const $ = await fetchAndParse(url)
  return $('ul.listmod>li').each(eachCons($, info))
}

const foreachAllListItem = async (listId, eachCons) => {
  const firstPage$ = await fetchAndParse(getListPageUrl(listId, 1))
  let totalPages = parseInt(firstPage$('#pages > a:last-child').prev().text(), 10)
  totalPages = Number.isNaN(totalPages) ? 1 : totalPages
  console.log(`  Total pages: ${totalPages}`)
  for (let i = 1; i <= totalPages; i++) {
    await foreachListItem(getListPageUrl(listId, i), eachCons, i)
  }
  return 0
}

module.exports = {
  foreachListItem,
  getListPageUrl,
  foreachAllListItem
}
