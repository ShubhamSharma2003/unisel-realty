// Google Tag Manager - Push events to dataLayer
export const pushToDataLayer = (event: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event)
  }
}

// Track page views
export const trackPageView = (pagePath: string, pageTitle: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  })
}

// Track custom events
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  pushToDataLayer({
    event: eventName,
    ...eventData,
  })
}

// Meta Pixel - Track events
export const trackPixelEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData || {})
  }
}

// Common tracking functions
export const trackPropertyView = (propertyData: {
  propertyId: string
  propertyName: string
  price?: number
  category?: string
}) => {
  trackEvent('view_property', {
    property_id: propertyData.propertyId,
    property_name: propertyData.propertyName,
    price: propertyData.price,
    category: propertyData.category,
  })

  trackPixelEvent('ViewContent', {
    content_name: propertyData.propertyName,
    content_ids: [propertyData.propertyId],
    content_type: 'product',
    value: propertyData.price || 0,
    currency: 'INR',
  })
}

export const trackBlogView = (blogData: { blogId: string; blogTitle: string }) => {
  trackEvent('view_blog', {
    blog_id: blogData.blogId,
    blog_title: blogData.blogTitle,
  })

  trackPixelEvent('ViewContent', {
    content_name: blogData.blogTitle,
    content_ids: [blogData.blogId],
    content_type: 'blog',
  })
}

export const trackContactFormSubmit = (contactData: {
  name?: string
  email?: string
  source?: string
}) => {
  trackEvent('contact_form_submit', {
    source: contactData.source || 'contact_page',
  })

  trackPixelEvent('Lead', {
    content_name: 'Contact Form',
    source: contactData.source || 'contact_page',
  })
}

export const trackPropertySearch = (filters: Record<string, any>) => {
  trackEvent('property_search', {
    filters: JSON.stringify(filters),
  })

  trackPixelEvent('Search', {
    search_string: JSON.stringify(filters),
  })
}

// Extend Window type for TypeScript
declare global {
  interface Window {
    dataLayer?: Record<string, any>[]
    fbq?: (action: string, event: string, data?: Record<string, any>) => void
  }
}
