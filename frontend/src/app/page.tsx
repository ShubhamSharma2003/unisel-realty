import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Hero from '@/components/Home/Hero'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
import Testimonial from '@/components/Home/Testimonial'
import BlogSmall from '@/components/shared/Blog'
import GetInTouch from '@/components/Home/GetInTouch'
import FAQ from '@/components/Home/FAQs'
import GoogleReviews from '@/components/Home/GoogleReviews'
import TrustBar from '@/components/shared/TrustBar'
import ServicesOffered from '@/components/Home/ServicesOffered'
import WhyUs from '@/components/Home/WhyUs'
import BuilderPartners from '@/components/Home/BuilderPartners'
import { FAQ_ITEMS } from '@/components/Home/FAQs'
import { homepageSchema } from '@/lib/jsonld'

export default function Home() {
  const schema = homepageSchema(FAQ_ITEMS)

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Hero />
      <TrustBar />
      <Services />
      <Properties />
      <ServicesOffered />
      <WhyUs />
      <BuilderPartners />
      <FeaturedProperty />
      <Testimonial />
      <GoogleReviews appId="81d9b80f-1860-4f42-b491-1f73506a22d0" />
      <BlogSmall />
      <GetInTouch />
      <FAQ />
    </main>
  )
}
