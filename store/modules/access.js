export const state = () => ({
  token: null,
})

export const actions = {
  setToken(token) {
    commit('SET_TOKEN', token)
  },
}

export const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

export const getters = {
  token: (state) => state.token,
}
