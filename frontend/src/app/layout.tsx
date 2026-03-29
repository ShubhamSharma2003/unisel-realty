import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import FloatingContact from '@/components/shared/FloatingContact'
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
    default: 'Unisel Realty — Luxury Real Estate & Investment Advisory, Gurgaon',
    template: '%s | Unisel Realty',
  },
  description: "Gurgaon's most trusted advisors for luxury real estate & high-return investments. Exclusive pre-launch access to DLF, Godrej and M3M. Dedicated NRI desk. $2B+ transacted. Est. 2006.",
  keywords: [
    'real estate gurgaon',
    'luxury real estate gurgaon',
    'property investment gurgaon',
    'DLF properties gurgaon',
    'Godrej properties gurgaon',
    'M3M properties gurgaon',
    'pre-launch properties gurgaon',
    'residential property gurgaon',
    'commercial property gurgaon',
    'NRI real estate gurgaon',
    'real estate consultant gurgaon',
    'new launch gurgaon',
    'ready to move gurgaon',
    'unisel realty',
    'golf course road gurgaon',
    'pre leased property gurgaon',
  ],
  authors: [{ name: 'Unisel Realty Pvt Ltd', url: 'https://uniselrealty.com' }],
  alternates: {
    canonical: 'https://uniselrealty.com',
  },
  openGraph: {
    title: 'Unisel Realty — Luxury Real Estate & Investment Advisory, Gurgaon',
    description: "Gurgaon's most trusted advisors for luxury real estate & high-return investments. Exclusive pre-launch access to DLF, Godrej and M3M. Dedicated NRI desk. Est. 2006.",
    url: 'https://uniselrealty.com',
    siteName: 'Unisel Realty',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unisel Realty — Luxury Real Estate & Investment Advisory, Gurgaon',
    description: "Gurgaon's most trusted advisors for luxury real estate & high-return investments. Exclusive pre-launch access to DLF, Godrej and M3M. Dedicated NRI desk. Est. 2006.",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  verification: {
    google: 'k3UBVfGOZNB1GCytqD4xbgETFhZ1HNAzgfs-_nW5kH4',
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
            <FloatingContact />
          </ThemeProvider>
        </SessionProviderComp>
      </body>
    </html>
  )
}
