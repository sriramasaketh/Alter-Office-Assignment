import React from 'react'
import {useAuth} from '../../context/AuthContext'

const Login = () => {
  const {loginWithGoogle} = useAuth()

  return (
    <div className='login-page'>
      <h1>Welcome to Introduction-to-React-JS</h1>
      <button className='login-button' onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  )
}

export default Login
