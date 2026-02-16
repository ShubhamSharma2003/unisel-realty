import PropertyCard from '@/components/Home/Properties/Card/Card'
import { getProperties } from '@/lib/sanity.services'

const PropertiesListing: React.FC = async () => {
  const properties = await getProperties();

  return (
    <section className='pt-0!'>
      <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
          {properties.map((item, index) => (
            <div key={item._id || index} className=''>
              <PropertyCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PropertiesListing
