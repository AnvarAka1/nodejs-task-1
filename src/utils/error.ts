import { ServerResponse } from 'http'

export const sendError = (res: ServerResponse, message: string = 'Ops, something went wrong.', code: number = 500) => {
  res.statusCode = code
  res.setHeader('Content-Type', 'text/plain')
  res.end(message)
}