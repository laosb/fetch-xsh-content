const { foreachAllListItem } = require('./list')
const { parseContentByUrl } = require('./content')
const { createDir, writeFile } = require('./util')
const { uniqBy } = require('lodash')

const fetchAndStorSection = async (name, lists) => {
  let pageList = []
  console.log(`Getting ready for Section '${name}'`)
  createDir(`lists`)
  createDir(`content/${name}`)

  console.log(`Fetching Section '${name}'...`)
  const listAction = listId => foreachAllListItem(listId, ($, page) => (index, el) => {
    pageList.push({
      listId,
      page,
      index: index + 1,
      title: $(el).children('h3').text(),
      url: $(el).children('h3').children('a').attr('href')
    })
    // console.log('第%d页第%d条：《%s》', page, index + 1, $(el).children('h3').text())
  })
  const allActions = lists.map(listAction)
  await Promise.all(allActions)
  console.log(`List for '${name}' is roughly fetched.`)

  console.log(`Removing duplicated items in list`)
  pageList = uniqBy(pageList, 'url')

  console.log(`Saving the list to lists/${name}.json`)
  writeFile(`lists/${name}.json`, JSON.stringify(pageList))

  console.log(`Fetching & storing all posts in the list for '${name}'`)
  let counter = 0
  const allPostActions = pageList.map(async ({ url, page, index }) => {
    try {
      writeFile(`content/${name}/${url.split('/show-')[1].replace('.html', '.json')}`, JSON.stringify(await parseContentByUrl(url)))
    } catch (e) { console.log(e) }
    console.log(`  Crawled ${url} (${++counter}/${pageList.length})`)
    return 0
  })
  await Promise.all(allPostActions)

  console.log(`'${name}' done!\n`)
  return 0
}

const main = async () => {
  await fetchAndStorSection('su-overview', [1, 7, 8, 9])
  await fetchAndStorSection('campus-culture', [2, 10, 11])
  await fetchAndStorSection('working-dynamics', [3, 12, 13])
  await fetchAndStorSection('rights', [4, 21, 22])
  await fetchAndStorSection('activities', [5])
  await fetchAndStorSection('downloads', [6])
  return 0
}

main().then()
