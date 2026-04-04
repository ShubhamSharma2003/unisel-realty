"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";
import type { PropertyHomes } from "@/types/properyHomes";
import "leaflet/dist/leaflet.css";

const STATUS_LABELS: Record<string, string> = {
  "new-launch": "New Launch",
  "ready-to-move": "Ready to Move",
  "under-construction": "Under Construction",
  "near-possession": "Near Possession",
  "pre-leased": "Pre-Leased",
};

// Default coordinates for each micromarket in Gurgaon
const MICROMARKET_COORDS: Record<string, [number, number]> = {
  "golf-course-road": [28.4595, 77.0935], // Excellent (Sector 43 area)
  "golf-course-extension-road": [28.4137, 77.0786], // Better "Center" (Sector 65 area)
  "dwarka-expressway": [28.4925, 77.0265], // Excellent (Sector 102 area)
  "gwal-pahari": [28.3950, 77.0750], // Gwal Pahari area
  "sohna-road": [28.3900, 77.0500], // Sohna Road (Sector 48-57 area)
  "new-gurgaon": [28.4200, 77.0400], // New Gurgaon (Sectors 73-95)
};

const GURGAON_CENTER: [number, number] = [28.4595, 77.0266];

function getPropertyCoords(
  property: PropertyHomes
): [number, number] | null {
  if (property.latitude && property.longitude) {
    return [property.latitude, property.longitude];
  }
  if (property.micromarket && MICROMARKET_COORDS[property.micromarket]) {
    // Add slight random offset so pins don't stack exactly
    const base = MICROMARKET_COORDS[property.micromarket];
    const offset = () => (Math.random() - 0.5) * 0.005;
    return [base[0] + offset(), base[1] + offset()];
  }
  return null;
}

// Custom marker icon
const createMarkerIcon = (isActive: boolean) =>
  L.divIcon({
    className: "custom-map-marker",
    html: `<div style="
      width: ${isActive ? "40px" : "32px"};
      height: ${isActive ? "40px" : "32px"};
      background: ${isActive ? "#e11d48" : "#6d28d9"};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 4.57 2.7L3 21" fill="none" stroke="white" stroke-width="2"/>
        <path d="M12 7v4l3 2" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>`,
    iconSize: [isActive ? 40 : 32, isActive ? 40 : 32],
    iconAnchor: [isActive ? 20 : 16, isActive ? 20 : 16],
    popupAnchor: [0, isActive ? -24 : -20],
  });

const defaultIcon = createMarkerIcon(false);
const activeIcon = createMarkerIcon(true);

// Auto-fit map bounds to show all filtered properties
function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length === 0) return;
    if (coords.length === 1) {
      map.flyTo(coords[0], 14, { duration: 1.2 });
    } else {
      const bounds = L.latLngBounds(coords);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

// Component to fly to a selected property
function FlyToProperty({ coords }: { coords: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 14, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

type MapProperty = PropertyHomes & { coords: [number, number] };

export default function MapClient({
  properties,
}: {
  properties: PropertyHomes[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Compute properties with coordinates
  const mappedProperties = useMemo(() => {
    const result: MapProperty[] = [];
    for (const p of properties) {
      const coords = getPropertyCoords(p);
      if (coords) result.push({ ...p, coords });
    }
    return result;
  }, [properties]);

  const filtered = useMemo(() => {
    let result = mappedProperties;
    if (filter !== "all") {
      result = result.filter((p) => p.micromarket === filter);
    }
    return result;
  }, [mappedProperties, filter]);

  const selectedProperty = filtered.find((p) => p._id === selectedId) ?? null;

  const micromarkets = useMemo(() => {
    const set = new Set<string>();
    for (const p of mappedProperties) {
      if (p.micromarket) set.add(p.micromarket);
    }
    return Array.from(set);
  }, [mappedProperties]);


  const formatMicromarket = (m: string) =>
    m.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (mappedProperties.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Filter dropdown - Mobile only */}
      <div className="flex justify-center lg:hidden">
        <div className="relative w-full max-w-xs" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white border border-gray-300 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="text-sm font-medium">
              {filter === "all" ? "All Locations" : formatMicromarket(filter)}
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-white/20 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  setFilter("all");
                  setSelectedId(null);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors first:rounded-t-lg cursor-pointer"
              >
                All Locations
              </button>
              {micromarkets.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setFilter(m);
                    setSelectedId(null);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {formatMicromarket(m)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter tabs - Desktop only */}
      <div className="hidden lg:flex justify-center gap-2 flex-wrap">
        <button
          onClick={() => {
            setFilter("all");
            setSelectedId(null);
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            filter === "all"
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
          }`}
        >
          All Locations
        </button>
        {micromarkets.map((m) => (
          <button
            key={m}
            onClick={() => {
              setFilter(m);
              setSelectedId(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              filter === m
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20"
            }`}
          >
            {formatMicromarket(m)}
          </button>
        ))}
      </div>

      {/* Map + sidebar layout */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-dark/10 dark:border-white/10 relative z-0 aspect-square lg:aspect-auto">
          <MapContainer
            center={GURGAON_CENTER}
            zoom={12}
            scrollWheelZoom={false}
            style={{ height: "100%", minHeight: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {selectedId ? (
              <FlyToProperty coords={selectedProperty?.coords ?? null} />
            ) : (
              <FitBounds coords={filtered.map((p) => p.coords)} />
            )}
            {filtered.map((p) => (
              <Marker
                key={p._id}
                position={p.coords}
                icon={p._id === selectedId ? activeIcon : defaultIcon}
                eventHandlers={{
                  click: () => setSelectedId(p._id),
                }}
              >
                <Popup>
                  <div className="min-w-[200px]">
                    <p className="font-semibold text-sm mb-1">{p.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{p.location}</p>
                    {p.rate && (
                      <p className="text-xs font-medium text-primary mb-2">
                        {p.rate}
                      </p>
                    )}
                    <Link
                      href={`/properties/${p.slug}`}
                      className="text-xs text-primary underline"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Property list sidebar - Horizontal scroll on mobile, vertical on lg+ */}
        <div className="flex flex-row gap-3 overflow-x-auto pb-3 lg:pb-0 lg:flex-col lg:w-[380px] lg:max-h-[500px] lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1 lg:gap-3">
          {/* Mobile scroll hint */}
          <div className="lg:hidden flex-shrink-0 w-1 flex-grow-0" />

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No properties found in this area.
            </p>
          )}
          {filtered.map((p) => {
            const mainImageSource = p.images?.[0];
            const mainImage = mainImageSource
              ? typeof mainImageSource === "object" && "src" in mainImageSource
                ? mainImageSource.src
                : typeof mainImageSource === "object" && "asset" in mainImageSource
                  ? urlFor(mainImageSource).width(200).height(140).fit("crop").url()
                  : null
              : null;

            return (
              <button
                key={p._id}
                onClick={() => setSelectedId(p._id)}
                className={`flex gap-3 p-3 rounded-xl border text-left transition-all flex-shrink-0 lg:flex-shrink w-[280px] lg:w-auto ${
                  selectedId === p._id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-dark/10 dark:border-white/10 hover:border-primary/50"
                }`}
              >
                {mainImage && (
                  <Image
                    src={mainImage}
                    alt={p.name}
                    width={100}
                    height={70}
                    className="rounded-lg object-cover w-[100px] h-[70px] flex-shrink-0"
                  />
                )}
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="text-sm font-semibold text-black dark:text-white truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-black/50 dark:text-white/50 truncate">
                    {p.location}
                  </p>
                  {p.rate && (
                    <p className="text-xs font-medium text-primary mt-1">
                      {p.rate}
                    </p>
                  )}
                  {p.configuration && (
                    <p className="text-xs text-black/40 dark:text-white/40">
                      {p.configuration} &middot; {p.area}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
