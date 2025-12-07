import React, { useState } from 'react'

export default function Signup({ onBack }){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    // Replace with real signup logic
    alert(`Signup:\nEmail: ${email}\nPassword: ${password}\nConfirm: ${confirm}`)
  }

  return (
    <div className="layout">
      <div className="left">
        <div className="card">
          <h2 className="title">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="form">
            <label className="label">Email*</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <label className="label">Password*</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <label className="label">Confirm Password*</label>
            <input
              type="password"
              className="input"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />

            <button className="login-btn" type="submit">Sign Up</button>
          </form>

          <p className="signup">Already have an account? <a href="#" onClick={e => {e.preventDefault(); onBack();}}>Log In</a></p>
        </div>
      </div>
      <div className="right" aria-hidden="true"></div>
    </div>
  )
}
