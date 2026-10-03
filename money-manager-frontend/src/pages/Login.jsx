import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { assets } from '../assets/assets'
import AppContext from '../context/AppContext'
import axiosConfig from '../util/AxiosConfig'
import API_ENDPOINTS from '../util/apiEndpoints'
import { validEmail } from '../util/validation'
import { LoaderCircle, ArrowRight, ShieldCheck, PieChart, Lock, AlertCircle } from 'lucide-react'
import Logo from '../components/Logo'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email.trim()) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    if (!validEmail(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    if (!password.trim()) {
      setError("Please enter your password")
      setIsLoading(false)
      return
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      })

      const { token, user } = response.data

      if (token) {
        localStorage.setItem("token", token)
        setUser(user)
        navigate("/dashboard")
      }
    } catch (err) {
      console.error("Login Error:", err)
      setError(
        err.response?.data?.message ||
        "Login failed. Please verify your email and password."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      
      {/* Left Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 items-center justify-center p-12 overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        
        <div className="relative z-10 max-w-lg text-white">
          {/* Logo Header */}
          <Link to="/" className="inline-block mb-10 text-decoration-none">
            <Logo size="lg" subtitle={true} lightText={true} />
          </Link>

          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4 text-white">
            Take Control of Your Finances
          </h2>
          
          <p className="text-base text-purple-100 leading-relaxed mb-10 max-w-md">
            Track income, analyze expenses, manage categories, and generate visual financial reports in one clean dashboard.
          </p>

          <div className="space-y-4 pt-4 border-t border-purple-600/40">
            {[
              { icon: ShieldCheck, text: 'JWT Secured Token Authentication' },
              { icon: PieChart, text: 'Interactive Financial Analytics & Reports' },
              { icon: Lock, text: 'User Data Isolation & Encrypted Storage' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-purple-200">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-medium text-purple-100">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header & Logo for Mobile */}
          <div>
            <div className="lg:hidden mb-8">
              <Logo size="md" subtitle={true} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your email and password to access your account</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              value={email}
              label="Email Address"
              onchange={(e) => setEmail(e.target.value)}
              placeHolder="name@example.com"
              type="email"
            />

            <Input
              value={password}
              label="Password"
              onchange={(e) => setPassword(e.target.value)}
              placeHolder="Enter your password"
              type="password"
            />

            {error && (
              <div className="p-3 rounded-lg text-[13px] font-medium bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary w-full h-11 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-4 h-4" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-purple-700 hover:text-purple-900 transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Login