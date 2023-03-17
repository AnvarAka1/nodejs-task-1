import { users } from '../mock-data/user'

export type RequestParamType = {
  queryParams: Record<string, string>
}

export const userController = ({ queryParams }: RequestParamType) => {
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
    return limit ? userList.slice(0, limit) : userList
  }
  
  throw Error('User data is missing or does not match the search and filter criteria')
}