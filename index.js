const { foreachListItem } = require('./util')

const main = async () => {
  // 热点新闻
  console.log('热点新闻：')
  await foreachListItem('http://xsh.hdu.edu.cn/list-2-1.html', $ => (index, el) => {
    console.log('%d: 《%s》%s', index + 1, $(el).children('h3').text(), $(el).children('h5').text())
  })
}

main().then()
