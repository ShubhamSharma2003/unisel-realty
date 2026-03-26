import { Icon } from "@iconify/react";
import Image from "next/image";
import { getBuilderPartners } from "@/lib/sanity.services";
import { urlFor } from "@/lib/sanity.image";

const BuilderPartners = async () => {
    const partners = await getBuilderPartners();

    if (!partners || partners.length === 0) return null;

    // Duplicate for seamless infinite loop
    const track = [...partners, ...partners];

    return (
        <section className="bg-black/[0.02] dark:bg-white/[0.02] border-y border-black/10 dark:border-white/10">
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0 mb-10">
                <div className="text-center">
                    <p className="text-dark/75 dark:text-white/75 text-base font-semibold flex gap-2.5 justify-center mb-4">
                        <Icon icon="ph:house-simple-fill" className="text-2xl text-primary" />
                        Builder Partners
                    </p>
                    <h2 className="text-40 lg:text-52 font-medium leading-[1.2] text-dark dark:text-white">
                        Trusted by India&apos;s top developers.
                    </h2>
                </div>
            </div>

            {/* Scrolling strip */}
            <div className="relative overflow-hidden">
                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#f9f9f9] dark:from-[#0f0f0f] to-transparent z-10" />
                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f9f9f9] dark:from-[#0f0f0f] to-transparent z-10" />

                <div
                    className="flex gap-6 w-max"
                    style={{ animation: "marquee 28s linear infinite" }}
                >
                    {track.map((partner, index) => (
                        <div
                            key={`${partner._id}-${index}`}
                            className="flex items-center justify-center px-0 py-0 border border-black/10 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 min-w-[180px] h-[80px] flex-shrink-0 hover:border-primary/50 duration-300"
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <Image
                                    src={urlFor(partner.logo).width(300).url()}
                                    alt={partner.name}
                                    fill
                                    className="object-cover"
                                    sizes="180px"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BuilderPartners;
