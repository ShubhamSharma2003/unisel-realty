"use client";

import { Icon } from "@iconify/react";
import CustomSelect from "./CustomSelect";

const BUDGET_OPTIONS = [
    { value: "1-3cr", label: "₹1–3 Cr" },
    { value: "3-7cr", label: "₹3–7 Cr" },
    { value: "7-15cr", label: "₹7–15 Cr" },
    { value: "15cr+", label: "₹15 Cr+" },
];

const PROPERTY_TYPE_OPTIONS = [
    { value: "luxury-residential", label: "Luxury Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "sco-plot", label: "SCO Plot" },
    { value: "nri-advisory", label: "NRI Advisory" },
];

const CONTACT_METHOD_OPTIONS = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "video-call", label: "Video Call" },
    { value: "phone", label: "Phone" },
    { value: "email", label: "Email" },
];

type ContactFormProps = {
    /** "sidebar" renders smaller inputs and includes the header copy */
    variant?: "page" | "sidebar";
};

const inputBase =
    "w-full bg-transparent text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 border border-dark/10 dark:border-white/10 rounded-full focus-visible:outline-none focus-visible:border-primary hover:border-primary/40 duration-200";

const ContactForm = ({ variant = "page" }: ContactFormProps) => {
    const isSidebar = variant === "sidebar";
    const inputClass = isSidebar
        ? `${inputBase} px-5 py-3 text-sm`
        : `${inputBase} px-6 py-3.5 text-base`;

    return (
        <>
            {isSidebar && (
                <div className="mb-5">
                    <p className="text-xs font-semibold text-primary flex items-center gap-1.5 mb-2">
                        <Icon icon="ph:house-simple-fill" width={14} height={14} />
                        Get Started
                    </p>
                    <h3 className="text-xl font-medium text-dark dark:text-white leading-snug">
                        Tell Us What You Are Looking For. We&apos;ll Tell You Exactly What to Buy.
                    </h3>
                    <p className="text-sm text-dark/50 dark:text-white/50 mt-1 leading-relaxed">
                        No generic listings. No cold calls. One focused conversation with a Gurgaon real estate advisor who has been in this market since 2006.
                    </p>
                </div>
            )}

            <form className={`flex flex-col ${isSidebar ? "gap-4" : "gap-6"}`}>
                <div className={`flex flex-col ${isSidebar ? "gap-4" : "lg:flex-row gap-6"}`}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        required
                        autoComplete="name"
                        className={inputClass}
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone / WhatsApp Number*"
                        required
                        autoComplete="tel"
                        className={inputClass}
                    />
                </div>

                <input
                    type="text"
                    name="city"
                    placeholder="Current City / Country"
                    className={inputClass}
                />

                <div className={`flex flex-col ${isSidebar ? "gap-4" : "lg:flex-row gap-6"}`}>
                    <CustomSelect
                        name="budget"
                        placeholder="Budget Range"
                        options={BUDGET_OPTIONS}
                        size={isSidebar ? "sm" : "md"}
                    />
                    <CustomSelect
                        name="propertyType"
                        placeholder="Property Type"
                        options={PROPERTY_TYPE_OPTIONS}
                        size={isSidebar ? "sm" : "md"}
                    />
                </div>

                <CustomSelect
                    name="preferredContact"
                    placeholder="Preferred Contact Method"
                    options={CONTACT_METHOD_OPTIONS}
                    size={isSidebar ? "sm" : "md"}
                />

                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        className={`bg-primary text-white rounded-full font-semibold hover:bg-dark duration-300 hover:cursor-pointer flex items-center gap-2 w-fit
                            ${isSidebar ? "py-3.5 px-8 text-sm" : "py-4 px-8 text-base"}`}
                    >
                        Connect with an Advisor — Free
                        <Icon icon="ph:arrow-right" width={isSidebar ? 16 : 18} height={isSidebar ? 16 : 18} />
                    </button>
                    <p className={`text-dark/40 dark:text-white/40 leading-relaxed ${isSidebar ? "text-xs" : "text-sm"}`}>
                        No spam. No cold calls. Your details go only to your assigned Unisel advisor. Response within 2 business hours on working days. WhatsApp preferred for NRI clients.
                    </p>
                </div>
            </form>
        </>
    );
};

export default ContactForm;
