# Analytics Integration Setup Guide

This guide walks you through setting up Google Tag Manager (GTM), Google Analytics 4 (GA4), and Meta Pixel for Unisel Realty.

## Quick Start

### 1. Get Your IDs

#### Google Tag Manager
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Create a new account (or use existing one)
3. Copy your **GTM ID** (format: `GTM-XXXXXXX`)

#### Google Analytics 4
1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property
3. Copy your **Measurement ID** (format: `G-XXXXXXX`)
4. **In GTM:** Create a new tag for GA4 and link it to your measurement ID

#### Meta Pixel
1. Go to [facebook.com/business/tools/meta-pixel](https://facebook.com/business/tools/meta-pixel)
2. Create a new pixel
3. Copy your **Pixel ID** (numeric, e.g., `123456789`)

### 2. Configure Environment Variables

Create `.env.local` in the `frontend` folder:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXX
```

### 3. Verify Installation

1. **Check GTM:** Open DevTools → Network tab → Search for `googletagmanager.com` requests
2. **Check Pixel:** Check for Facebook pixel initialization in console
3. **Check GA4:** In GTM, you'll see events firing in real-time

## Using Analytics in Your Code

### Track Custom Events

```typescript
import { trackEvent, trackPixelEvent } from '@/lib/analytics'

// GTM event
trackEvent('custom_event', { key: 'value' })

// Meta Pixel event
trackPixelEvent('CustomEvent', { key: 'value' })
```

### Track Property Views

```typescript
import { trackPropertyView } from '@/lib/analytics'

trackPropertyView({
  propertyId: '123',
  propertyName: 'Luxury Villa in Gurgaon',
  price: 2500000,
  category: 'residential',
})
```

### Track Blog Views

```typescript
import { trackBlogView } from '@/lib/analytics'

trackBlogView({
  blogId: 'blog-123',
  blogTitle: 'Real Estate Investment Guide',
})
```

### Track Contact Form Submissions

```typescript
import { trackContactFormSubmit } from '@/lib/analytics'

trackContactFormSubmit({
  name: 'John Doe',
  email: 'john@example.com',
  source: 'contact_page',
})
```

### Track Property Searches

```typescript
import { trackPropertySearch } from '@/lib/analytics'

trackPropertySearch({
  type: 'residential',
  priceMin: 5000000,
  priceMax: 50000000,
})
```

## Event Tracking in Components

### Example: Property Detail Page

```typescript
'use client'

import { useEffect } from 'react'
import { trackPropertyView } from '@/lib/analytics'

export default function PropertyDetail({ property }) {
  useEffect(() => {
    trackPropertyView({
      propertyId: property._id,
      propertyName: property.title,
      price: property.price,
      category: property.category,
    })
  }, [property._id])

  return <div>{/* your component */}</div>
}
```

### Example: Contact Form

```typescript
'use client'

import { trackContactFormSubmit } from '@/lib/analytics'

export default function ContactForm() {
  const handleSubmit = async (formData) => {
    trackContactFormSubmit({
      source: 'contact_form',
    })
    // Submit form logic...
  }

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>
}
```

## GTM Configuration (Important Setup Steps)

After creating your GTM account and linking GA4:

1. **Create GA4 Tag in GTM:**
   - Tag Type: Google Analytics: GA4 Configuration
   - Measurement ID: Your GA4 ID
   - Trigger: All Pages

2. **Create GA4 Event Tags:**
   - Tag Type: Google Analytics: GA4 Event
   - Event Name: (varies by event)
   - Measurement ID: Your GA4 ID
   - Trigger: Custom Event (if needed)

3. **Publish GTM Container:**
   - Click "Submit" to publish changes

## Common Events to Track

| Event | When | Where |
|-------|------|-------|
| `page_view` | Page loads | Auto (AnalyticsProvider) |
| `view_property` | Property detail page viewed | Property detail pages |
| `view_blog` | Blog post viewed | Blog pages |
| `contact_form_submit` | Contact form submitted | Contact form |
| `property_search` | User searches properties | Property listing pages |

## Debugging

### Check DataLayer (GTM)
```javascript
console.log(window.dataLayer)
```

### Check Meta Pixel
```javascript
console.log(window.fbq)
fbq('trackSelf')
```

### Check GA4 in GTM Preview Mode
1. In GTM, click "Preview" mode
2. Visit your site in another tab
3. See all events firing in real-time

## Meta Pixel Standard Events

Common Facebook pixel events for e-commerce/lead gen:

- `ViewContent` - User views a page/item
- `Search` - User searches
- `AddToCart` - Item added to cart
- `Purchase` - Purchase completed
- `Lead` - Lead form submitted
- `CompleteRegistration` - Sign up completed

## Support

For more info:
- [GTM Documentation](https://support.google.com/tagmanager)
- [GA4 Documentation](https://support.google.com/analytics)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
