import React, { useState } from 'react'

export default function Login(props){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    // Replace with real auth call
    alert(`Submitted:\nEmail: ${email}\nPassword: ${password}\nRemember: ${remember}`)
  }

  return (
    <div className="layout">
      <div className="left">
        <div className="card">
          <h2 className="title">Login to Your Account</h2>

          <form onSubmit={handleSubmit} className="form">
            <label className="label">Email*</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder=""
              required
            />

            <label className="label">Password*</label>
            <div className="password-row">
              <input
                type={show ? 'text' : 'password'}
                className="input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder=""
                required
              />
            </div>

            <div className="options">
              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <a className="forgot" href="#">Forgot Password?</a>
            </div>

            <button className="login-btn" type="submit">Log In</button>

          </form>

          <p className="signup">Don't Have an Account? <a href="#" onClick={e => {e.preventDefault(); props.onSignup && props.onSignup();}}>Sign Up</a></p>
        </div>
      </div>

      <div className="right" aria-hidden="true"></div>
    </div>
  )
}
