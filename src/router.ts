import url from 'url'
import { routes } from './routes'
import { getQueryParams } from './utils/query-params'
import { IncomingMessage, ServerResponse } from 'http'
import { sendError } from './utils/error'

export const handleRoutes = (req: IncomingMessage, res: ServerResponse): unknown => {
  const urlStr = req.url
  
  const {
    pathname,
    query
  } = url.parse(urlStr)
  
  const route = routes.find((route) => {
    return route.pathname === pathname && req.method === route.method
  })
  
  if (!route) {
    return sendError(res, '404. Page not found', 404)
  }
  
  
  const queryParams = getQueryParams(query)
  
  return route.controller(req, res, { queryParams })
}

export const sendResponse = (res: ServerResponse) => ({
  status: (status: number = 200) => ({
    json: <T>(message: T) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      return res.end(JSON.stringify(message))
    },
    html: (message: string) => {
      res.statusCode = status
      res.setHeader('Content-Type', 'text/plain')
      return res.end(message)
    }
  })
})

