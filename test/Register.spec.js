import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import Registration from '@/pages/register/index.vue'

Vue.use(Vuetify)

const localVue = createLocalVue()
const API_URL = '/api/user/register'

const testRegister = {
  email: 'test@test.com',
  password: 'password1',
  passwordConfirm: 'password1',
  dogs: [
    {
      dateOfBirth: '01/01/2023',
      dogBreed1: 'test',
      dogBreed2: '',
      breederName: '',
      dogName: 'test',
    },
  ],
}

const mockAxios = new MockAdapter(axios)
mockAxios.onPost(API_URL).reply(201, { token: 'test' })

describe('Registration Component', () => {
  let wrapper
  let router

  beforeEach(() => {
    // Create a new axios mock adapter for each test
    router = new VueRouter()

    // Mount the component with a fresh copy of Vue and axios mock
    wrapper = mount(Registration, {
      localVue,
      vuetify: new Vuetify(),
      mocks: {
        $toast: {
          error: jest.fn(),
          success: jest.fn(),
        },
      },
      stubs: ['router-link'],
      router,
    })
  })

  afterEach(() => {
    if (wrapper) {
      // Destroy the wrapper to avoid memory leaks
      wrapper.destroy()
    }
    mockAxios.reset()
  })

  describe('Form Validation', () => {
    it('Does not submit the form if it is invalid', async () => {
      // Simulate form submission without filling in required fields
      await wrapper.find('form').trigger('submit.prevent')

      // Assert that the form did not submit
      expect(wrapper.emitted().submit).toBeFalsy()
    })
    it('Displays errors when passwords do not match', async () => {
      // Set passwords that do not match
      await wrapper.setData({
        register: { ...testRegister, passwordConfirm: 'password2' },
      })

      // Simulate form submission
      await wrapper.find('form').trigger('submit.prevent')

      // Spy on $toast.error
      const errorSpy = jest.spyOn(wrapper.vm.$toast, 'error')

      // Assert that $toast.error was called with the expected message
      expect(errorSpy).toHaveBeenCalledWith('Passwords do not match')
    })
  })

  describe('Edge Cases', () => {
    it('Displays a generic error message on API failure', async () => {
      // Mock an API failure response (e.g., 500 Internal Server Error)
      const mockResponse = {
        status: 500,
      }

      // Mock the $axios.post method to return the failure response
      mockAxios.onPost(API_URL).reply(500, mockResponse)

      // Fill in valid form data
      await wrapper.setData({
        register: { ...testRegister },
      })

      // Simulate form submission
      await wrapper.find('form').trigger('submit.prevent')

      // Wait for async actions (e.g., axios request)
      await wrapper.vm.$nextTick()

      // Spy on $toast.error
      const errorSpy = jest.spyOn(wrapper.vm.$toast, 'error')

      // Assert that $toast.error was called with the expected message
      expect(errorSpy).toHaveBeenCalledWith('An error occurred')
    })

    // Add more edge case tests as needed
  })
})
