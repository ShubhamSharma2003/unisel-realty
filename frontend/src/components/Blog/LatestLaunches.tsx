import Link from "next/link";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import { getAdvertisableNewLaunches } from "@/lib/sanity.services";

/**
 * Newest RERA-registered launches, shown alongside the news. It links the
 * newsroom to the listings that searches for "new launch projects" land on.
 */
const LatestLaunches = async ({ limit = 3 }: { limit?: number }) => {
    const launches = (await getAdvertisableNewLaunches()).slice(0, limit);
    if (!launches.length) return null;

    return (
        <section>
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-dark dark:text-white text-3xl md:text-40 font-semibold">
                            New launches we&apos;re tracking
                        </h2>
                        <p className="mt-2 text-dark/50 dark:text-white/50">RERA-registered projects in Gurgaon.</p>
                    </div>
                    <Link
                        href="/residential/new-launch"
                        className="bg-dark dark:bg-white text-white dark:text-dark py-4 px-8 rounded-full hover:bg-primary duration-300"
                    >
                        All new launch projects
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {launches.map((item) => (
                        <PropertyCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestLaunches;
