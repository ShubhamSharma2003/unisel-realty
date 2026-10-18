'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

/**
 * Page-view tracking on route change.
 *
 * Deliberately avoids useSearchParams(): that hook forces any component that
 * calls it into client-side rendering, and the whole page tree was once
 * wrapped in its Suspense boundary, so every static page shipped an empty
 * body to crawlers. The query string is read from window.location inside the
 * effect instead, which runs client-side anyway and needs no boundary.
 */
function PageViewTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const search = window.location.search
    trackPageView(pathname + search, document.title)
  }, [pathname])

  return null
}

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  return (
    <>
      <PageViewTracker />
      {children}
    </>
  )
}
