"use client";

import { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import CustomSelect from "@/components/shared/CustomSelect";
import {
    LOCALITIES,
    AGE_MULTIPLIER,
    FLOOR_MULTIPLIER,
    TYPE_MULTIPLIER,
    estimateValue,
    formatCrore,
} from "./localityData";

// ─── Option lists ──────────────────────────────────────────────────────────────

const LOCALITY_OPTIONS = LOCALITIES.map((l) => ({ value: l.value, label: l.label }));

const PROPERTY_TYPE_OPTIONS = Object.keys(TYPE_MULTIPLIER).map((k) => ({
    value: k,
    label: {
        "apartment": "Apartment / Flat",
        "builder-floor": "Builder Floor",
        "independent-house": "Independent House",
        "villa": "Villa / Penthouse",
        "plot": "Residential Plot",
        "commercial": "Commercial Space",
        "sco-plot": "SCO Plot",
    }[k] ?? k,
}));

const AGE_OPTIONS = Object.keys(AGE_MULTIPLIER).map((k) => ({
    value: k,
    label: {
        "new": "Under Construction / New",
        "0-5": "0–5 Years Old",
        "5-10": "5–10 Years Old",
        "10-20": "10–20 Years Old",
        "20+": "20+ Years Old",
    }[k] ?? k,
}));

const FLOOR_OPTIONS = Object.keys(FLOOR_MULTIPLIER).map((k) => ({
    value: k,
    label: {
        "ground": "Ground Floor",
        "low": "Low Floor (1–5)",
        "mid": "Mid Floor (6–15)",
        "high": "High Floor (16–25)",
        "top": "Top Floor / Penthouse",
    }[k] ?? k,
}));

const BHK_OPTIONS = [
    { value: "studio", label: "Studio / 1 RK" },
    { value: "1bhk", label: "1 BHK" },
    { value: "2bhk", label: "2 BHK" },
    { value: "3bhk", label: "3 BHK" },
    { value: "4bhk", label: "4 BHK" },
    { value: "4plus", label: "4+ BHK / Penthouse" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "form" | "lead" | "result";
type Status = "idle" | "loading" | "success" | "error";

type FormData = {
    locality: string;
    propertyType: string;
    area: string;
    bhk: string;
    age: string;
    floor: string;
};

type LeadData = {
    fullName: string;
    phone: string;
    email: string;
};

type ValuationResult = {
    minValue: number;
    maxValue: number;
    rateMin: number;
    rateMax: number;
    zone: string;
    localityLabel: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputBase =
    "w-full bg-transparent text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 border border-dark/10 dark:border-white/10 rounded-full focus-visible:outline-none focus-visible:border-primary hover:border-primary/40 duration-200 px-6 py-3.5 text-base";

// ─── Step 1: Property Details Form ───────────────────────────────────────────

function PropertyForm({ onNext }: { onNext: (data: FormData) => void }) {
    const [locality, setLocality] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [area, setArea] = useState("");
    const [bhk, setBhk] = useState("");
    const [age, setAge] = useState("");
    const [floor, setFloor] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!locality || !propertyType || !area || !age || !floor) {
            setError("Please fill in all required fields.");
            return;
        }
        if (isNaN(Number(area)) || Number(area) <= 0) {
            setError("Please enter a valid area in sq. ft.");
            return;
        }
        setError("");
        onNext({ locality, propertyType, area, bhk, age, floor });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block text-sm font-medium text-dark/60 dark:text-white/60 mb-2 pl-1">
                    Locality / Micromarket *
                </label>
                <CustomSelect
                    name="locality"
                    placeholder="Select locality in Gurgaon"
                    options={LOCALITY_OPTIONS}
                    size="md"
                    onChange={setLocality}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-dark/60 dark:text-white/60 mb-2 pl-1">
                        Property Type *
                    </label>
                    <CustomSelect
                        name="propertyType"
                        placeholder="Select type"
                        options={PROPERTY_TYPE_OPTIONS}
                        size="md"
                        onChange={setPropertyType}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-dark/60 dark:text-white/60 mb-2 pl-1">
                        Configuration
                    </label>
                    <CustomSelect
                        name="bhk"
                        placeholder="Select BHK"
                        options={BHK_OPTIONS}
                        size="md"
                        onChange={setBhk}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-dark/60 dark:text-white/60 mb-2 pl-1">
                    Built-up Area (sq. ft.) *
                </label>
                <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    min={1}
                    className={inputBase}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-dark/60 dark:text-white/60 mb-2 pl-1">
                        Age of Property *
                    </label>
                    <CustomSelect
                        name="age"
                        placeholder="Select age"
                        options={AGE_OPTIONS}
                        size="md"
                        onChange={setAge}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-dark/60 dark:text-white/60 mb-2 pl-1">
                        Floor *
                    </label>
                    <CustomSelect
                        name="floor"
                        placeholder="Select floor"
                        options={FLOOR_OPTIONS}
                        size="md"
                        onChange={setFloor}
                    />
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-500 flex items-center gap-2">
                    <Icon icon="ph:warning-circle" width={16} height={16} />
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="bg-primary text-white rounded-full font-semibold hover:bg-dark duration-300 flex items-center gap-2 w-fit py-4 px-8 text-base"
            >
                Get My Property Value
                <Icon icon="ph:arrow-right" width={18} height={18} />
            </button>

            <p className="text-sm text-dark/40 dark:text-white/40">
                Your valuation estimate will be ready in seconds — no login required.
            </p>
        </form>
    );
}

// ─── Step 2: Lead Capture (gated) ────────────────────────────────────────────

function LeadForm({
    onSuccess,
    formData,
}: {
    onSuccess: (lead: LeadData) => void;
    formData: FormData;
}) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !phone.trim()) {
            setErrorMsg("Name and phone number are required.");
            return;
        }
        setStatus("loading");
        setErrorMsg("");

        try {
            const est = estimateValue(
                formData.locality,
                Number(formData.area),
                formData.propertyType,
                formData.age,
                formData.floor
            );

            const res = await fetch("/api/valuation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName,
                    phone,
                    email,
                    locality: formData.locality,
                    propertyType: formData.propertyType,
                    bhk: formData.bhk,
                    areaSqFt: Number(formData.area),
                    age: formData.age,
                    floor: formData.floor,
                    estimatedMin: est?.minValue ?? null,
                    estimatedMax: est?.maxValue ?? null,
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                setErrorMsg(json.error ?? "Something went wrong.");
                setStatus("error");
            } else {
                onSuccess({ fullName, phone, email });
            }
        } catch {
            setErrorMsg("Network error. Please check your connection and try again.");
            setStatus("error");
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon icon="ph:lock-simple" width={20} height={20} className="text-primary" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-dark dark:text-white mb-1">
                        Your valuation is ready!
                    </p>
                    <p className="text-sm text-dark/60 dark:text-white/60">
                        Enter your details to unlock your property&apos;s estimated market value. We&apos;ll also send you a free expert assessment within 24 hours.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <input
                        type="text"
                        placeholder="Your Full Name *"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        autoComplete="name"
                        className={inputBase}
                    />
                    <input
                        type="tel"
                        placeholder="Phone / WhatsApp Number *"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        autoComplete="tel"
                        className={inputBase}
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={inputBase}
                />

                {status === "error" && (
                    <p className="text-sm text-red-500 flex items-center gap-2">
                        <Icon icon="ph:warning-circle" width={16} height={16} />
                        {errorMsg}
                    </p>
                )}

                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-primary text-white rounded-full font-semibold hover:bg-dark duration-300 flex items-center gap-2 w-fit py-4 px-8 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {status === "loading" ? (
                            <>
                                <Icon icon="ph:circle-notch" width={18} height={18} className="animate-spin" />
                                Unlocking…
                            </>
                        ) : (
                            <>
                                Unlock My Valuation
                                <Icon icon="ph:arrow-right" width={18} height={18} />
                            </>
                        )}
                    </button>
                    <p className="text-sm text-dark/40 dark:text-white/40">
                        No spam. Your details go only to your assigned Unisel advisor.
                    </p>
                </div>
            </form>
        </div>
    );
}

// ─── Step 3: Result ───────────────────────────────────────────────────────────

function ValuationResult({
    result,
    formData,
    leadData,
    onReset,
}: {
    result: ValuationResult;
    formData: FormData;
    leadData: LeadData;
    onReset: () => void;
}) {
    const bhkLabel = BHK_OPTIONS.find((b) => b.value === formData.bhk)?.label ?? "";
    const typeLabel = PROPERTY_TYPE_OPTIONS.find((t) => t.value === formData.propertyType)?.label ?? "";

    return (
        <div className="flex flex-col gap-8">
            {/* Valuation Card */}
            <div className="border border-primary/20 rounded-2xl overflow-hidden">
                <div className="bg-primary/5 px-6 py-5 border-b border-primary/10">
                    <div className="flex items-center gap-2 mb-1">
                        <Icon icon="ph:check-circle-fill" width={20} height={20} className="text-primary" />
                        <p className="text-sm font-semibold text-primary">Estimated Market Value</p>
                    </div>
                    <p className="text-dark/60 dark:text-white/60 text-sm">
                        {result.localityLabel} · {bhkLabel || typeLabel} · {formData.area} sq. ft.
                    </p>
                </div>

                <div className="px-6 py-8 flex flex-col gap-6">
                    <div className="text-center">
                        <p className="text-sm text-dark/50 dark:text-white/50 mb-2">Current Market Value Range</p>
                        <p className="text-4xl sm:text-5xl font-semibold tracking-tight text-dark dark:text-white">
                            {formatCrore(result.minValue)}
                            <span className="text-dark/30 dark:text-white/30 mx-3">–</span>
                            {formatCrore(result.maxValue)}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 text-center">
                            <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Price Range / sq. ft.</p>
                            <p className="text-sm font-semibold text-dark dark:text-white">
                                ₹{result.rateMin.toLocaleString("en-IN")} – ₹{result.rateMax.toLocaleString("en-IN")}
                            </p>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 text-center">
                            <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Zone</p>
                            <p className="text-sm font-semibold text-dark dark:text-white">{result.zone}</p>
                        </div>
                        <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
                            <p className="text-xs text-dark/50 dark:text-white/50 mb-1">Built-up Area</p>
                            <p className="text-sm font-semibold text-dark dark:text-white">{Number(formData.area).toLocaleString("en-IN")} sq. ft.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Advisor CTA */}
            <div className="bg-dark dark:bg-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="flex-1">
                    <p className="text-white dark:text-white font-semibold mb-1">
                        Hi {leadData.fullName.split(" ")[0]}, want a precise valuation?
                    </p>
                    <p className="text-white/60 text-sm">
                        Our Gurgaon expert will call you with an exact market analysis — including recent comparable transactions in {result.localityLabel}.
                    </p>
                </div>
                <a
                    href="tel:+918010303303"
                    className="flex-shrink-0 bg-primary text-white rounded-full font-semibold hover:bg-white hover:text-dark duration-300 flex items-center gap-2 py-3.5 px-7 text-sm"
                >
                    <Icon icon="ph:phone" width={16} height={16} />
                    Call Us Now
                </a>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-dark/40 dark:text-white/40 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                <strong>Disclaimer:</strong> This is an indicative estimate based on approximate current market rates in Gurgaon (as of early 2026). Actual property values may vary based on exact location, society, condition, negotiation, and market conditions. This does not constitute a formal valuation. Contact us for a free, expert-verified assessment.
            </p>

            <button
                onClick={onReset}
                className="text-sm text-primary underline underline-offset-2 hover:text-dark dark:hover:text-white duration-200 w-fit"
            >
                Value another property
            </button>
        </div>
    );
}

// ─── Main Orchestrator ────────────────────────────────────────────────────────

export default function ValuationTool() {
    const [step, setStep] = useState<Step>("form");
    const [formData, setFormData] = useState<FormData | null>(null);
    const [leadData, setLeadData] = useState<LeadData | null>(null);
    const [result, setResult] = useState<ValuationResult | null>(null);
    const topRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleFormNext = (data: FormData) => {
        setFormData(data);
        setStep("lead");
        scrollToTop();
    };

    const handleLeadSuccess = (lead: LeadData) => {
        if (!formData) return;
        const est = estimateValue(
            formData.locality,
            Number(formData.area),
            formData.propertyType,
            formData.age,
            formData.floor
        );
        if (!est) return;
        setLeadData(lead);
        setResult(est);
        setStep("result");
        scrollToTop();
    };

    const handleReset = () => {
        setStep("form");
        setFormData(null);
        setLeadData(null);
        setResult(null);
        scrollToTop();
    };

    const steps = [
        { key: "form", label: "Property Details" },
        { key: "lead", label: "Unlock Valuation" },
        { key: "result", label: "Your Estimate" },
    ] as const;

    const currentIndex = steps.findIndex((s) => s.key === step);

    return (
        <div ref={topRef} className="border border-black/10 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-white/10">
            {/* Step indicator */}
            <div className="border-b border-black/10 dark:border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                    {steps.map((s, i) => (
                        <div key={s.key} className="flex items-center gap-2">
                            <div className={`flex items-center gap-2 ${i <= currentIndex ? "text-primary" : "text-dark/30 dark:text-white/30"}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold border ${i < currentIndex
                                    ? "bg-primary border-primary text-white"
                                    : i === currentIndex
                                        ? "border-primary text-primary"
                                        : "border-dark/20 dark:border-white/20 text-dark/30 dark:text-white/30"
                                    }`}>
                                    {i < currentIndex ? (
                                        <Icon icon="ph:check-bold" width={12} height={12} />
                                    ) : (
                                        i + 1
                                    )}
                                </div>
                                <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`h-px w-8 sm:w-12 ${i < currentIndex ? "bg-primary" : "bg-dark/10 dark:bg-white/10"}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-10">
                {step === "form" && <PropertyForm onNext={handleFormNext} />}
                {step === "lead" && formData && (
                    <LeadForm onSuccess={handleLeadSuccess} formData={formData} />
                )}
                {step === "result" && result && formData && leadData && (
                    <ValuationResult
                        result={result}
                        formData={formData}
                        leadData={leadData}
                        onReset={handleReset}
                    />
                )}
            </div>
        </div>
    );
}
