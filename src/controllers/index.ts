import { users, UserType } from '../mock-data/user'
import { IncomingMessage, ServerResponse } from 'http'
import { sendResponse } from '../router'

export type RequestParamType = {
  queryParams: Record<string, string>
}

export const homeController = (req: IncomingMessage, res: ServerResponse): unknown => {
  return sendResponse(res).status(200).html('Welcome to main page. Please, proceed to `/users` page to see the user list =)')
}

export const userListController = (req: IncomingMessage, res: ServerResponse, { queryParams }: RequestParamType): unknown => {
  const fullnameSearch = queryParams.fullnameSearch || ''
  const roleType = queryParams.type || ''
  const minAge = parseInt(queryParams.minAge || '0')
  const maxAge = parseInt(queryParams.maxAge || '0')
  const limit = parseInt(queryParams.limit || '0')
  
  const userList = users
    .filter(({ fullName }) => fullnameSearch ? fullName === fullnameSearch : true)
    .filter(({ age }) => minAge ? age >= minAge : true)
    .filter(({ age }) => maxAge ? age <= maxAge : true)
    .filter(({ type }) => roleType ? roleType === type : true)
  
  if (userList.length) {
    return sendResponse(res).status(200).json(limit ? userList.slice(0, limit) : userList)
  }
  
  throw Error('User data is missing or does not match the search and filter criteria')
}