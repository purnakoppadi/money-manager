import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet, TrendingUp, TrendingDown, Filter, Mail, Shield, Lock,
  ArrowRight, PieChart, Tag, FileSpreadsheet, Menu, X, Check
} from 'lucide-react'
import Logo from '../components/Logo'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    { icon: TrendingUp, title: 'Income Tracking', desc: 'Log and monitor all your income sources with detailed categorization and date tracking.' },
    { icon: TrendingDown, title: 'Expense Tracking', desc: 'Record expenses by category and date to understand where your money goes.' },
    { icon: Tag, title: 'Category Management', desc: 'Create custom income and expense categories with icons for better organization.' },
    { icon: PieChart, title: 'Financial Analytics', desc: 'Visualize your finances with interactive charts showing income vs expense trends.' },
    { icon: Filter, title: 'Transaction Filtering', desc: 'Search and filter transactions by type, date range, amount, and keywords.' },
    { icon: FileSpreadsheet, title: 'Excel Export', desc: 'Download your financial data as Excel spreadsheets for offline analysis.' },
    { icon: Mail, title: 'Email Reports', desc: 'Send income and expense reports directly to your registered email address.' },
    { icon: Shield, title: 'Secure Authentication', desc: 'JWT-based authentication ensures your financial data remains private and protected.' },
  ]

  const steps = [
    { num: '01', title: 'Create Your Account', desc: 'Sign up in seconds with your email. Add a profile photo to personalize your experience.' },
    { num: '02', title: 'Track Income & Expenses', desc: 'Add transactions with categories, amounts, dates, and icons. Organize everything effortlessly.' },
    { num: '03', title: 'Understand Your Finances', desc: 'View dashboards, charts, and filtered reports to make informed financial decisions.' },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* ===== NAVBAR ===== */}
      <nav className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="page-container flex items-center justify-between h-full">
          
          {/* Logo */}
          <Link to="/" className="text-decoration-none">
            <Logo size="md" subtitle={true} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
            <Link to="/signup" className="btn btn-primary">
              Get Started <ArrowRight size={15} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-xl p-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 py-2">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 py-2">How It Works</a>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-gray-700 py-2">Login</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary w-full text-center justify-center">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section bg-grid-pattern">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 font-semibold text-xs mb-6">
                <Wallet size={15} /> Personal Finance Manager
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6 max-w-2xl">
                Take Control of Your Money.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600">Build Better Financial Habits.</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Track income, expenses, categories, and financial trends in one clean, intuitive dashboard. Stay in complete control of your personal finances effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/signup" className="btn btn-primary">
                  Get Started Free <ArrowRight size={16} />
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login to Dashboard
                </Link>
              </div>
            </div>

            {/* Right Column Dashboard Mockup */}
            <div className="animate-fade-in">
              <div className="relative">
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-purple-200 to-indigo-100 rounded-3xl blur-xl opacity-70" />
                
                {/* Dashboard Frame */}
                <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-6">
                  {/* Top Chrome Dots */}
                  <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
                    <span className="ml-2 text-xs font-semibold text-gray-400">Money Manager App</span>
                  </div>

                  {/* Summary Cards Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                      <p className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider">Balance</p>
                      <p className="text-base font-extrabold text-purple-900 mt-1">₹1,24,500</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-[10px] font-semibold text-green-600 uppercase tracking-wider">Income</p>
                      <p className="text-base font-extrabold text-green-700 mt-1">₹2,15,000</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-[10px] font-semibold text-red-600 uppercase tracking-wider">Expenses</p>
                      <p className="text-base font-extrabold text-red-700 mt-1">₹90,500</p>
                    </div>
                  </div>

                  {/* Visual Chart Bars */}
                  <div className="h-36 bg-slate-50 rounded-xl p-3 flex items-end justify-between gap-2 border border-gray-100">
                    {[45, 70, 50, 85, 60, 75, 95, 65, 80, 55, 90, 70].map((heightPercent, idx) => (
                      <div key={idx} className="flex-1 flex flex-col justify-end h-full">
                        <div 
                          className="w-full rounded-t-sm transition-all" 
                          style={{ 
                            height: `${heightPercent}%`, 
                            backgroundColor: idx % 2 === 0 ? '#6D28D9' : '#C4B5FD' 
                          }} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="page-container">
          
          <div className="section-header">
            <h2 className="section-title">Everything You Need to Manage Your Money</h2>
            <p className="section-subtitle">
              A comprehensive suite of tools to track, analyze, and optimize your personal finances.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                  <f.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section id="how-it-works" className="section-padding bg-white">
        <div className="page-container">
          
          <div className="section-header">
            <h2 className="section-title">Get Started in 3 Simple Steps</h2>
            <p className="section-subtitle">
              Start managing your personal finances in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xl mb-6">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== ANALYTICS & INSIGHTS ===== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <h2 className="section-title text-left mb-4">Powerful Financial Insights</h2>
              <p className="text-base text-gray-600 mb-8 leading-relaxed">
                Understand your spending habits and income sources with clear, interactive visual analytics.
              </p>
              
              <div className="space-y-4">
                {[
                  'Interactive line charts for income & expense trends',
                  'Donut chart breakdown of your net financial balance',
                  'Filterable transaction history with sorting controls',
                  'Instant Excel spreadsheet exports and email reports'
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700">
                      <Check size={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Demo Card */}
            <div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div>
                    <h4 className="text-base font-bold text-gray-900">Financial Overview</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Income vs Expense trends</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                    This Month
                  </span>
                </div>

                {/* Line Chart Preview */}
                <div className="h-48 w-full mb-4">
                  <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,110 C60,90 120,50 180,70 C240,90 300,30 400,25 L400,160 L0,160 Z" fill="url(#incomeGrad)" />
                    <path d="M0,110 C60,90 120,50 180,70 C240,90 300,30 400,25" fill="none" stroke="#16A34A" strokeWidth="3" />
                    <path d="M0,135 C60,140 120,115 180,125 C240,135 300,105 400,95" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="5,5" />
                  </svg>
                </div>

                <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                    <span>Income Trend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-600 inline-block" />
                    <span>Expense Trend</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== SECURITY SECTION ===== */}
      <section className="section-padding bg-white">
        <div className="page-container">
          
          <div className="section-header">
            <h2 className="section-title">Your Data, Secured</h2>
            <p className="section-subtitle">
              Engineered with enterprise-grade security protocols to keep your data private.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Lock, title: 'JWT Authentication', desc: 'Secure token-based user sessions with encrypted payload verification.' },
              { icon: Shield, title: 'User-Specific Isolation', desc: 'Your financial database entries are completely isolated to your account.' },
              { icon: Wallet, title: 'Secure Login', desc: 'Encrypted authentication flow guarding your credentials.' },
              { icon: FileSpreadsheet, title: 'Protected APIs', desc: 'All backend REST endpoints enforce JWT authorization checks.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                  <item.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-primary-50)' }}>
        <div className="page-container text-center">
          <h2 className="section-title mb-4">Start Managing Your Money Today</h2>
          <p className="section-subtitle mb-8">
            Join now and take the first step towards smarter money management habits. Free forever.
          </p>
          <Link to="/signup" className="btn btn-primary text-base px-8 py-3.5 h-auto">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-white border-t border-gray-200 section-padding">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Col 1 */}
            <div>
              <div className="mb-4">
                <Logo size="sm" showText={true} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                A personal finance management platform designed to help you organize income, track expenses, and build lasting financial habits.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2.5">
                <li><a href="#features" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">How It Works</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Account</h4>
              <ul className="space-y-2.5">
                <li><Link to="/login" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Login</Link></li>
                <li><Link to="/signup" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition-colors">Create Account</Link></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>&copy; {new Date().getFullYear()} Money Manager. All rights reserved.</p>
            <p>Built for personal finance management.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default LandingPage
