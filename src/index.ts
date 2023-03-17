const http = require('http')
const url = require('url')
const { routes } = require('./routes')

const HOSTNAME = '127.0.0.1'
const PORT = 3000

const getQueryParams = (query: string | null): Record<string, string> => {
  if (query) {
    return query
      .split('&')
      .map((queryPair) => queryPair.split('='))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: decodeURIComponent(value)
      }), {})
  }
  return {}
}

const routing = (urlStr: string): Record<string, string>[] => {
  const {
    pathname,
    query
  } = url.parse(urlStr)
  
  const route = routes.find((route) => {
    return route.pathname === pathname
  })
  
  if (!route) {
    throw Error('404')
  }
  
  
  const queryParams = getQueryParams(query)
  
  return route.controller({ queryParams })
}

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/favicon.ico') {
      return
    }
    
    if (req.url) {
      const response = routing(req.url)
      
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(response))
    }
  } catch (e) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'text/plain')
    return res.end(JSON.stringify(e))
  }
  
  res.statusCode = 500
  res.setHeader('Content-Type', 'text/plain')
  res.end('Ops, something went wrong.')
  
  
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})
