import { Icon } from "@iconify/react";

const items = [
    { icon: "ph:timer", label: "15+ Years Experience" },
    { icon: "ph:users-three", label: "20+ Professionals" },
    { icon: "ph:buildings", label: "DLF · Emaar · M3M" },
    { icon: "ph:smiley", label: "500+ Happy Clients" },
    { icon: "ph:scales", label: "Free Legal & Tax Advice" },
];

const TrustBar = () => {
    return (
        <div className="bg-primary py-4">
            <div className="container max-w-8xl mx-auto px-5 2xl:px-0">
                <div className="flex flex-wrap justify-center lg:justify-between items-center gap-y-3">
                    {items.map((item, index) => (
                        <div key={item.label} className="flex items-center">
                            <div className="flex items-center gap-3 px-6">
                                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <Icon icon={item.icon} width={18} height={18} className="text-white" />
                                </div>
                                <span className="text-sm font-semibold text-white whitespace-nowrap">
                                    {item.label}
                                </span>
                            </div>
                            {index < items.length - 1 && (
                                <span className="hidden lg:block w-px h-5 bg-white/30" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustBar;
