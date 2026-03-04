"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import PropertyCard from "@/components/Home/Properties/Card/Card";
import type { PropertyHomes } from "@/types/properyHomes";

type SortOption = "price-asc" | "price-desc" | "area-asc" | "area-desc" | "name-asc" | "";

interface FilterState {
  search: string;
  sort: SortOption;
  beds: string;
  minPrice: string;
  maxPrice: string;
  status: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "", label: "Sort by" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "area-asc", label: "Area: Low → High" },
  { value: "area-desc", label: "Area: High → Low" },
  { value: "name-asc", label: "Name: A → Z" },
];

const BED_OPTIONS = ["1", "2", "3", "4+"];

const STATUS_LABELS: Record<string, string> = {
  "new-launch": "New Launch",
  "ready-to-move": "Ready to Move",
  "pre-leased": "Pre-Leased",
};

interface Props {
  properties: PropertyHomes[];
}

export default function PropertyListingClient({ properties }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get("search") ?? "",
    sort: (searchParams.get("sort") as SortOption) ?? "",
    beds: searchParams.get("beds") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    status: searchParams.get("status") ?? "",
  });
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Conditional filter visibility
  const showBeds = useMemo(() => properties.some((p) => p.beds > 0), [properties]);
  const allStatuses = useMemo(
    () => [...new Set(properties.map((p) => p.status).filter(Boolean))] as string[],
    [properties]
  );
  const showStatus = allStatuses.length > 1;

  const activeFilterCount = [
    filters.search,
    filters.beds,
    filters.minPrice,
    filters.maxPrice,
    filters.status,
    filters.sort,
  ].filter(Boolean).length;

  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      if (newFilters.search) params.set("search", newFilters.search);
      if (newFilters.sort) params.set("sort", newFilters.sort);
      if (newFilters.beds) params.set("beds", newFilters.beds);
      if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice);
      if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice);
      if (newFilters.status) params.set("status", newFilters.status);
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [pathname, router]
  );

  const setFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      const updated = { ...filters, [key]: value };
      setFilters(updated);
      updateURL(updated);
    },
    [filters, updateURL]
  );

  const clearAll = useCallback(() => {
    const empty: FilterState = { search: "", sort: "", beds: "", minPrice: "", maxPrice: "", status: "" };
    setFilters(empty);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const displayed = useMemo(() => {
    let result = [...properties];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.location ?? "").toLowerCase().includes(q)
      );
    }

    if (filters.beds === "4+") {
      result = result.filter((p) => p.beds >= 4);
    } else if (filters.beds) {
      result = result.filter((p) => p.beds === Number(filters.beds));
    }

    if (filters.minPrice) {
      result = result.filter((p) => Number(p.rate) >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => Number(p.rate) <= Number(filters.maxPrice));
    }

    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => Number(a.rate) - Number(b.rate));
        break;
      case "price-desc":
        result.sort((a, b) => Number(b.rate) - Number(a.rate));
        break;
      case "area-asc":
        result.sort((a, b) => a.area - b.area);
        break;
      case "area-desc":
        result.sort((a, b) => b.area - a.area);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [properties, filters]);

  return (
    <section className="pt-0!">
      <div className="container max-w-8xl mx-auto px-5 2xl:px-0">

        {/* Filter Bar */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Icon
                icon="ph:magnifying-glass"
                width={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40 dark:text-white/40 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={filters.search}
                onChange={(e) => setFilter("search", e.target.value)}
                className="w-full rounded-full py-3 pl-11 pr-5 border border-dark/10 dark:border-white/10 bg-white dark:bg-dark text-dark dark:text-white placeholder:text-dark/40 dark:placeholder:text-white/40 focus-visible:outline-none focus-visible:border-primary text-sm"
              />
              {filters.search && (
                <button
                  onClick={() => setFilter("search", "")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 dark:text-white/40 hover:text-dark dark:hover:text-white"
                >
                  <Icon icon="ph:x" width={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2 shrink-0">
              {/* Sort */}
              <div className="relative">
                <select
                  value={filters.sort}
                  onChange={(e) => setFilter("sort", e.target.value)}
                  className="appearance-none rounded-full py-3 pl-4 pr-9 border border-dark/10 dark:border-white/10 bg-white dark:bg-dark text-dark dark:text-white text-sm focus-visible:outline-none focus-visible:border-primary cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Icon
                  icon="ph:caret-down"
                  width={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dark/40 dark:text-white/40"
                />
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className={`relative flex items-center gap-2 rounded-full py-3 px-5 border text-sm font-medium transition-colors duration-200 ${
                  filtersOpen || activeFilterCount > 0
                    ? "border-primary bg-primary/5 text-primary dark:bg-primary/10"
                    : "border-dark/10 dark:border-white/10 bg-white dark:bg-dark text-dark dark:text-white hover:border-primary hover:text-primary"
                }`}
              >
                <Icon icon="ph:sliders-horizontal" width={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-xs font-semibold leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Clear all */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1.5 rounded-full py-3 px-4 text-sm text-dark/60 dark:text-white/60 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                >
                  <Icon icon="ph:x" width={13} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Expandable Filter Panel */}
          {filtersOpen && (
            <div className="rounded-2xl border border-dark/10 dark:border-white/10 bg-white dark:bg-dark p-5 flex flex-col sm:flex-row flex-wrap gap-6">
              {/* Beds */}
              {showBeds && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-dark/50 dark:text-white/50 uppercase tracking-wide">Bedrooms</p>
                  <div className="flex gap-2 flex-wrap">
                    {BED_OPTIONS.map((b) => (
                      <button
                        key={b}
                        onClick={() => setFilter("beds", filters.beds === b ? "" : b)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                          filters.beds === b
                            ? "bg-primary border-primary text-white"
                            : "border-dark/10 dark:border-white/10 text-dark dark:text-white hover:border-primary hover:text-primary"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range */}
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-dark/50 dark:text-white/50 uppercase tracking-wide">Price Range</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilter("minPrice", e.target.value)}
                    className="w-28 rounded-full py-1.5 px-4 border border-dark/10 dark:border-white/10 bg-transparent text-dark dark:text-white placeholder:text-dark/30 dark:placeholder:text-white/30 text-sm focus-visible:outline-none focus-visible:border-primary"
                  />
                  <span className="text-dark/30 dark:text-white/30 text-sm">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilter("maxPrice", e.target.value)}
                    className="w-28 rounded-full py-1.5 px-4 border border-dark/10 dark:border-white/10 bg-transparent text-dark dark:text-white placeholder:text-dark/30 dark:placeholder:text-white/30 text-sm focus-visible:outline-none focus-visible:border-primary"
                  />
                </div>
              </div>

              {/* Status */}
              {showStatus && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-semibold text-dark/50 dark:text-white/50 uppercase tracking-wide">Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {allStatuses.map((s) => (
                      <button
                        key={s}
                        onClick={() => setFilter("status", filters.status === s ? "" : s)}
                        className={`px-4 py-1.5 rounded-full text-sm border transition-colors duration-200 ${
                          filters.status === s
                            ? "bg-primary border-primary text-white"
                            : "border-dark/10 dark:border-white/10 text-dark dark:text-white hover:border-primary hover:text-primary"
                        }`}
                      >
                        {STATUS_LABELS[s] ?? s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Result Count */}
        <p className="text-sm text-dark/50 dark:text-white/50 mb-6">
          Showing <span className="font-medium text-dark dark:text-white">{displayed.length}</span> of{" "}
          <span className="font-medium text-dark dark:text-white">{properties.length}</span>{" "}
          {properties.length === 1 ? "property" : "properties"}
        </p>

        {/* Grid */}
        {displayed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {displayed.map((item) => (
              <PropertyCard key={item._id} item={item} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Icon icon="ph:house-line" width={48} className="text-dark/20 dark:text-white/20" />
            <h3 className="text-xl font-medium text-dark dark:text-white">No properties found</h3>
            <p className="text-dark/50 dark:text-white/50 text-sm max-w-xs">
              No properties match your current filters. Try adjusting your search or clear all filters.
            </p>
            <button
              onClick={clearAll}
              className="mt-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
