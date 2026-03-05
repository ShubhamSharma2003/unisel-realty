import { Suspense } from 'react'
import { getProperties, getPropertiesByCategory, getPropertiesByCategoryAndStatus } from '@/lib/sanity.services'
import PropertyListingClient from '@/components/Properties/PropertyListingClient'

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

  // New-launch properties must be RERA-approved before they can be advertised (RERA Act 2016)
  const displayProperties = status === "new-launch"
    ? properties.filter((p) => p.reraApproved === true)
    : properties;

  return (
    <Suspense>
      <PropertyListingClient properties={displayProperties} />
    </Suspense>
  )
}

export default PropertiesListing
