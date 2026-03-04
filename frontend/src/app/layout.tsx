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
    default: 'Home - Unisel Realty',
    template: '%s | Unisel Realty',
  },
  description: 'Unisel Realty Pvt. Ltd. is based in Gurgaon at the key location of Golf Course Extension Road, with over 15 years of rich experience in real estate. With a specialised team of 20+ professionals in new booking, leasing, resale, etc., we deal with residential as well as commercial projects. Our strength is our team of progressive and dynamic leaders, who have been felicitated by numerous developers and clients for their transparency and reliability.',
  keywords: [
    'real estate',
    'property',
    'gurgaon',
    'golf course extension road',
    'residential',
    'commercial',
    'leasing',
    'resale',
    'new booking',
    'unisel realty',
  ],
  authors: [{ name: 'Unisel Realty Pvt Ltd', url: 'https://uniselrealty.com' }],
  openGraph: {
    title: 'Home - Unisel Realty',
    description: 'Unisel Realty Pvt. Ltd. is based in Gurgaon at the key location of Golf Course Extension Road, with over 15 years of rich experience in real estate. With a specialised team of 20+ professionals in new booking, leasing, resale, etc., we deal with residential as well as commercial projects. Our strength is our team of progressive and dynamic leaders, who have been felicitated by numerous developers and clients for their transparency and reliability.',
    url: 'https://uniselrealty.com',
    siteName: 'Unisel Realty',
    images: [
      {
        url: 'https://uniselrealty.com/images/header/unisel-logo.png',
        width: 500,
        height: 500,
        alt: 'Unisel Realty logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home - Unisel Realty',
    description: 'Unisel Realty Pvt. Ltd. is based in Gurgaon at the key location of Golf Course Extension Road, with over 15 years of rich experience in real estate.',
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
