import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { getFooterMenus } from '@/lib/sanity.services'
import { organizationSchema } from '@/lib/jsonld'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from '@/components/nextauth/SessionProvider'
import { getNavLinks } from '@/lib/sanity.services'
import type { Session } from 'next-auth'

const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://uniselrealty.com'),
  title: {
    default: 'Unisel Realty — Gurgaon Real Estate Consultants | Residential & Commercial Properties',
    template: '%s | Unisel Realty',
  },
  description: 'Unisel Realty Pvt. Ltd. — Gurgaon\'s trusted real estate consultants with 15+ years experience. Buy, sell, or lease residential and commercial properties in Gurgaon. Expert team of 20+ professionals for new bookings, resale, and leasing.',
  keywords: [
    'real estate gurgaon',
    'property in gurgaon',
    'gurgaon properties',
    'residential property gurgaon',
    'commercial property gurgaon',
    'buy property gurgaon',
    'real estate consultant gurgaon',
    'new launch gurgaon',
    'ready to move gurgaon',
    'unisel realty',
    'golf course extension road',
    'pre leased property gurgaon',
  ],
  authors: [{ name: 'Unisel Realty Pvt Ltd', url: 'https://uniselrealty.com' }],
  alternates: {
    canonical: 'https://uniselrealty.com',
  },
  openGraph: {
    title: 'Unisel Realty — Gurgaon Real Estate Consultants',
    description: 'Gurgaon\'s trusted real estate consultants with 15+ years experience. Buy, sell, or lease residential and commercial properties.',
    url: 'https://uniselrealty.com',
    siteName: 'Unisel Realty',
    images: [
      {
        url: 'https://uniselrealty.com/images/header/unisel-logo.png',
        width: 500,
        height: 500,
        alt: 'Unisel Realty — Gurgaon Real Estate Consultants',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unisel Realty — Gurgaon Real Estate Consultants',
    description: 'Gurgaon\'s trusted real estate consultants with 15+ years experience. Buy, sell, or lease residential and commercial properties.',
    images: ['https://uniselrealty.com/images/header/unisel-logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noarchive: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const themeColor = [
  { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  { media: '(prefers-color-scheme: dark)', color: '#000000' },
]

const schema = organizationSchema();

export default async function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session: Session | null
}>) {
  const navLinks = await getNavLinks()
  const footerMenus = await getFooterMenus()

  return (
    <html lang='en'>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      </head>
      <body className={`${font.className} bg-white dark:bg-black antialiased`}>
        <NextTopLoader color="#2596be" />
        <SessionProviderComp session={session}>
          <ThemeProvider
            attribute='class'
            enableSystem={true}
            defaultTheme='light'>
            <Header navLinks={navLinks} />
            {children}
            <Footer footerMenus={footerMenus} />
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  )
}
