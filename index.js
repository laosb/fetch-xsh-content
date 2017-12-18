const { foreachAllListItem } = require('./list')
const { parseContentByUrl } = require('./content')

const main = async () => {
  // 热点新闻
  /*
  console.log('热点新闻：')
  await foreachAllListItem(2, ($, page) => (index, el) => {
    console.log('第%d页第%d条：《%s》', page, index + 1, $(el).children('h3').text())
  })
  */
  console.log(JSON.stringify(await parseContentByUrl('http://old.hduxiaohui.com/show-10-415-1.html')))
}

main().then()
