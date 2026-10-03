import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import Input from "../components/Input"
import { validEmail } from "../util/validation"
import axiosConfig from "../util/AxiosConfig"
import API_ENDPOINTS from "../util/apiEndpoints"
import toast from "react-hot-toast"
import { LoaderCircle, ArrowRight, ShieldCheck, CheckCircle2, UserPlus, AlertCircle, MailCheck } from "lucide-react"
import ProfilePhotoSelector from "../components/ProfilePhotoSelector"
import uploadProfileImage from "../util/uploadProfileImage"
import Logo from "../components/Logo"

const Signup = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState(null)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let profileImageUrl = ""

    setIsLoading(true)
    setError("")

    if (!fullName.trim()) {
      setError("Please enter your full name")
      setIsLoading(false)
      return
    }

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
      if (profilePhoto) {
        const imageUrl = await uploadProfileImage(profilePhoto)
        profileImageUrl = imageUrl || ""
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      })

      if (response.status === 201 || response.status === 200) {
        setIsSuccess(true)
      }
    } catch (err) {
      console.error("Registration Error:", err)
      setError(
        err.response?.data?.message ||
        "Registration failed. Please check your information and try again."
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
            Start Your Financial Journey
          </h2>
          
          <p className="text-base text-purple-100 leading-relaxed mb-10 max-w-md">
            Create your account in less than a minute and gain complete visibility into your income, expenses, and financial balance.
          </p>

          <div className="space-y-4 pt-4 border-t border-purple-600/40">
            {[
              { icon: CheckCircle2, text: 'Custom Income & Expense Categorization' },
              { icon: UserPlus, text: 'Personal Profile Customization' },
              { icon: ShieldCheck, text: 'Encrypted Data Storage & Account Protection' },
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
        <div className="w-full max-w-md space-y-6">
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-8 px-4 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 shadow-sm">
                <MailCheck size={32} />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Account created successfully!</h2>
              <p className="text-sm text-gray-600 mb-6 max-w-sm">
                An activation link has been sent to your email address (<b>{email}</b>).
                Please check your inbox and click the activation link to activate your account.
              </p>
              
              <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <ol className="text-sm text-gray-700 text-left space-y-2 list-decimal list-inside font-medium">
                  <li>Check your email inbox</li>
                  <li>Click the activation link inside</li>
                  <li>Return here to log in</li>
                </ol>
              </div>

              <Link
                to="/login"
                className="btn btn-primary w-full h-11 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                Go to Login <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              {/* Header & Logo for Mobile */}
              <div>
                <div className="lg:hidden mb-6">
                  <Logo size="md" subtitle={true} />
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h1>
                <p className="text-sm text-gray-500 mt-1.5">Join Money Manager to start organizing your personal finances</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Profile Photo Selector */}
                <div className="flex justify-center pb-2">
                  <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                </div>

                {/* Desktop 2-column input grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    value={fullName}
                    label="Full Name"
                    onchange={(e) => setFullName(e.target.value)}
                    placeHolder="John Doe"
                    type="text"
                  />

                  <Input
                    value={email}
                    label="Email Address"
                    onchange={(e) => setEmail(e.target.value)}
                    placeHolder="name@example.com"
                    type="email"
                  />
                </div>

                <Input
                  value={password}
                  label="Password"
                  onchange={(e) => setPassword(e.target.value)}
                  placeHolder="Create a password"
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-bold text-purple-700 hover:text-purple-900 transition-colors"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}

        </div>
      </div>

    </div>
  )
}

export default Signup