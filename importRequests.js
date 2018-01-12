const axios = require('axios')
const cuid = require('cuid')
const moment = require('moment')
const throttle = require('p-throttle')
const axiosPost = throttle(axios.post, 7, 1000)

axios.defaults.baseURL = process.env.BASE_URL || 'http://localhost:3000'

const login = async (username, password) => {
  const bearer = (await axiosPost('/api/v1/login', { username, password })).data.bearer
  axios.defaults.headers.post['Authorization'] = 'Bearer ' + bearer
  return bearer
}

const logout = bearer => axiosPost('/api/v1/logout')

const importOnePost = ({ title, content, publishedAt, tags }) => axiosPost('/api/v1/apostrophe-blog', {
  title,
  body: {
    type: 'area',
    items: [{
      _id: cuid(),
      type: 'apostrophe-rich-text',
      content
    }]
  },
  published: false,
  publishedAt: moment(publishedAt).format('YYYY-MM-DD'),
  tags
})

module.exports = {
  login,
  logout,
  importOnePost
}
