import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loggingEnabled] = useState(true);
  const [loginMessage, setLoginMessage] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  // Helpers for logging input activity. Passwords are masked.
  function maskPassword(value) {
    return '*'.repeat(value.length) + ` (${value.length})`;
  }

  function logInput(field, value) {
    if (!loggingEnabled) return;
    if (field.toLowerCase().includes('pass')) {
      console.log(`[INPUT] ${field}:`, maskPassword(value));
    } else {
      console.log(`[INPUT] ${field}:`, value);
    }
  }

  function logClear(field, prev) {
    if (!loggingEnabled) return;
    if (field.toLowerCase().includes('pass')) {
      console.log(`[CLEARED] ${field}:`, maskPassword(prev));
    } else {
      console.log(`[CLEARED] ${field}:`, prev);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoginMessage('');
    
    // final validation before submit
    const err = validatePasswordLogin(password);
    if (err) {
      setPasswordError(err);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userRole', data.user.role || 'user'); // Store role from backend
        setIsLoggedIn(true);
        setUserName(data.user.name);
        
        // Show success message with user's name
        setLoginMessage(`Welcome, ${data.user.name}! Login successful. Redirecting...`);
        
        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin-dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      } else {
        setLoginMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLoginMessage('Network error due to slow internet connection or backend has not been established yet. Please try again later.');
    }
  }

  function validatePasswordLogin(pw) {
    if (!pw || pw.length < 6) return 'Password must be at least 6 characters.';
    return '';
  }

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-1 items-center justify-center bg-[#faf8f6] animate-[slideInLeft_0.8s_ease-out]">
        <div className="w-[360px] p-9 pl-8 border-l-8 border-[#e6e6e6] bg-white shadow-lg animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
          <h2 className="text-[20px] font-bold text-left mb-6 text-cleanWarm animate-[fadeInUp_0.7s_ease-out_0.3s_both]">Login to Your Account</h2>
          
          {/* Login Success/Error Message */}
          {loginMessage && (
            <div className={`mb-4 p-3 rounded-md text-center text-sm ${
              loginMessage.includes('Welcome') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            } animate-[fadeIn_0.5s_ease-out]`}>
              {loginMessage}
              {loginMessage.includes('Welcome') && (
                <div className="mt-2 text-xs text-green-600">
                  You will be redirected shortly...
                </div>
              )}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="block mt-3 mb-1 text-[#666] text-[13px]">Email*</label>
            <input
              type="email"
              className="w-full p-2.5 border border-[#ddd] rounded-md bg-white text-[14px] focus:outline-cleanBrown animate-[fadeInUp_0.6s_ease-out_0.4s_both]"
              value={email}
              onChange={e => {
                const v = e.target.value;
                if (v === '' && email !== '') logClear('Email', email);
                else logInput('Email', v);
                setEmail(v);
              }}
              required
              disabled={loginMessage.includes('Welcome')}
            />
            <label className="block mt-3 mb-1 text-[#666] text-[13px]">Password*</label>
            <div className="flex gap-2 items-center mb-1 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <input
                type={show ? 'text' : 'password'}
                className={`flex-1 p-2.5 border rounded-md bg-white text-[14px] focus:outline-cleanBrown ${passwordError ? 'border-red-500' : 'border-[#ddd]'}`}
                value={password}
                onChange={e => {
                  const v = e.target.value;
                  if (v === '' && password !== '') logClear('Password', password);
                  else logInput('Password', v);
                  setPassword(v);
                  const err = validatePasswordLogin(v);
                  setPasswordError(err);
                }}
                required
                disabled={loginMessage.includes('Welcome')}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                disabled={loginMessage.includes('Welcome')}
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            <div className="flex justify-between items-center mt-2 mb-4 text-[13px] animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              <label className="flex items-center gap-2 text-[#666]">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  disabled={loginMessage.includes('Welcome')}
                />
                <span>Remember me</span>
              </label>
              <a className="text-[#777] hover:underline" href="#">Forgot Password?</a>
            </div>
            <button
              className={`w-full p-2.5 rounded-md mt-1 font-semibold cursor-pointer animate-[fadeInUp_0.7s_ease-out_0.6s_both] shadow-md transition-colors ${
                loginMessage.includes('Welcome') 
                  ? 'bg-green-600 text-white' 
                  : 'bg-cleanBrown text-white hover:bg-[#a05e2e]'
              }`}
              type="submit"
              disabled={loginMessage.includes('Welcome')}
            >
              {loginMessage.includes('Welcome') ? 'Login Successful!' : 'Log In'}
            </button>
          </form>
          
          {/* Show logged in user info if available */}
          {userName && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">Logged in as:</span> {userName}
              </p>
            </div>
          )}
          
          <p className="text-[#777] text-center mt-5 text-[13px] animate-[fadeInUp_0.7s_ease-out_0.6s_both]">
            Don't Have an Account?{' '}
            <Link
              to="/signup"
              className="text-[#6b6b6b] hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-center mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
      <div className="flex-1 bg-right-image bg-cover bg-center animate-[slideInRight_0.8s_ease-out]" aria-hidden="true"></div>
    </div>
  );
};

export default Login;