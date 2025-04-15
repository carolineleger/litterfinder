import { defineStore } from 'pinia'
import { useCookie } from '#app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    setUser(user) {
      this.isAuthenticated = !!user
      this.user = user

      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify(user))
      }

      const userCookie = useCookie('user')
      userCookie.value = JSON.stringify(user)
    },

    logout() {
      this.isAuthenticated = false
      this.user = null

      if (import.meta.client) {
        localStorage.removeItem('user')
      }

      const userCookie = useCookie('user')
      userCookie.value = null
    },

    loadUser() {
      if (import.meta.client) {
        const userData = localStorage.getItem('user')
        if (userData) {
          this.user = JSON.parse(userData)
          this.isAuthenticated = true
        }
      }
    },
  },
})
