import Cookies from 'universal-cookie'

export const state = () => ({
  token: null,
})

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const cookies = new Cookies(req.headers.cookie)
    const token = cookies.get('token')
    commit('SET_TOKEN', token)
  },

  setToken({ commit }, token) {
    commit('SET_TOKEN', token)
  },
}

export const getters = {
  getToken(state) {
    return state.token
  },
}
