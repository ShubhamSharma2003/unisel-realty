import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Hard-coded token - change this to a secure random string in production
const REVALIDATE_SECRET = process.env.SANITY_REVALIDATE_SECRET || 'default-secret-change-this'

export async function POST(request: NextRequest) {
  // Verify the secret token from Sanity webhook
  const secret = request.headers.get('x-sanity-webhook-secret')

  if (secret !== REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()

    // Log the webhook payload for debugging
    console.log('Sanity webhook received:', body)

    // Extract document types that were published
    const documentIds = body._ids || []
    const deletedIds = body._deleted || []

    // Revalidate all relevant tags and pages
    // This will clear the ISR cache for all pages using Sanity data
    revalidateTag('sanity-data')
    revalidateTag('properties')
    revalidateTag('blogs')
    revalidateTag('testimonials')
    revalidateTag('navlinks')
    revalidateTag('footermenus')
    revalidateTag('heroBanner')
    revalidateTag('featuredProperty')

    // Also revalidate root and service pages
    revalidateTag('home')
    revalidateTag('service-pages')

    console.log('Revalidated tags for IDs:', documentIds)

    return NextResponse.json(
      {
        revalidated: true,
        message: `Revalidation triggered for ${documentIds.length} document(s)`,
        ids: documentIds,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Revalidation failed', error: String(error) },
      { status: 500 }
    )
  }
}
