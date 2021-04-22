import { useState, useEffect } from 'react'
import axios from 'axios'

// takes in the code from the Dashboard component
export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    if (!code) return;
    axios.post('http://localhost:3000/login', {
      code,
    })
    .then(res => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // cleans up the URL from the code to just '/'
        window.history.pushState({}, null, '/');
    })
    .catch(err => {
      // window.location = '/'
      console.log('codeeeeeee', code, "access token:", accessToken)
      console.log('error from login API:', err)
    })
  }, [code])

  // refreshs new access tokens in the background so user doesnt get logged out
  useEffect(() => {
    if (!refreshToken || !expiresIn) return

    const interval = setInterval(() => {
      axios.post('http://localhost:3000/refresh', {
        // pass up the refresh Token
        refreshToken,
      })
      .then(res => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch(err => {
        // window.location = '/'
      console.log('error from Refresh API:', err)
      })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn])

  return accessToken;
}
