import { login, logout, getInfo } from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { resetRouter } from "@/router"

const getDefaultState = () => ({
  token: getToken(),
  name: "",
  avatar: "",
  introduction: "",
  roles: [],
  userInfo: {},
})

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const { data } = await login({
      username: username.trim(),
      password,
    })
    commit("SET_TOKEN", data.token)
    setToken(data.token)
  },
  // get user info
  async getInfo({ commit, state }) {
    const { data } = await getInfo(state.token)
    if (!data) {
      throw Error("Verification failed, please Login again.")
    }
    const { name, avatar, roles, introduction } = data
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error("getInfo: roles must be a non-null array!")
    }
    commit("SET_ROLES", roles)
    commit("SET_NAME", name)
    commit("SET_AVATAR", avatar)
    commit("SET_INTRODUCTION", introduction)
    commit("SET_USER_INFO", data)
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "")
          commit("SET_ROLES", [])
          removeToken()
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true })

          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "")
      commit("SET_ROLES", [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token"

    commit("SET_TOKEN", token)
    setToken(token)

    const { roles } = await dispatch("getInfo")

    resetRouter()

    // generate accessible routes map based on roles
    await dispatch("permission/generateRoutes", roles, {
      root: true,
    })
    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
