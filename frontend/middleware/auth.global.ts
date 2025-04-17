import { useAuthStore } from "~/store/auth"

export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return 

  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    authStore.loadUser()
  }

  // Protect specific routes
  const protectedRoutes = ['/find-dogs', '/account']
  if (!authStore.isAuthenticated && protectedRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // Block login/register if already logged in
  if (authStore.isAuthenticated && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/find-dogs')
  }
})
