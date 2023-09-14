import { shallowMount, createLocalVue } from '@vue/test-utils'
import LoginPage from '@/pages/login/index.vue'
import AuthenticationForm from '@/components/Login/AuthenticationForm'
import Snackbar from '@/components/Login/Snackbar'

// Create a local Vue instance
const localVue = createLocalVue()

describe('LoginPage', () => {
  it('renders AuthenticationForm and Snackbar components', () => {
    const wrapper = shallowMount(LoginPage, { localVue })

    // Ensure AuthenticationForm and Snackbar components are rendered
    expect(wrapper.findComponent(AuthenticationForm).exists()).toBe(true)
    expect(wrapper.findComponent(Snackbar).exists()).toBe(true)
  })
})
