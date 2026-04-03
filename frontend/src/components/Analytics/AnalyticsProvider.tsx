'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views whenever route changes
    const url = pathname + (searchParams ? `?${searchParams}` : '')
    trackPageView(url, document.title)
  }, [pathname, searchParams])

  return <>{children}</>
}
