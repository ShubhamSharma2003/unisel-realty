'use client'

import { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'

type Status = 'idle' | 'loading' | 'success' | 'error'

const trustPoints = [
  {
    icon: 'ph:rocket-launch',
    title: 'Pre-Launch Access',
    description: '18-year track record with DLF, Godrej & M3M',
  },
  {
    icon: 'ph:chart-line-up',
    title: '₹2,400 Cr+ Transacted',
    description: 'Investment advisory that puts your returns first',
  },
  {
    icon: 'ph:house-simple',
    title: '10,000+ Families Served',
    description: '90% client retention rate',
  },
  {
    icon: 'ph:globe',
    title: '200+ NRI Clients',
    description: 'Complete support from first call to registration',
  },
]

const valuationBenefits = [
  { icon: 'ph:calculator', text: 'Instant Valuation Report' },
  { icon: 'ph:trending-up', text: 'Investment Potential Analysis' },
  { icon: 'ph:clock', text: 'Market Insights & Trends' },
]

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const popupClosed = sessionStorage.getItem('popupFormClosed')
    if (popupClosed) return

    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('popupFormClosed', 'true')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        source: 'popup',
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await response.json()

      if (!response.ok) {
        setErrorMsg(json.error ?? 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('success')
        formRef.current?.reset()
        // Auto-close after 3 seconds
        setTimeout(() => {
          handleClose()
        }, 3000)
      }
    } catch (error) {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
      console.error(error)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4">
        <div className="bg-white dark:bg-dark rounded-xl sm:rounded-2xl shadow-3xl w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl md:max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Brand & Trust - Hidden on mobile, shown on md+ */}
            <div className="hidden md:flex bg-gradient-to-br from-dark to-dark/90 text-white p-6 md:p-8 flex-col justify-between min-h-96">
              {/* Logo */}
              <div>
                <Image
                  src="/images/header/new-logo-white.png"
                  alt="Unisel Realty"
                  width={180}
                  height={80}
                  unoptimized={true}
                  className="h-auto w-24 md:w-28"
                />
              </div>

              {/* Main Message */}
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 leading-tight">
                  We Consult You Which Ones to Buy.
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  Most brokers show properties. We advise on the right investment decisions.
                </p>

                {/* Quick Stats */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <Icon icon="ph:check-circle" width={16} height={16} className="text-primary flex-shrink-0" />
                    <span>₹2,400 Cr+ transacted • 90% retention</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/90">
                    <Icon icon="ph:check-circle" width={16} height={16} className="text-primary flex-shrink-0" />
                    <span>20-year track record with top builders</span>
                  </div>
                </div>
              </div>

              {/* Valuation CTA */}
              <div className="pt-4 border-t border-white/20">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon
                      icon="ph:sparkle"
                      width={16}
                      height={16}
                      className="text-yellow-300 flex-shrink-0"
                    />
                    <p className="text-sm font-semibold text-white">Wanna know the real worth?</p>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-3">
                    Get your property valued in seconds with our AI-powered valuation engine
                  </p>

                  {/* Valuation Benefits */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-xs text-white/90">
                      <Icon icon="ph:check-circle" width={14} height={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Current market value estimate</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-white/90">
                      <Icon icon="ph:check-circle" width={14} height={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Price comparison with similar properties</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-white/90">
                      <Icon icon="ph:check-circle" width={14} height={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Investment growth potential</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-white/90">
                      <Icon icon="ph:check-circle" width={14} height={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span>Area trends & market insights</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/property-valuation"
                  onClick={handleClose}
                  className="w-full block text-center bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg transition text-sm"
                >
                  Get Free Valuation →
                </Link>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col max-h-[90vh] md:max-h-none">
              {/* Header */}
              <div className="flex justify-between items-center gap-4 mb-3 sm:mb-6">
                <h3 className="text-base sm:text-xl md:text-2xl font-medium text-dark dark:text-white">
                  Get in Touch
                </h3>
                <button
                  onClick={handleClose}
                  className="text-dark/40 dark:text-white/40 hover:text-dark dark:hover:text-white transition flex-shrink-0 cursor-pointer"
                >
                  <Icon icon="tabler:x" width={20} height={20} />
                </button>
              </div>

              {/* Mobile Valuation Section - Compact */}
              <div className="md:hidden mb-3 p-3 bg-gradient-to-br from-primary/15 to-primary/5 dark:from-primary/25 dark:to-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-start gap-2 mb-2">
                  <Icon
                    icon="ph:sparkle"
                    width={16}
                    height={16}
                    className="text-primary flex-shrink-0 mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-dark dark:text-white">Wanna know the real worth?</p>
                    <p className="text-xs text-dark/70 dark:text-white/70 mt-0.5">
                      Get valued in seconds
                    </p>
                  </div>
                </div>

                {/* Valuation Benefits - 2 column on mobile */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-start gap-1.5 text-xs text-dark/80 dark:text-white/80">
                    <Icon icon="ph:check-circle" width={12} height={12} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Market value</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs text-dark/80 dark:text-white/80">
                    <Icon icon="ph:check-circle" width={12} height={12} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Price comparison</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs text-dark/80 dark:text-white/80">
                    <Icon icon="ph:check-circle" width={12} height={12} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Growth potential</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs text-dark/80 dark:text-white/80">
                    <Icon icon="ph:check-circle" width={12} height={12} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Market trends</span>
                  </div>
                </div>

                <Link
                  href="/property-valuation"
                  onClick={handleClose}
                  className="w-full block text-center bg-primary hover:bg-primary/90 text-white font-medium py-1.5 rounded-lg transition text-xs"
                >
                  Get Free Valuation →
                </Link>
              </div>

              <p className="text-dark/60 dark:text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                Connect with our advisors. We'll contact you within 2 business hours.
              </p>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center gap-3 py-6 sm:py-8 flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center animate-bounce">
                    <Icon icon="ph:check-circle" width={28} height={28} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-dark dark:text-white mb-1">
                      We have received your enquiry.
                    </p>
                    <p className="text-xs sm:text-sm text-dark/50 dark:text-white/50 leading-relaxed px-2">
                      Your assigned Unisel advisor will contact you within 2 business hours. WhatsApp preferred for NRI clients.
                    </p>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-4 flex-1 overflow-y-auto">
                  <div>
                    <label className="block text-xs font-medium text-dark/70 dark:text-white/70 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="w-full bg-transparent text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 border border-dark/10 dark:border-white/10 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm focus-visible:outline-none focus-visible:border-primary hover:border-primary/40 duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-dark/70 dark:text-white/70 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone"
                      required
                      className="w-full bg-transparent text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 border border-dark/10 dark:border-white/10 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm focus-visible:outline-none focus-visible:border-primary hover:border-primary/40 duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-dark/70 dark:text-white/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email"
                      required
                      className="w-full bg-transparent text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 border border-dark/10 dark:border-white/10 rounded-lg px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm focus-visible:outline-none focus-visible:border-primary hover:border-primary/40 duration-200"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-xs p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white font-medium py-2 sm:py-2.5 rounded-lg transition disabled:cursor-not-allowed mt-1 text-xs sm:text-sm"
                  >
                    {status === 'loading' ? 'Submitting...' : 'Connect Now'}
                  </button>

                  <p className="text-xs text-dark/50 dark:text-white/50 text-center flex items-center justify-center gap-1 pt-1">
                    <Icon icon="ph:lock" width={11} height={11} />
                    Secure • Never shared
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
