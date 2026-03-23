"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const json = await res.json();

            if (!res.ok) {
                setStatus("error");
            } else if (json.alreadySubscribed) {
                setStatus("duplicate");
            } else {
                setStatus("success");
                setEmail("");
            }
        } catch {
            setStatus("error");
        }
    };

    const isSuccess = status === "success" || status === "duplicate";
    const isError = status === "error";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 lg:order-1 order-2 w-full lg:w-auto">
            <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => { if (isSuccess || isError) setStatus("idle"); }}
                required
                disabled={status === "loading"}
                className="w-full sm:w-auto rounded-full py-4 px-6 bg-white/10 placeholder:text-white text-white focus-visible:outline-0 disabled:opacity-40 transition-opacity duration-300"
            />
            <button
                type={isSuccess ? "button" : "submit"}
                onClick={isSuccess ? () => { setStatus("idle"); setEmail(""); } : undefined}
                className={`relative overflow-hidden py-4 px-8 font-semibold rounded-full w-full sm:w-auto transition-all duration-500 flex items-center justify-center gap-2
                    ${isSuccess
                        ? "bg-primary text-white cursor-pointer"
                        : isError
                        ? "bg-red-500 text-white cursor-pointer"
                        : "text-dark bg-white hover:bg-primary hover:text-white cursor-pointer"
                    }`}
            >
                {status === "loading" && (
                    <Icon icon="ph:circle-notch" width={18} className="animate-spin" />
                )}
                {status === "success" && (
                    <Icon icon="ph:check-circle-fill" width={18} className="animate-[scale-in_0.3s_ease-out]" />
                )}
                {status === "duplicate" && (
                    <Icon icon="ph:envelope-open-fill" width={18} />
                )}
                {isError && (
                    <Icon icon="ph:warning-circle-fill" width={18} />
                )}
                <span>
                    {status === "loading" && "Subscribing…"}
                    {status === "success" && "Subscribed!"}
                    {status === "duplicate" && "Already subscribed"}
                    {status === "error" && "Try again"}
                    {status === "idle" && "Subscribe"}
                </span>
            </button>
        </form>
    );
}
