import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const {register} = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await register({email, password, displayName})
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed.')
    }
  }

  return (
    <div className='register'>
      <h2>Create an Account</h2>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder='Full Name'
          required
        />
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          required
        />
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          required
        />
        <button type='submit' className='btn btn-primary'>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Login here</Link>.
      </p>
    </div>
  )
}

export default Register
