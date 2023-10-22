import Cookies from 'universal-cookie'

export const state = () => ({
  token: null,
  user: null,
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

  fetchUser({ commit, dispatch }, params) {
    app.get('/api/litterfinder', async (req, res) => {
      try {
        // Use Mongoose models to interact with your MongoDB collections
        const data = await auth.find() // Replace YourModel with your actual model name
        console.log(data)
        res.json(data)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error' })
      }
    })
  },
}

export const getters = {
  getToken(state) {
    return state.token
  },
}
