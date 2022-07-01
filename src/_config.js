export const process = {
  dev: true
}

export const http = {
  main: 'https://vttwitter-4f5ed-default-rtdb.europe-west1.firebasedatabase.app/tweets.json'
}

export const site = {
  home: process.dev ? 'http://localhost:8080/' : 'http://ivanov.ru'
}

export const app = {
  title: 'Template'
}

export const links = [
  {
    title: 'Home',
    alias: 'home',
    url: '/'
  },
  {
    title: 'About',
    alias: 'about',
    url: '/about'
  }
]
