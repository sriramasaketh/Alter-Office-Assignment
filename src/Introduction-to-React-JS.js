import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {AuthProvider} from './context/AuthContext'
import {FeedProvider} from './context/FeedContext'

import Navbar from './components/Common/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import PostDetails from './pages/PostDetails'

import './styles/index.css'

const IntroductionToReactJS = () => {
  return (
    <AuthProvider>
      <FeedProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/post/:id' element={<PostDetails />} />
          </Routes>
        </Router>
      </FeedProvider>
    </AuthProvider>
  )
}

export default IntroductionToReactJS
