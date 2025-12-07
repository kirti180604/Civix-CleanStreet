 import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

export default function App() {
  const [page, setPage] = useState('login')
  return page === 'login'
    ? <Login onSignup={() => setPage('signup')} />
    : <Signup onBack={() => setPage('login')} />
}
