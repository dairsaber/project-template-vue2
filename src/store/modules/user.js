import { login, logout, getInfo } from "@/api/user"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { resetRouter } from "@/router"

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
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
    const { name, avatar } = data
    commit("SET_NAME", name)
    commit("SET_AVATAR", avatar)
  },

  // user logout
  async logout({ commit, state }) {
    await logout(state.token)
    removeToken()
    resetRouter()
    commit("RESET_STATE")
  },

  // remove token
  resetToken({ commit }) {
    removeToken() // must remove  token  first
    commit("RESET_STATE")
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
