import { Suspense } from 'react'
import { getPropertiesByMicromarket } from '@/lib/sanity.services'
import PropertyListingClient from '@/components/Properties/PropertyListingClient'

interface Props {
  micromarket: string;
}

const PropertiesListingByMicromarket: React.FC<Props> = async ({ micromarket }) => {
  const properties = await getPropertiesByMicromarket(micromarket);
  const residential = properties.filter(p => p.category === 'residential');
  const commercial = properties.filter(p => p.category === 'commercial');

  if (residential.length === 0 && commercial.length === 0) {
    return (
      <section className="pt-0!">
        <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <h3 className="text-xl font-medium text-dark dark:text-white">No properties found</h3>
            <p className="text-dark/50 dark:text-white/50 text-sm max-w-xs">
              No properties are currently listed in this location. Check back soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {residential.length > 0 && (
        <section className="pt-0!">
          <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
            <h2 className="text-2xl font-semibold text-dark dark:text-white mb-6">Residential Properties</h2>
            <Suspense>
              <PropertyListingClient properties={residential} />
            </Suspense>
          </div>
        </section>
      )}
      {commercial.length > 0 && (
        <section className="pt-0!">
          <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
            <h2 className="text-2xl font-semibold text-dark dark:text-white mb-6">Commercial Properties</h2>
            <Suspense>
              <PropertyListingClient properties={commercial} />
            </Suspense>
          </div>
        </section>
      )}
    </>
  );
}

export default PropertiesListingByMicromarket
