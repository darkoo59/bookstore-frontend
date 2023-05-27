import axios from 'axios'
import { createRefresh } from 'react-auth-kit'
import { API_BASE_URL } from '../config'

const refreshApi = createRefresh({
  interval: 0.1,   // Refreshs the token in every 10 minutes
  refreshApiCallback: async (
    {   // arguments
      authToken,
      refreshToken
    }) => {
    try {
      const response = await axios.post(API_BASE_URL + '/user/token/refresh', { 'refreshToken': refreshToken }, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      }
      )
      const newAuthToken = response.data.token as string
      return {
        isSuccess: true,
        newAuthToken,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('Failed to refresh auth token')
    }
  }
})

export default refreshApi