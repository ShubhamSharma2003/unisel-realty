export type Locality = {
    label: string;
    value: string;
    minRate: number; // ₹ per sq. ft.
    maxRate: number;
    zone: string;
};

// All rates in ₹ per sq. ft. (Current market approximations as of March 2026)
export const LOCALITIES: Locality[] = [
    // Premium / Golf Course Belt (Massive appreciation zone)
    { label: "Golf Course Road", value: "golf-course-road", minRate: 25000, maxRate: 38000, zone: "Premium" },
    { label: "Golf Course Extension Road", value: "golf-course-ext-road", minRate: 15000, maxRate: 24000, zone: "Premium" },
    { label: "DLF Phase 1", value: "dlf-phase-1", minRate: 18000, maxRate: 30000, zone: "Premium" },
    { label: "DLF Phase 2", value: "dlf-phase-2", minRate: 18000, maxRate: 28000, zone: "Premium" },
    { label: "DLF Phase 3", value: "dlf-phase-3", minRate: 16000, maxRate: 24000, zone: "Premium" },
    { label: "DLF Phase 4", value: "dlf-phase-4", minRate: 18000, maxRate: 28000, zone: "Premium" },
    { label: "DLF Phase 5", value: "dlf-phase-5", minRate: 25000, maxRate: 40000, zone: "Premium" },
    { label: "Sushant Lok 1", value: "sushant-lok-1", minRate: 14000, maxRate: 22000, zone: "Premium" },
    { label: "Sushant Lok 2", value: "sushant-lok-2", minRate: 12000, maxRate: 18000, zone: "Premium" },
    { label: "Sushant Lok 3", value: "sushant-lok-3", minRate: 11000, maxRate: 16000, zone: "Premium" },

    // South Gurgaon / Sohna Road
    { label: "Sector 48", value: "sector-48", minRate: 11000, maxRate: 16000, zone: "South Gurgaon" },
    { label: "Sector 49", value: "sector-49", minRate: 11000, maxRate: 16000, zone: "South Gurgaon" },
    { label: "Sector 50", value: "sector-50", minRate: 12000, maxRate: 17500, zone: "South Gurgaon" },
    { label: "Sector 51", value: "sector-51", minRate: 11000, maxRate: 15500, zone: "South Gurgaon" },
    { label: "Sector 52", value: "sector-52", minRate: 11000, maxRate: 15500, zone: "South Gurgaon" },
    { label: "Sector 53", value: "sector-53", minRate: 20000, maxRate: 32000, zone: "Premium" }, // Upgraded due to GCR proximity
    { label: "Sector 54", value: "sector-54", minRate: 22000, maxRate: 38000, zone: "Premium" }, // Upgraded due to GCR proximity
    { label: "Sector 55", value: "sector-55", minRate: 12000, maxRate: 18000, zone: "South Gurgaon" },
    { label: "Sector 56", value: "sector-56", minRate: 12000, maxRate: 18000, zone: "South Gurgaon" },
    { label: "Sector 57", value: "sector-57", minRate: 11000, maxRate: 16000, zone: "South Gurgaon" },

    // Mid Gurgaon / Extension Belt — Sector 58–72
    { label: "Sector 58", value: "sector-58", minRate: 18000, maxRate: 25000, zone: "Mid Gurgaon" },
    { label: "Sector 59", value: "sector-59", minRate: 18000, maxRate: 25000, zone: "Mid Gurgaon" },
    { label: "Sector 60", value: "sector-60", minRate: 16000, maxRate: 23000, zone: "Mid Gurgaon" },
    { label: "Sector 61", value: "sector-61", minRate: 15000, maxRate: 21000, zone: "Mid Gurgaon" },
    { label: "Sector 62", value: "sector-62", minRate: 15000, maxRate: 22000, zone: "Mid Gurgaon" },
    { label: "Sector 63", value: "sector-63", minRate: 14000, maxRate: 20000, zone: "Mid Gurgaon" },
    { label: "Sector 63A", value: "sector-63a", minRate: 13000, maxRate: 19000, zone: "Mid Gurgaon" },
    { label: "Sector 64", value: "sector-64", minRate: 13000, maxRate: 18000, zone: "Mid Gurgaon" },
    { label: "Sector 65", value: "sector-65", minRate: 18000, maxRate: 26000, zone: "Mid Gurgaon" }, // Premium township heavy
    { label: "Sector 66", value: "sector-66", minRate: 18000, maxRate: 26000, zone: "Mid Gurgaon" }, // Trump Tower/M3M heavy
    { label: "Sector 67", value: "sector-67", minRate: 13000, maxRate: 18000, zone: "Mid Gurgaon" },
    { label: "Sector 68", value: "sector-68", minRate: 12000, maxRate: 17000, zone: "Mid Gurgaon" },
    { label: "Sector 69", value: "sector-69", minRate: 12000, maxRate: 17000, zone: "Mid Gurgaon" },
    { label: "Sector 70", value: "sector-70", minRate: 12000, maxRate: 17000, zone: "Mid Gurgaon" },
    { label: "Sector 70A", value: "sector-70a", minRate: 11000, maxRate: 16000, zone: "Mid Gurgaon" },
    { label: "Sector 71", value: "sector-71", minRate: 11000, maxRate: 16000, zone: "Mid Gurgaon" },
    { label: "Sector 72", value: "sector-72", minRate: 11000, maxRate: 16000, zone: "Mid Gurgaon" },
    { label: "Sector 72A", value: "sector-72a", minRate: 11000, maxRate: 16000, zone: "Mid Gurgaon" },

    // New Gurgaon (Sectors 73-95)
    { label: "Sector 73", value: "sector-73", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 74", value: "sector-74", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 75", value: "sector-75", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 76", value: "sector-76", minRate: 9000, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 77", value: "sector-77", minRate: 9000, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 78", value: "sector-78", minRate: 9000, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 79", value: "sector-79", minRate: 9500, maxRate: 13500, zone: "New Gurgaon" },
    { label: "Sector 79A", value: "sector-79a", minRate: 9500, maxRate: 13500, zone: "New Gurgaon" },
    { label: "Sector 80", value: "sector-80", minRate: 9500, maxRate: 13500, zone: "New Gurgaon" },
    { label: "Sector 81", value: "sector-81", minRate: 9500, maxRate: 13500, zone: "New Gurgaon" },
    { label: "Sector 82", value: "sector-82", minRate: 10000, maxRate: 14500, zone: "New Gurgaon" },
    { label: "Sector 82A", value: "sector-82a", minRate: 10000, maxRate: 14500, zone: "New Gurgaon" },
    { label: "Sector 83", value: "sector-83", minRate: 10000, maxRate: 14000, zone: "New Gurgaon" },
    { label: "Sector 84", value: "sector-84", minRate: 9500, maxRate: 13500, zone: "New Gurgaon" },
    { label: "Sector 85", value: "sector-85", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 86", value: "sector-86", minRate: 9000, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 87", value: "sector-87", minRate: 8500, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 88", value: "sector-88", minRate: 8500, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 88A", value: "sector-88a", minRate: 8500, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 88B", value: "sector-88b", minRate: 8500, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 89", value: "sector-89", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 89A", value: "sector-89a", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 89B", value: "sector-89b", minRate: 9000, maxRate: 13000, zone: "New Gurgaon" },
    { label: "Sector 90", value: "sector-90", minRate: 8500, maxRate: 12500, zone: "New Gurgaon" },
    { label: "Sector 91", value: "sector-91", minRate: 8000, maxRate: 11500, zone: "New Gurgaon" },
    { label: "Sector 92", value: "sector-92", minRate: 8000, maxRate: 11500, zone: "New Gurgaon" },
    { label: "Sector 93", value: "sector-93", minRate: 8000, maxRate: 11500, zone: "New Gurgaon" },
    { label: "Sector 95", value: "sector-95", minRate: 8000, maxRate: 11500, zone: "New Gurgaon" },
    { label: "Sector 95A", value: "sector-95a", minRate: 8000, maxRate: 11500, zone: "New Gurgaon" },
    { label: "Sector 95B", value: "sector-95b", minRate: 8000, maxRate: 11500, zone: "New Gurgaon" },

    // Dwarka Expressway Zone (Sectors 96-114) -> Huge appreciation zone
    { label: "Sector 96", value: "sector-96", minRate: 9000, maxRate: 13000, zone: "Dwarka Expressway" },
    { label: "Sector 97", value: "sector-97", minRate: 9000, maxRate: 13000, zone: "Dwarka Expressway" },
    { label: "Sector 99", value: "sector-99", minRate: 10000, maxRate: 14500, zone: "Dwarka Expressway" },
    { label: "Sector 99A", value: "sector-99a", minRate: 9500, maxRate: 13500, zone: "Dwarka Expressway" },
    { label: "Sector 100", value: "sector-100", minRate: 10000, maxRate: 14500, zone: "Dwarka Expressway" },
    { label: "Sector 101", value: "sector-101", minRate: 10000, maxRate: 14500, zone: "Dwarka Expressway" },
    { label: "Sector 102", value: "sector-102", minRate: 11000, maxRate: 16000, zone: "Dwarka Expressway" },
    { label: "Sector 103", value: "sector-103", minRate: 12000, maxRate: 18000, zone: "Dwarka Expressway" },
    { label: "Sector 104", value: "sector-104", minRate: 12000, maxRate: 18000, zone: "Dwarka Expressway" },
    { label: "Sector 105", value: "sector-105", minRate: 11000, maxRate: 16000, zone: "Dwarka Expressway" },
    { label: "Sector 106", value: "sector-106", minRate: 12000, maxRate: 17500, zone: "Dwarka Expressway" },
    { label: "Sector 107", value: "sector-107", minRate: 10000, maxRate: 15000, zone: "Dwarka Expressway" },
    { label: "Sector 108", value: "sector-108", minRate: 11000, maxRate: 16500, zone: "Dwarka Expressway" },
    { label: "Sector 109", value: "sector-109", minRate: 10000, maxRate: 15500, zone: "Dwarka Expressway" },
    { label: "Sector 110", value: "sector-110", minRate: 10000, maxRate: 15500, zone: "Dwarka Expressway" },
    { label: "Sector 110A", value: "sector-110a", minRate: 10000, maxRate: 15000, zone: "Dwarka Expressway" },
    { label: "Sector 111", value: "sector-111", minRate: 13000, maxRate: 19000, zone: "Dwarka Expressway" },
    { label: "Sector 112", value: "sector-112", minRate: 12000, maxRate: 18000, zone: "Dwarka Expressway" },
    { label: "Sector 113", value: "sector-113", minRate: 13000, maxRate: 20000, zone: "Dwarka Expressway" }, // Very premium projects here
    { label: "Sector 114", value: "sector-114", minRate: 15000, maxRate: 25000, zone: "Dwarka Expressway" }, // Primarily high-ticket commercial/SCO

    // Old Gurgaon / City
    { label: "Sector 4", value: "sector-4", minRate: 8500, maxRate: 12500, zone: "Old Gurgaon" },
    { label: "Sector 5", value: "sector-5", minRate: 8500, maxRate: 12000, zone: "Old Gurgaon" },
    { label: "Sector 7", value: "sector-7", minRate: 8000, maxRate: 11500, zone: "Old Gurgaon" },
    { label: "Sector 9", value: "sector-9", minRate: 8500, maxRate: 12000, zone: "Old Gurgaon" },
    { label: "Sector 10", value: "sector-10", minRate: 8000, maxRate: 11500, zone: "Old Gurgaon" },
    { label: "Sector 14", value: "sector-14", minRate: 11000, maxRate: 16000, zone: "Old Gurgaon" },
    { label: "Sector 15", value: "sector-15", minRate: 10500, maxRate: 15500, zone: "Old Gurgaon" },
    { label: "Sector 17", value: "sector-17", minRate: 10000, maxRate: 15000, zone: "Old Gurgaon" },
    { label: "Sector 21", value: "sector-21", minRate: 10000, maxRate: 15000, zone: "Old Gurgaon" },
    { label: "Sector 22", value: "sector-22", minRate: 10000, maxRate: 15000, zone: "Old Gurgaon" },
    { label: "Sector 23", value: "sector-23", minRate: 10500, maxRate: 15500, zone: "Old Gurgaon" },
    { label: "Sector 31", value: "sector-31", minRate: 12000, maxRate: 17000, zone: "Old Gurgaon" },
    { label: "Sector 38", value: "sector-38", minRate: 11000, maxRate: 16000, zone: "Old Gurgaon" },
    { label: "Sector 40", value: "sector-40", minRate: 12000, maxRate: 17000, zone: "Old Gurgaon" },
    { label: "Sector 42", value: "sector-42", minRate: 20000, maxRate: 35000, zone: "Premium" }, // Moved to Premium
    { label: "Sector 43", value: "sector-43", minRate: 16000, maxRate: 24000, zone: "Old Gurgaon" },
    { label: "Sector 44", value: "sector-44", minRate: 13000, maxRate: 19000, zone: "Old Gurgaon" },
    { label: "Sector 45", value: "sector-45", minRate: 12000, maxRate: 17000, zone: "Old Gurgaon" },
    { label: "Sector 46", value: "sector-46", minRate: 12000, maxRate: 17000, zone: "Old Gurgaon" },
    { label: "Sector 47", value: "sector-47", minRate: 12000, maxRate: 17000, zone: "Old Gurgaon" },

    // Named localities
    { label: "Palam Vihar", value: "palam-vihar", minRate: 10000, maxRate: 15000, zone: "Old Gurgaon" },
    { label: "South City 1", value: "south-city-1", minRate: 14000, maxRate: 21000, zone: "South Gurgaon" },
    { label: "South City 2", value: "south-city-2", minRate: 12000, maxRate: 18000, zone: "South Gurgaon" },
    { label: "Malibu Towne", value: "malibu-towne", minRate: 13000, maxRate: 19000, zone: "South Gurgaon" },
    { label: "Nirvana Country", value: "nirvana-country", minRate: 15000, maxRate: 23000, zone: "South Gurgaon" },
    { label: "Ardee City", value: "ardee-city", minRate: 11000, maxRate: 16000, zone: "South Gurgaon" },
    { label: "Vatika City", value: "vatika-city", minRate: 12000, maxRate: 17000, zone: "South Gurgaon" },
    { label: "Emaar MGF Palm Hills", value: "palm-hills", minRate: 13000, maxRate: 18000, zone: "South Gurgaon" },
    { label: "Sobha City", value: "sobha-city", minRate: 16000, maxRate: 22000, zone: "Dwarka Expressway" },
    { label: "Bestech Park View", value: "bestech-park-view", minRate: 12000, maxRate: 17000, zone: "South Gurgaon" },
    { label: "Unitech Fresco", value: "unitech-fresco", minRate: 11000, maxRate: 16000, zone: "South Gurgaon" },
    { label: "Huda Plots (Sector 31–47)", value: "huda-plots", minRate: 15000, maxRate: 23000, zone: "Old Gurgaon" },
];

// Depreciation multiplier by property age
// Market Reality: In Gurgaon, a 20+ year old property is essentially a teardown. 
// The buyer is paying for the land, so the structural depreciation is much steeper.
export const AGE_MULTIPLIER: Record<string, number> = {
    "new": 1.0,
    "0-5": 0.95,
    "5-10": 0.85,  // Adjusted down slightly
    "10-20": 0.75, // Adjusted down
    "20+": 0.65,   // Heavy depreciation on the structure itself
};

// Floor adjustment multiplier
// Market Reality: Post-COVID, people want open spaces. Ground floors with private gardens 
// and top floors with exclusive roof rights command massive premiums, especially in independent floors.
export const FLOOR_MULTIPLIER: Record<string, number> = {
    "ground": 1.10, // Massive premium for backyard/lawn access
    "low": 0.95,    
    "mid": 1.0,     // Baseline
    "high": 1.05,   // Better views, less dust/noise
    "top": 1.15,    // Highest premium for terrace/roof rights 
};

// Property type adjustment
// Market Reality: The S+4 policy return means a single plot can yield 4 sellable floors, 
// driving plot and builder-floor values up. Meanwhile, SCO plots are the hottest commercial asset.
export const TYPE_MULTIPLIER: Record<string, number> = {
    "apartment": 1.0,            // Baseline
    "builder-floor": 1.15,       // S+4 policy makes these highly desirable
    "independent-house": 1.25,   
    "villa": 1.40,               // The ultra-luxury segment is booming
    "plot": 1.20,                // Bumped up from 0.85; land values are at an all-time high
    "commercial": 1.30,          // Standard retail/office
    "sco-plot": 1.60,            // SCOs yield 6-10% rental returns and are heavily sought after
};

export function estimateValue(
    localityValue: string,
    areaSqFt: number,
    propertyType: string,
    age: string,
    floor: string
): { minValue: number; maxValue: number; rateMin: number; rateMax: number; zone: string; localityLabel: string } | null {
    const locality = LOCALITIES.find((l) => l.value === localityValue);
    if (!locality || areaSqFt <= 0) return null;

    const ageMult = AGE_MULTIPLIER[age] ?? 1.0;
    const floorMult = FLOOR_MULTIPLIER[floor] ?? 1.0;
    const typeMult = TYPE_MULTIPLIER[propertyType] ?? 1.0;

    const adjustedMin = locality.minRate * ageMult * floorMult * typeMult;
    const adjustedMax = locality.maxRate * ageMult * floorMult * typeMult;

    return {
        minValue: Math.round(adjustedMin * areaSqFt),
        maxValue: Math.round(adjustedMax * areaSqFt),
        rateMin: Math.round(adjustedMin),
        rateMax: Math.round(adjustedMax),
        zone: locality.zone,
        localityLabel: locality.label,
    };
}

export function formatCrore(value: number): string {
    if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
        return `₹${(value / 100000).toFixed(1)} L`;
    }
    return `₹${value.toLocaleString("en-IN")}`;
}