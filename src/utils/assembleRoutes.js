// TODO 动态路由的实现
import { dynamicRoutes } from "@/router"
export function assembleRoutes(router, userRoles = ["admin"]) {
  dynamicRoutes.forEach((route) => {
    const { parent = "home", roles } = route.meta
    const isOk = userRoles.some((role) => roles.includes(role))
    if (isOk) {
      router.addRoute(parent, route)
    }
  })
}
