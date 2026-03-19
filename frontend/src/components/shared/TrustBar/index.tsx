"use client";

const TrustBar = () => {
    const trustItems = [
        "18 Years in Gurgaon",
        "₹2,400 Cr+ Transacted",
        "500+ Families Served",
        "200+ NRI Investors",
        "DLF · Godrej · M3M Authorised Partner",
        "Dubai Office",
        "RERA Registered",
    ];

    // Duplicate items for seamless loop
    const marqueeItems = [...trustItems, ...trustItems];

    return (
        <div className="bg-primary py-4 overflow-hidden">
            <div className="relative w-full">
                <style>{`
                    @keyframes marquee {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    .marquee-content {
                        animation: marquee 15s linear infinite;
                    }
                `}</style>
                <div className="marquee-content flex whitespace-nowrap items-center">
                    {marqueeItems.map((item, index) => (
                        <span key={index} className="flex items-center flex-shrink-0">
                            <span className="text-sm sm:text-base font-semibold text-white px-10">
                                {item}
                            </span>
                            <span className="text-white/40 text-base">{" "}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
