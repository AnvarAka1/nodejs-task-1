import { sendError } from './utils/error'
import http from 'http'
import * as process from 'process'

const { handleRoutes } = require('./router')

const HOSTNAME = '127.0.0.1'
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/favicon.ico') {
      return
    }
    
    if (req.url) {
      return handleRoutes(req, res)
    }
  } catch (e) {
    return sendError(res, e.message, 404)
  }
  
  return sendError(res)
})


server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}`)
})
