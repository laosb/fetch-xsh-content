const glob = require('glob')
const fs = require('fs')
const path = require('path')
const { login, logout, importOnePost } = require('./importRequests')

const postsToImport = {
  work: 'content/working-dynamics/*.json',
  activities: 'content/activities/*.json',
  rights: 'content/rights/*.json',
  overview: 'content/su-overview/*.json',
  'campus-culture': 'content/campus-culture/*.json',
  downloads: 'content/downloads/*.json'
}

const main = async () => {
  console.log('Trying to log in...')
  try {
    await login(process.env.USERNAME, process.env.PASSWORD)
  } catch (e) {
    console.log('Login Error:', e.toString())
    throw e
  }
  console.log('Logged in.\n')

  const sectionActions = Object.keys(postsToImport).map(async key => {
    console.log(`Trying to import '${key}'`)
    const files = glob.sync(path.resolve(process.env.DATA_DIR, postsToImport[key]))
    console.log(`=> ${files.length} posts will be imported. Now start to import.`)
    let counter = 0
    const fileActions = files.map(async filepath => {
      const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
      data.tags = ['old', key]
      data.content = data.content.replace('{{CDN_PREFIX}}', 'https://old.hduxiaohui.com')
      try {
        await importOnePost(data)
      } catch (e) {
        console.log('==> Import Error:', e.toString())
        throw e
      }
      console.log(`==> ${++counter}/${files.length} imported.`)
      return 0
    })
    await Promise.all(fileActions)
    console.log(`'${key}' are all imported now.\n`)
    return 0
  })
  console.log(sectionActions.length)
  await Promise.all(sectionActions)

  console.log('All done! Logging out...')
  try {
    await logout()
  } catch (e) {
    console.log('Logout Error:', e.toString())
    throw e
  }
  console.log('Logged out.\n')
}

main().then().catch(e => 0)
