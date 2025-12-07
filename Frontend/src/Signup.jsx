import React, { useState } from 'react';

export default function Signup({ onBack }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loggingEnabled, setLoggingEnabled] = useState(true);

  // Logging helpers
  function logInput(label, value) {
    if (loggingEnabled) {
      if (label.toLowerCase().includes('password')) {
        console.log(`${label}:`, '*'.repeat(value.length));
      } else {
        console.log(`${label}:`, value);
      }
    }
  }
  function logClear(label, value) {
    if (loggingEnabled) {
      console.log(`${label} cleared (was: ${label.toLowerCase().includes('password') ? '*'.repeat(value.length) : value})`);
    }
  }

  function validatePasswordSignup(pw) {
    if (!pw || pw.length < 8) return 'Password must be at least 8 characters.';
    if (!/[a-z]/.test(pw)) return 'Password must include a lowercase letter.';
    if (!/[A-Z]/.test(pw)) return 'Password must include an uppercase letter.';
    if (!/[0-9]/.test(pw)) return 'Password must include a number.';
    if (!/[!@#\$%\^&\*(),.?":{}|<>]/.test(pw)) return 'Password must include a special character.';
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    // final validations
    const pErr = validatePasswordSignup(password);
    const cErr = password === confirm ? '' : 'Passwords do not match.';
    setPasswordError(pErr);
    setConfirmError(cErr);
    if (pErr || cErr) return;

    // You can add signup logic here
    alert('Signup submitted!');
  }

  return (
    <div className="flex h-screen w-full">
      {/* Image on left */}
      <div className="flex-1 bg-right-image bg-cover bg-center animate-fadeIn" aria-hidden="true"></div>
      {/* Form on right with pop-up animation */}
      <div className="flex flex-1 items-center justify-center bg-[#faf8f6] animate-fadeIn">
        <div className="w-[360px] p-9 pl-8 border-l-8 border-[#e6e6e6] bg-white shadow-lg animate-popUp">
          <h2 className="text-[20px] font-bold text-left mb-6 text-cleanWarm animate-fadeIn">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* First + Last name row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mt-3 mb-1 text-[#666] text-[13px]">First Name*</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-[#ddd] rounded-md bg-white text-[14px] focus:outline-cleanBrown"
                  value={firstName}
                  onChange={e => {
                    const v = e.target.value;
                    if (v === '' && firstName !== '') logClear('First Name', firstName);
                    else logInput('First Name', v);
                    setFirstName(v);
                  }}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mt-3 mb-1 text-[#666] text-[13px]">Last Name*</label>
                <input
                  type="text"
                  className="w-full p-2.5 border border-[#ddd] rounded-md bg-white text-[14px] focus:outline-cleanBrown"
                  value={lastName}
                  onChange={e => {
                    const v = e.target.value;
                    if (v === '' && lastName !== '') logClear('Last Name', lastName);
                    else logInput('Last Name', v);
                    setLastName(v);
                  }}
                  required
                />
              </div>
            </div>

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
            />
            <label className="block mt-3 mb-1 text-[#666] text-[13px]">Password*</label>
            <input
              type="password"
              className={`w-full p-2.5 border rounded-md bg-white text-[14px] focus:outline-cleanBrown animate-[fadeInUp_0.6s_ease-out_0.4s_both] ${passwordError ? 'border-red-500' : 'border-[#ddd]'}`}
              value={password}
              onChange={e => {
                const v = e.target.value;
                if (v === '' && password !== '') logClear('Password', password);
                else logInput('Password', v);
                setPassword(v);
                const err = validatePasswordSignup(v);
                setPasswordError(err);
                if (confirm) setConfirmError(v === confirm ? '' : 'Passwords do not match.');
              }}
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            <label className="block mt-3 mb-1 text-[#666] text-[13px]">Confirm Password*</label>
            <input
              type="password"
              className={`w-full p-2.5 border rounded-md bg-white text-[14px] focus:outline-cleanBrown animate-[fadeInUp_0.6s_ease-out_0.4s_both] ${confirmError ? 'border-red-500' : 'border-[#ddd]'}`}
              value={confirm}
              onChange={e => {
                const v = e.target.value;
                if (v === '' && confirm !== '') logClear('Confirm Password', confirm);
                else logInput('Confirm Password', v);
                setConfirm(v);
                setConfirmError(v === password ? '' : 'Passwords do not match.');
              }}
              required
            />
            {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
            <button
              className="w-full bg-cleanBrown text-white p-2.5 rounded-md mt-4 font-semibold cursor-pointer animate-bounce shadow-md hover:bg-[#a05e2e] transition-colors"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="text-[#777] text-center mt-5 text-[13px] animate-[fadeInUp_0.7s_ease-out_0.6s_both]">
            <label className="flex items-center gap-2 justify-center mb-2">
              <input type="hidden" hidden={loggingEnabled} onChange={e => setLoggingEnabled(e.target.checked)} />
              {/* <span className="text-[#666]">Console log inputs</span> */}
            </label>
            Already have an account?{' '}
            <a
              href="#"
              className="text-[#6b6b6b] hover:underline"
              onClick={e => {
                e.preventDefault();
                onBack();
              }}
            >
              Log In
            </a>
          </p>
        </div>
      </div>
      {/* Remove duplicate image div on right */}
    </div>
  )
}
