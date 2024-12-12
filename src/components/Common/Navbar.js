import React from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'

const Navbar = () => {
  const {user, logout} = useAuth()

  return (
    <nav className='navbar'>
      <h1>Introduction-to-React-JS</h1>
      <div className='navbar-links'>
        <Link to='/'>Feed</Link>
        <Link to='/profile'>Profile</Link>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
