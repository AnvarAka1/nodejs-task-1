import { userController } from '../controllers'

type Args = {
  queryParams: Record<string, string>
}

type RouteType = {
  pathname: string
  controller: (args: Args) => void
}

export const routes: RouteType[] = [
  {
    pathname: '/',
    controller: () => {}
  },
  {
    pathname: '/users',
    controller: userController
  }
]