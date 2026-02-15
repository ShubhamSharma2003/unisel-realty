import FeaturedProperty from '@/components/Home/FeaturedProperty'
import Hero from '@/components/Home/Hero'
import Properties from '@/components/Home/Properties'
import Services from '@/components/Home/Services'
import Testimonial from '@/components/Home/Testimonial'
import BlogSmall from '@/components/shared/Blog'
import GetInTouch from '@/components/Home/GetInTouch'
import FAQ from '@/components/Home/FAQs'
import GoogleReviews from '@/components/Home/GoogleReviews'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Properties />
      <FeaturedProperty />
      <Testimonial />
      <GoogleReviews appId="81d9b80f-1860-4f42-b491-1f73506a22d0" />
      <BlogSmall />
      <GetInTouch />
      <FAQ />
    </main>
  )
}
