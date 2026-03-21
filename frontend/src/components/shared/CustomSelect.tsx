"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

export type SelectOption = { value: string; label: string };

type CustomSelectProps = {
    name: string;
    placeholder: string;
    options: SelectOption[];
    size?: "md" | "sm";
    onChange?: (value: string) => void;
};

const CustomSelect = ({ name, placeholder, options, size = "md", onChange }: CustomSelectProps) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<SelectOption | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const triggerClass =
        size === "sm"
            ? "w-full px-5 py-3 text-sm border border-dark/10 dark:border-white/10 rounded-full bg-transparent flex items-center justify-between gap-2 hover:border-primary/40 duration-200 focus-visible:outline-none"
            : "w-full px-6 py-3.5 text-base border border-dark/10 dark:border-white/10 rounded-full bg-transparent flex items-center justify-between gap-2 hover:border-primary/40 duration-200 focus-visible:outline-none";

    return (
        <div ref={ref} className="relative w-full">
            <input type="hidden" name={name} value={selected?.value ?? ""} />
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={triggerClass}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={selected ? "text-dark dark:text-white" : "text-dark/40 dark:text-white/40"}>
                    {selected?.label ?? placeholder}
                </span>
                <Icon
                    icon="ph:caret-down"
                    width={16}
                    height={16}
                    className={`flex-shrink-0 text-dark/40 dark:text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-dark border border-dark/10 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-white/10 z-50 overflow-y-auto max-h-60 py-1.5"
                >
                    {options.map((opt) => {
                        const isActive = selected?.value === opt.value;
                        return (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={isActive}
                                onClick={() => { setSelected(opt); setOpen(false); onChange?.(opt.value); }}
                                className={`px-5 py-2.5 text-sm cursor-pointer flex items-center justify-between gap-2 duration-150
                                    ${isActive
                                        ? "text-primary bg-primary/5 font-semibold"
                                        : "text-dark dark:text-white hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {opt.label}
                                {isActive && (
                                    <Icon icon="ph:check" width={14} height={14} className="text-primary flex-shrink-0" />
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
