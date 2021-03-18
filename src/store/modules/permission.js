import router, { constantRoutes, asyncRoutes } from "@/router"

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 *  generate new router
 * @param {} routes
 */
function addRoutes(routes) {
  routes.forEach((route) => {
    router.addRoute(route)
  })
  return constantRoutes.concat(routes)

  // return router.options.routes
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // create new router
    const newRoutes = addRoutes(routes)
    state.routes = newRoutes
  },
}

const actions = {
  async generateRoutes({ commit }, roles) {
    let accessedRoutes
    if (roles.includes("admin")) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit("SET_ROUTES", accessedRoutes)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
