const { foreachAllListItem } = require('./util')

const main = async () => {
  // 热点新闻
  console.log('热点新闻：')
  await foreachAllListItem(2, ($, page) => (index, el) => {
    console.log('第%d页第%d条：《%s》', page, index + 1, $(el).children('h3').text())
  })
}

main().then()
