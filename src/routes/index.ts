import { homeController, userListController } from '../controllers'
import { IncomingMessage, ServerResponse } from 'http'

type Args = {
  queryParams: Record<string, string>
}

type RouteType = {
  pathname: string
  controller: (req: IncomingMessage, res: ServerResponse, args: Args) => unknown
  method: string
}

export const routes: RouteType[] = [
  {
    pathname: '/',
    controller: homeController,
    method: 'GET'
  },
  {
    pathname: '/users',
    controller: userListController,
    method: 'GET'
  }
]