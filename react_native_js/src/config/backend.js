export const BACKEND = {
  servers: {
    dev: 'http://localhost:4600',
    myLaptop: 'http://192.168.1.47:4600',
    use: 'myLaptop'
  },
  endpoints: {
    registration: {
      getReady: '/v1/registration/getReady',
      sendSMS: '/v1/registration/sendSMS',
      confirmSMS: '/v1/registration/confirmSMS',
      checkEmailAvailability: '/v1/registration/checkEmailAvailability',
      checkUsernameAvailability: '/v1/registration/checkUsernameAvailability',
      checkMobileAvailability: '/v1/registration/checkMobileAvailability',
      register: '/v1/registration/register'
    },
    session: {
      login: '/v1/session/login',
      logout: '/v1/session/logout'
    }
  }
}
