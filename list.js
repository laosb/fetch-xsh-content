const { fetchAndParse } = require('./util')

const foreachListItem = async (url, eachCons, info) => {
  const $ = await fetchAndParse(url)
  return $('ul.listmod>li').each(eachCons($, info))
}

const getListPageUrl = (id, page) => `http://old.hduxiaohui.com/list-${id}-${page}.html`

const foreachAllListItem = async (listId, eachCons) => {
  const firstPage$ = await fetchAndParse(getListPageUrl(listId, 1))
  const totalPages = parseInt(firstPage$('#pages>a.a1').prev().text(), 10)
  for (let i = 1; i <= totalPages; i++) {
    await foreachListItem(getListPageUrl(listId, i), eachCons, i)
  }
}

module.exports = {
  foreachListItem,
  getListPageUrl,
  foreachAllListItem
}
