import store from '../store'

export function requireAuth(to, from, next) {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  const isAuthenticated = new Date().getTime() < expiresAt;
  if (!isAuthenticated) {
    next({
      path: '/start',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function getNick() {
  return store.state.user.nickname;
}