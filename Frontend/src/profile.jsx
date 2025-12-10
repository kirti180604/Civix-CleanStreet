// ProfileSettingsPage.jsx
"use client"

import React, { useState } from "react"

/* ========== CLEANSTREET ADMIN THEME - Profile Settings Page ========== */
/* Sidebar Background: #b76a2f, Accent: #f39b42, Page BG: #f5f5f6 */

export function LeftNav({ expanded = true, menuItems = [] }) {
  return (
    <aside className={`w-60 min-h-screen bg-sidebar text-white flex flex-col justify-between p-4`}>
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-md bg-white/10 flex items-center justify-center font-bold text-sm">CS</div>
          <div>
            <div className="text-lg font-semibold">CleanStreet</div>
            <div className="text-xs opacity-75">Admin Panel</div>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.length ? (
            menuItems.map((m) => (
              <a
                key={m.label}
                href={m.to}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
              >
                <span className="w-5 h-5 text-base">{m.icon}</span>
                <span className="text-sm">{m.label}</span>
              </a>
            ))
          ) : (
            <>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                <span className="w-5">🏠</span>
                <span className="text-sm">Dashboard</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                <span>📋</span>
                <span className="text-sm">Reported Issues</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                <span>🗺️</span>
                <span className="text-sm">Map View</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                <span>👥</span>
                <span className="text-sm">Manage Users</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                <span>📈</span>
                <span className="text-sm">Analytics</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                <span>⚙️</span>
                <span className="text-sm">Settings</span>
              </a>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3 p-3 mt-8 bg-white/10 rounded-md">
        <div className="w-10 h-10 rounded-full bg-white/20" />
        <div>
          <div className="text-sm font-medium">Admin User</div>
          <div className="text-xs opacity-70">Administrator</div>
        </div>
      </div>
    </aside>
  )
}

/* Updated TopHeader with white background and dark gray icons */
export function TopHeader({ title = "CleanStreet Admin Panel", user = {} }) {
  return (
    <header
      className="w-full flex items-center justify-between px-6 py-4 bg-white border-b"
      style={{ borderColor: "var(--card-border)" }}
    >
      <div className="flex items-center gap-4">
        <button aria-label="toggle menu" className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="#444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button aria-label="notifications" className="p-2 rounded-md hover:bg-gray-100 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"
              stroke="#444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className="flex items-center gap-3 pl-4"
          style={{ borderColor: "var(--card-border)", borderLeftWidth: "1px" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ backgroundColor: "var(--brand-accent)" }}
          >
            AU
          </div>
          <div className="text-sm">
            <div className="font-medium" style={{ color: "var(--text-primary)" }}>
              Admin User
            </div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
              Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/* Updated ProfileCard with proper card styling and accent colors */
export function ProfileCard({ user = { name: "Shubham Singh", email: "shubham.singh@example.com" } }) {
  return (
    <aside className="card p-8 w-full">
      <div className="flex flex-col items-center gap-4 mb-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-semibold text-white"
          style={{ backgroundColor: "var(--brand-accent)" }}
        >
          SS
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
            {user.name}
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            {user.email}
          </div>
        </div>
      </div>

      <nav
        className="flex flex-col gap-2 mt-6 pt-6"
        style={{ borderColor: "var(--card-border)", borderTopWidth: "1px" }}
      >
        <a
          className="px-3 py-2 rounded-md font-medium transition-colors"
          style={{ backgroundColor: "var(--brand-accent)", color: "white" }}
        >
          Profile Settings
        </a>
        <a className="px-3 py-2 rounded-md transition-colors" style={{ color: "var(--text-primary)" }}>
          Account Settings
        </a>
        <a className="px-3 py-2 rounded-md transition-colors" style={{ color: "var(--text-primary)" }}>
          Security
        </a>
        <a className="px-3 py-2 rounded-md transition-colors" style={{ color: "var(--text-primary)" }}>
          Notifications
        </a>
      </nav>
    </aside>
  )
}

/* Updated FormInput with 44px height, proper border and focus styling */
export function FormInput({ label, name, value, onChange, type = "text", placeholder = "", className = "" }) {
  return (
    <label className={`block text-sm ${className}`}>
      <div className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
        {label}
      </div>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full px-3 border rounded-md text-sm transition-all"
        style={{
          height: "44px",
          borderColor: "#e6e6e6",
          color: "var(--text-primary)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--brand-accent)"
          e.target.style.outline = "none"
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e6e6e6"
        }}
      />
    </label>
  )
}

/* Updated FileUpload with proper colors and styling */
export function FileUpload({ onFile }) {
  const [preview, setPreview] = useState(null)

  function handleFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setPreview(url)
    onFile && onFile(f)
  }

  return (
    <div className="flex gap-4 items-center">
      <div
        className="w-28 h-28 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        {preview ? (
          <img src={preview || "/placeholder.svg"} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-2xl font-semibold" style={{ color: "#999" }}>
            SS
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
          Profile Photo
        </div>
        <label
          className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-white hover:opacity-90 transition-opacity cursor-pointer"
          style={{ backgroundColor: "var(--brand-accent)" }}
        >
          Upload Profile
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
        <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          JPG, PNG or GIF (max 10 MB)
        </div>
      </div>
    </div>
  )
}

/* Updated button styling with proper padding and border radius */
export function ButtonPrimary({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-2 py-2 px-6 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
      style={{ backgroundColor: "var(--brand-accent)" }}
    >
      {children}
    </button>
  )
}

export function ButtonSecondary({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 py-2 px-6 rounded-full text-sm font-medium transition-colors"
      style={{
        backgroundColor: "#ffffff",
        color: "var(--text-primary)",
        border: "1px solid #e6e6e6",
      }}
    >
      {children}
    </button>
  )
}

/* Updated ProfileSettingsCard with proper card styling and spacing grid */
export function ProfileSettingsCard({ initialValues = {}, onSave }) {
  const [form, setForm] = useState({
    firstName: initialValues.firstName || "Shubham",
    lastName: initialValues.lastName || "Singh",
    email: initialValues.email || "shubham.singh@example.com",
    phone: initialValues.phone || "",
    location: initialValues.location || "",
    website: initialValues.website || "",
    bio: initialValues.bio || "",
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSave() {
    onSave?.(form)
    alert("Saved (stub) — integrate API call")
  }

  return (
    <section className="card p-8 w-full">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
          Profile Settings
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Update your personal information and profile details
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* Photo Upload Section */}
        <div className="pb-8" style={{ borderColor: "var(--card-border)", borderBottomWidth: "1px" }}>
          <FileUpload onFile={(f) => console.log("file", f)} />
        </div>

        {/* Form Fields Section - 8px spacing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput label="First Name *" name="firstName" value={form.firstName} onChange={handleChange} />
          <FormInput label="Last Name *" name="lastName" value={form.lastName} onChange={handleChange} />
          <FormInput label="Email Address *" name="email" type="email" value={form.email} onChange={handleChange} />
          <FormInput label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <FormInput label="Location" name="location" value={form.location} onChange={handleChange} />
          <FormInput label="Website" name="website" value={form.website} onChange={handleChange} />
        </div>

        {/* Bio Section */}
        <div>
          <label className="block text-sm">
            <div className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
              Bio
            </div>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-md text-sm transition-all"
              style={{
                borderColor: "#e6e6e6",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--brand-accent)"
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e6e6e6"
              }}
              placeholder="Tell us about yourself..."
            />
            <div className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
              {form.bio.length}/500
            </div>
          </label>
        </div>
      </div>

      <div
        className="flex justify-end gap-3 mt-8 pt-6"
        style={{ borderColor: "var(--card-border)", borderTopWidth: "1px" }}
      >
        <ButtonSecondary onClick={() => alert("Cancel (stub)")}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={handleSave}>Save Changes</ButtonPrimary>
      </div>
    </section>
  )
}

export default function ProfileSettingsPage() {
  const menu = [
    { label: "Dashboard", to: "/" },
    { label: "Reported Issues", to: "/issues" },
    { label: "Map View", to: "/map" },
    { label: "Manage Users", to: "/users" },
    { label: "Analytics", to: "/analytics" },
    { label: "Settings", to: "/settings" },
  ]

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      <LeftNav menuItems={menu} />
      <div className="flex-1 min-h-screen flex flex-col">
        <TopHeader />
        <main className="flex-1 p-8" style={{ backgroundColor: "var(--bg-page)" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>

            <div className="lg:col-span-3">
              <ProfileSettingsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
