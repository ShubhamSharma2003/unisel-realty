import PropertyCard from '@/components/Home/Properties/Card/Card'
import { getProperties, getPropertiesByCategory, getPropertiesByCategoryAndStatus } from '@/lib/sanity.services'

interface PropertiesListingProps {
  category?: string;
  status?: string;
}

const PropertiesListing: React.FC<PropertiesListingProps> = async ({ category, status }) => {
  const properties = await (
    category && status
      ? getPropertiesByCategoryAndStatus(category, status)
      : category
        ? getPropertiesByCategory(category)
        : getProperties()
  );

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
