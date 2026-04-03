'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { trackPageView } from '@/lib/analytics'

function AnalyticsContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views whenever route changes
    const url = pathname + (searchParams ? `?${searchParams}` : '')
    trackPageView(url, document.title)
  }, [pathname, searchParams])

  return <>{children}</>
}

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent>{children}</AnalyticsContent>
    </Suspense>
  )
}
