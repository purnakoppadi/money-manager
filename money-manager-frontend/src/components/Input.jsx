import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const Input = ({ label, options, value, onchange, placeHolder, type, isSelect }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const baseInputClass = "w-full bg-slate-50 outline-none border rounded-xl py-3 px-4 text-sm leading-tight transition-colors focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
  const inputStyle = {
    borderColor: 'var(--color-border)',
    color: 'var(--color-dark)',
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-dark)' }}>
          {label}
        </label>
      )}

      <div className="relative">
        {isSelect ? (
          <select
            className={`${baseInputClass} cursor-pointer appearance-none`}
            style={inputStyle}
            value={value}
            onChange={(e) => onchange(e)}
          >
            <option value="">{placeHolder || "Select a category"}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`${baseInputClass} ${type === 'password' ? 'pr-10' : ''}`}
            style={inputStyle}
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            placeholder={placeHolder}
            value={value}
            onChange={(e) => onchange(e)}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-0.5 rounded hover:bg-gray-100 transition-colors"
            onClick={toggleShowPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <Eye size={16} style={{ color: 'var(--color-primary)' }} />
            ) : (
              <EyeOff size={16} style={{ color: 'var(--color-text-muted)' }} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Input