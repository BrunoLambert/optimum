import Cookies from 'vue-cookies'

export default ({ app, req, store }) => {
  let id = null
  if (req) {
    if (!req.headers.cookie) {
      return
    }
    const cookieLine = req.headers.cookie
      .split(';')
      .find(c => c.trim().startsWith('userId'))
    if (cookieLine) {
      id = cookieLine.split('=')[1]
    }
  } else {
    id = Cookies.get('userId')
  }
  if (id) {
    store.dispatch('auth/autoLogin', id)
  }
}
