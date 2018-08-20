export function requireNick(to, from, next) {
  if (!isNickSet()) {
    next({
      path: '/start',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

export function isNickSet() {
  const nick = localStorage.getItem('ihm_nick');
  return !!nick;
}

export function setNick(nick) {
  localStorage.setItem('ihm_nick', nick);
}

export function getNick() {
  return localStorage.getItem('ihm_nick');
}

export function getPass() {
  return localStorage.getItem('ihm_pass');
}
