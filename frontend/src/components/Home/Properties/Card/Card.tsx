import { PropertyHomes } from '@/types/properyHomes'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

const PropertyCard: React.FC<{ item: PropertyHomes }> = ({ item }) => {
  const { name, location, rate, configuration, structure, area, slug, images } = item

  const mainImageSource = images?.[0];
  const mainImage = mainImageSource
    ? typeof mainImageSource === 'object' && 'src' in mainImageSource
      ? mainImageSource.src
      : typeof mainImageSource === 'object' && 'asset' in mainImageSource
        ? urlFor(mainImageSource).width(880).height(600).fit('crop').url()
        : null
    : null;
  const rateLabel = rate ?? '';

  return (
    <div className='h-full'>
      <div className='relative rounded-2xl border border-dark/10 dark:border-white/10 group hover:shadow-3xl duration-300 dark:hover:shadow-white/20 h-full flex flex-col'>
        <div className='overflow-hidden rounded-t-2xl'>
          <Link href={`/properties/${slug}`}>
            {mainImage && (
              <Image
                src={mainImage}
                alt={name}
                width={440}
                height={300}
                className='w-full rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75'
              />
            )}
          </Link>
          <div className='absolute top-6 right-6 p-4 bg-white rounded-full hidden group-hover:block'>
            <Icon
              icon={'solar:arrow-right-linear'}
              width={24}
              height={24}
              className='text-black'
            />
          </div>
        </div>
        <div className='px-3 py-6 flex-1 flex flex-col'>
          <div className='flex flex-col mobile:flex-row gap-5 mobile:gap-0 justify-between mb-6 flex-1'>
            <div>
              <Link href={`/properties/${slug}`}>
                <h3 className='text-xl font-medium text-black dark:text-white duration-300 group-hover:text-primary'>
                  {name}
                </h3>
              </Link>
              <p className='text-base font-normal text-black/50 dark:text-white/50'>
                {location}
              </p>
            </div>
            <div>
              {rateLabel ? (
                <button className='text-base font-normal text-primary px-5 py-2 rounded-full bg-primary/10'>
                  {rateLabel}
                </button>
              ) : null}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mobile:text-base">
            <div className="flex flex-col items-center justify-center gap-2 text-center border-r border-black/10 dark:border-white/20 pr-4">
              <Icon icon={'solar:home-2-linear'} width={20} height={20} />
              <span>{configuration}</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center border-r border-black/10 dark:border-white/20 px-4">
              <Icon icon={'solar:buildings-2-linear'} width={20} height={20} />
              <span>{structure}</span>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 text-center pl-4">
              <Icon icon={'lineicons:arrow-all-direction'} width={20} height={20} />
              <span>{area}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
