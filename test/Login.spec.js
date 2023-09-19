import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Login from '@/pages/login/index.vue'

const localVue = createLocalVue()

describe('Login.vue', () => {
  let wrapper
  let mockAxios

  beforeEach(() => {
    // Create a new axios mock adapter for each test
    mockAxios = new MockAdapter(axios)

    // Mount the component with a fresh copy of Vue and axios mock
    wrapper = mount(Login, {
      localVue,
      mocks: {
        $toast: {
          error: jest.fn(),
        },
      },
      stubs: ['router-link'],
    })
  })

  afterEach(() => {
    // Clean up axios mock after each test
    mockAxios.reset()
  })

  it('displays an error message for invalid login details', async () => {
    // Mock a failed login request with status 400 and an error message
    mockAxios
      .onPost('/api/user/login')
      .reply(400, { message: 'Invalid login or password.' })

    // Fill in the login form with invalid details
    await wrapper.setData({
      login: {
        email: 'invalid@example.com',
        password: 'invalidPassword',
      },
    })

    // Trigger the login method
    try {
      await wrapper.vm.loginUser()
    } catch (error) {
      // Log the error code here
      console.log('Error Code:', error.response.status)

      // Expect that the error message is displayed
      expect(wrapper.vm.$toast.error).toHaveBeenCalledWith(
        'Invalid login or password.'
      )
    }
  })

  // Add more test cases as needed
})
