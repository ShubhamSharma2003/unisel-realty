import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import { getFooterMenus } from '@/lib/sanity.services'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from '@/components/nextauth/SessionProvider'
import { getNavLinks } from '@/lib/sanity.services'

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
        url: 'https://uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png',
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
    images: ['https://uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
  viewport: 'width=device-width, initial-scale=1',
}

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://uniselrealty.com/",
      "url": "https://uniselrealty.com/",
      "name": "Home - Unisel Realty",
      "isPartOf": { "@id": "https://uniselrealty.com/#website" },
      "about": { "@id": "https://uniselrealty.com/#organization" },
      "primaryImageOfPage": { "@id": "https://uniselrealty.com/#primaryimage" },
      "image": { "@id": "https://uniselrealty.com/#primaryimage" },
      "thumbnailUrl": "https://i0.wp.com/uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png?fit=500%2C500&ssl=1",
      "datePublished": "2016-02-15T23:00:39+00:00",
      "dateModified": "2025-05-25T08:19:00+00:00",
      "description": "Unisel Realty Pvt. Ltd. is based in Gurgaon at the key location of Golf Course Extension Road, with over 15 years of rich experience in real estate. With a specialised team of 20+ professionals in new booking, leasing, resale, etc., we deal with residential as well as commercial projects. Our strength is our team of progressive and dynamic leaders, who have been felicitated by numerous developers and clients for their transparency and reliability.",
      "breadcrumb": { "@id": "https://uniselrealty.com/#breadcrumb" },
      "inLanguage": "en-US",
      "potentialAction": [{ "@type": "ReadAction", "target": ["https://uniselrealty.com/"] }]
    },
    {
      "@type": "ImageObject",
      "inLanguage": "en-US",
      "@id": "https://uniselrealty.com/#primaryimage",
      "url": "https://i0.wp.com/uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png?fit=500%2C500&ssl=1",
      "contentUrl": "https://i0.wp.com/uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png?fit=500%2C500&ssl=1",
      "width": 500,
      "height": 500
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://uniselrealty.com/#breadcrumb",
      "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home" }]
    },
    {
      "@type": "WebSite",
      "@id": "https://uniselrealty.com/#website",
      "url": "https://uniselrealty.com/",
      "name": "Unisel Realty",
      "description": "Unisel Realty",
      "publisher": { "@id": "https://uniselrealty.com/#organization" },
      "potentialAction": [{
        "@type": "SearchAction",
        "target": { "@type": "EntryPoint", "urlTemplate": "https://uniselrealty.com/?s={search_term_string}" },
        "query-input": { "@type": "PropertyValueSpecification", "valueRequired": true, "valueName": "search_term_string" }
      }],
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://uniselrealty.com/#organization",
      "name": "Unisel Realty",
      "url": "https://uniselrealty.com/",
      "logo": {
        "@type": "ImageObject",
        "inLanguage": "en-US",
        "@id": "https://uniselrealty.com/#/schema/logo/image/",
        "url": "https://i0.wp.com/uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png?fit=500%2C500&ssl=1",
        "contentUrl": "https://i0.wp.com/uniselrealty.com/wp-content/uploads/2024/05/unisel_logo-removebg-preview.png?fit=500%2C500&ssl=1",
        "width": 500,
        "height": 500,
        "caption": "Unisel Realty"
      },
      "image": { "@id": "https://uniselrealty.com/#/schema/logo/image/" },
      "sameAs": ["https://www.facebook.com/uniselrealty"]
    }
  ]
};

export default async function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session: any
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
