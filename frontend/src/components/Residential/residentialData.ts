export const HERO_STATS = [
  { value: 2006, label: "FOUNDED", isYear: true },
  { value: 30, suffix: "+", label: "PROJECTS" },
  { value: 1500, suffix: "+", label: "CLIENTS SERVED" },
  { value: 8, label: "DEVELOPER PARTNERS" },
];

export const TRUST_SIGNALS = [
  "All projects RERA-registered (HRERA) — verified before listing",
  "Zero brokerage to buyers — we are compensated by developers",
  "Direct developer pricing — no portal markup",
  "Pre-launch access for qualified buyers",
  "Dedicated NRI desk · Dubai office · WhatsApp advisory",
  "Developer-felicitated: DLF, Godrej Properties, M3M, Emaar",
  "HRERA-registered channel partner — Gurgaon office: 408, 4th Floor, Adani Miracle Mile, Sector 60",
];

export const EVALUATION_CRITERIA = [
  {
    number: "\u2460",
    title: "RERA Registration & Compliance",
    description:
      "Registered with Haryana RERA, quarterly updates filed, no show-cause or penalty orders on record.",
  },
  {
    number: "\u2461",
    title: "Developer Track Record",
    description:
      "At least 2 delivered projects in India with possession achieved within 18 months of promised date.",
  },
  {
    number: "\u2462",
    title: "Carpet Efficiency \u2265 68%",
    description:
      "We discard projects where super built-up area inflates pricing beyond what buyers actually receive as usable space.",
  },
  {
    number: "\u2463",
    title: "Low Density (\u2264 60 units/acre)",
    description:
      "High-density projects compromise lifestyle quality and resale premium. We prefer under 50 units per acre.",
  },
  {
    number: "\u2464",
    title: "Clear Location Growth Thesis",
    description:
      "A credible infrastructure or commercial catalyst within 2 km that supports value appreciation in 3\u20135 years.",
  },
  {
    number: "\u2465",
    title: "Resale Liquidity",
    description:
      "Active secondary market transactions in the same micro-location, not just primary sales.",
  },
  {
    number: "\u2466",
    title: "Title Clarity",
    description:
      "Land title verified, no litigation, development agreement reviewed. Our legal desk confirms before listing.",
  },
];

export type Corridor = {
  id: string;
  sectors: string;
  name: string;
  priceRange: string;
  perSqFt: string;
  config: string;
  appreciation: string;
  projects: string[];
  buyerProfile: string;
};

export const CORRIDORS: Corridor[] = [
  {
    id: "golf-course-road",
    sectors: "Sectors 42 \u2013 56",
    name: "Golf Course Road",
    priceRange: "\u20B95 \u2013 30 Cr",
    perSqFt: "\u20B925,000 \u2013 55,000",
    config: "3\u20135 BHK",
    appreciation: "8\u201312% p.a.",
    projects: [
      "DLF The Camellias \u00B7 5 BHK \u00B7 Sector 42",
      "Godrej Astra \u00B7 3 & 4 BHK \u00B7 Sector 54",
      "Trevoc Royal Residences \u00B7 3 & 4 BHK \u00B7 Sector 56",
      "Tulip Monsella \u00B7 4 & 5 BHK \u00B7 Sector 53",
      "DLF The Aralias \u00B7 4 & 5 BHK \u00B7 Sector 42",
    ],
    buyerProfile:
      "Ultra-HNI buyers, corporate CXOs, and NRIs seeking the strongest address in Delhi NCR with maximum resale liquidity and zero compromise on lifestyle. Maintenance costs are high; factor \u20B915,000\u2013\u20B940,000/month into your ownership budget.",
  },
  {
    id: "golf-course-extension",
    sectors: "Sectors 58 \u2013 69",
    name: "Golf Course Extension Road",
    priceRange: "\u20B93.5 \u2013 15 Cr",
    perSqFt: "\u20B912,000 \u2013 22,000",
    config: "3 & 4 BHK",
    appreciation: "10\u201315% p.a.",
    projects: [
      "Oberoi Realty \u00B7 Sector 58 \u00B7 Pre-Launch 2025",
      "DLF Privana West \u00B7 4 & 5 BHK \u00B7 Sector 76",
      "M3M Golf Estate \u00B7 3 & 4 BHK \u00B7 Sector 65",
      "TARC Ishva \u00B7 3\u20135 BHK \u00B7 Sector 63A",
      "Emaar Urban Oasis \u00B7 3 & 4 BHK \u00B7 Sector 62",
    ],
    buyerProfile:
      "HNI buyers seeking prestige at a relative discount vs Golf Course Road, investors with a 3\u20137 year horizon, and NRIs wanting appreciation-driven returns. The upcoming metro corridor and Sector 58\u201366 commercial development are the key catalysts to track.",
  },
  {
    id: "dwarka-expressway",
    sectors: "Sectors 76 \u2013 110",
    name: "Dwarka Expressway",
    priceRange: "\u20B990L \u2013 6 Cr",
    perSqFt: "\u20B96,000 \u2013 12,000",
    config: "2\u20134 BHK",
    appreciation: "9\u201314% p.a.",
    projects: [
      "M3M Antalya Hills \u00B7 2 & 3 BHK \u00B7 Sector 79",
      "Godrej Properties \u00B7 Sector 88 \u00B7 Floors & Apartments",
      "Adani Oyster Grande \u00B7 3\u20135 BHK \u00B7 Sector 102",
      "Sobha City \u00B7 2 & 3 BHK \u00B7 Sector 108",
      "Ambience Creacions \u00B7 3 & 4 BHK \u00B7 Sector 22",
    ],
    buyerProfile:
      "First-time luxury buyers, professionals seeking airport proximity (IGI Airport 25\u201330 min), and investors optimising for rental yield and capital growth. Best suited for buyers with \u20B91.5\u2013\u20B95 Crore budgets who want maximum sq ft for their investment.",
  },
];

export type BuyerPersona = {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
};

export const BUYER_PERSONAS: BuyerPersona[] = [
  {
    icon: "ph:house-line-bold",
    title: "The End-User",
    subtitle: "Buying Your Family\u2019s Forever Home",
    description:
      "Your priority is lifestyle, schools, and quality of construction \u2014 not a five-year exit. We help you navigate the difference between a beautifully marketed project and one that genuinely delivers on daily living quality.",
    points: [
      "School proximity mapped to each project",
      "Construction quality inspections before recommendation",
      "Maintenance charge transparency upfront",
      "Community density and social infrastructure assessed",
      "Connectivity to your workplace corridor prioritised",
    ],
  },
  {
    icon: "ph:chart-line-up-bold",
    title: "The HNI Investor",
    subtitle: "Portfolio Allocation to Luxury Real Estate",
    description:
      "You understand risk. You have seen Gurgaon cycles. What you need is hyper-specific micro-location intelligence, not brochure copy \u2014 and an honest conversation about which projects are worth your capital at current entry prices.",
    points: [
      "Pre-launch access before public availability",
      "Comparable sales analysis (actual registered prices, not asking prices)",
      "Capital appreciation modelling by micro-location",
      "Exit strategy built into the buying decision",
      "Resale support with our established buyer network",
    ],
  },
  {
    icon: "ph:arrow-circle-up-bold",
    title: "The Upgrader",
    subtitle: "Moving From Mid-Market to Luxury",
    description:
      "You own a property already. You are selling to fund an upgrade into the \u20B93\u20137 Crore bracket. The timing, project choice, and tax implications of the upgrade all need to align.",
    points: [
      "Resale valuation for your existing property",
      "Bridge financing options and timeline management",
      "Capital gains tax advisory (via our empanelled CA network)",
      "Home loan for the incremental amount at best rates",
      "Stamp duty optimisation where applicable",
    ],
  },
];

export type DueDiligenceRow = {
  parameter: string;
  whatToLookFor: string;
  redFlag: string;
  uniselStandard: string;
};

export const DUE_DILIGENCE_DATA: DueDiligenceRow[] = [
  {
    parameter: "RERA Registration",
    whatToLookFor: "Active on haryanarera.gov.in with quarterly updates",
    redFlag: "\u2018Applied for RERA\u2019 or lapsed registration",
    uniselStandard: "Mandatory",
  },
  {
    parameter: "Developer Track Record",
    whatToLookFor: "Min. 2 delivered projects with \u226418 month delay",
    redFlag: "First project in Gurgaon, or consistent delays",
    uniselStandard: "Verified independently",
  },
  {
    parameter: "Carpet Efficiency",
    whatToLookFor: "Carpet / Super BUA \u2265 68%",
    redFlag: "Below 65% \u2014 paying for walls, not your home",
    uniselStandard: "Min. 68% enforced",
  },
  {
    parameter: "Project Density",
    whatToLookFor: "Under 60 units per acre (\u226450 preferred)",
    redFlag: "High-rise clusters with 80\u2013120+ units/acre",
    uniselStandard: "\u226460 units/acre",
  },
  {
    parameter: "Title Clarity",
    whatToLookFor: "Freehold land, no litigation, clear development agreement",
    redFlag: "Leasehold land, GPA-based transactions, court cases",
    uniselStandard: "Legal desk verified",
  },
  {
    parameter: "BSP vs Total Cost",
    whatToLookFor: "Understand PLC, EEC, IFMS, Club, Parking costs",
    redFlag: "Low headline BSP with 20%+ add-ons in annexures",
    uniselStandard: "Total cost disclosed upfront",
  },
  {
    parameter: "Maintenance Charges",
    whatToLookFor: "Current monthly rate per sq ft; historical escalation",
    redFlag: "No maintenance agreement or \u2018to be decided\u2019",
    uniselStandard: "Shown pre-booking",
  },
];

export const BUYERS_GUIDE_SECTIONS = [
  {
    title: "What Drives Property Prices in Gurgaon\u2019s Luxury Market?",
    content: `Gurgaon\u2019s luxury residential prices are shaped by five compounding forces: location prestige, developer brand premium, floor and orientation, construction stage (pre-launch vs. ready-to-move), and infrastructure proximity. Understanding which force is doing the most work at any given price point helps buyers identify genuine value versus marketing premium.

The most consistent pricing driver across 18 years in this market is what we call developer trust equity \u2014 the willingness of buyers to pay above comparable market rates simply because a developer\u2019s name is on the project. DLF commands a 15\u201325% premium over similarly located mid-tier developers for this reason. Oberoi Realty, entering Gurgaon with its Sector 58 launch, is positioned to command a similar premium given its Mumbai track record.`,
  },
  {
    title: "Understanding the Full Cost of Buying in Gurgaon",
    content: `The base sale price (BSP) you see advertised is rarely the number that appears on your final payment plan. The true all-in cost of a luxury property in Gurgaon typically runs 20\u201328% higher than BSP.

\u2022 Base Sale Price (BSP): 100% reference \u2014 Carpet area basis per RERA
\u2022 Preferential Location Charges (PLC): 3\u201310% of BSP \u2014 Higher for golf/park-facing, top floors
\u2022 External Development Charges (EDC/IDC): \u20B9200\u2013600 per sq ft \u2014 Government levy
\u2022 Interest-Free Maintenance Security (IFMS): \u20B9100\u2013300 per sq ft \u2014 Refundable deposit
\u2022 Car Parking: \u20B95\u201325 Lakhs per space \u2014 Mandatory for 4 BHK+
\u2022 Club Membership: \u20B93\u201310 Lakhs \u2014 Varies by project
\u2022 GST: 5% (under-construction only) \u2014 Nil for ready-to-move
\u2022 Stamp Duty: 5% (men) / 3% (women) \u2014 Haryana rates
\u2022 Registration Charges: Up to \u20B950,000 \u2014 Fixed cap in Haryana`,
  },
  {
    title: "Ready-to-Move vs. Under-Construction: Which Is Right for You?",
    content: `This is the question every buyer asks \u2014 and the answer depends entirely on your individual circumstances, not on which type is \u2018better\u2019 in the abstract.

\u2022 Ready-to-move properties eliminate construction risk, require no GST, and provide immediate possession. The trade-off: you pay 15\u201330% more than pre-launch pricing for the same developer and location.

\u2022 Under-construction projects offer pre-launch pricing, ability to choose floor and orientation, and construction-linked payment plans that ease cash flow. Risk is delivery.

\u2022 Pre-launch bookings offer maximum price advantage \u2014 typically 10\u201320% below launch pricing \u2014 but carry the highest uncertainty. We recommend pre-launch only to investors who understand the risk-return equation explicitly.`,
  },
  {
    title: "The RERA Reality: What It Protects and What It Doesn\u2019t",
    content: `RERA is the most important consumer protection in Indian real estate since 2017. But it is widely misunderstood.

What RERA guarantees: Carpet area disclosure and pricing, quarterly construction updates, mandatory escrow of 70% of buyer funds, penalty clauses for delay, dispute resolution mechanism.

What RERA does not guarantee: Quality of construction materials, amenity delivery timelines, maintenance standards, or automatic refunds.

Practical implication: RERA registration is necessary but not sufficient. The developer\u2019s historical track record remains the most reliable predictor of outcome.`,
  },
  {
    title: "How Property Appreciation Works in Gurgaon\u2019s Luxury Market",
    content: `Projects in our portfolio that have consistently delivered the strongest appreciation share a common pattern: low-density, developer-brand-anchored projects on corridors where infrastructure was improving visibly within 2\u20133 years of purchase.

Golf Course Extension Road from 2018 to 2025 is the defining example \u2014 buyers who purchased at \u20B98,000\u201310,000 per sq ft in Sectors 65\u201366 now hold assets worth \u20B918,000\u201322,000 per sq ft. That is not luck; it is the outcome of a clear infrastructure and developer thesis playing out.`,
  },
];

export const RESIDENTIAL_FAQS = [
  {
    question: "What is the price of luxury apartments in Gurgaon in 2026?",
    answer:
      "Golf Course Road (Sectors 42\u201356) commands \u20B925,000\u2013\u20B955,000 per sq ft BSP, with apartments starting at \u20B95 Crore and penthouses exceeding \u20B930 Crore. Golf Course Extension Road ranges from \u20B912,000\u2013\u20B922,000 per sq ft; 3 BHK apartments start at \u20B93.5 Crore. Dwarka Expressway offers \u20B96,000\u2013\u20B912,000 per sq ft; premium apartments start at \u20B990 Lakhs. Factor in 20\u201328% above BSP for all-in costs including stamp duty, PLC, parking, GST, and registration.",
  },
  {
    question: "Which area has the best ROI for residential investment?",
    answer:
      "Golf Course Extension Road has delivered the highest capital appreciation in Gurgaon over 2018\u20132025, averaging 10\u201315% per annum. For 2026\u20132030, Sectors 58\u201366 on Golf Course Extension Road \u2014 particularly Oberoi Realty and DLF anchored projects \u2014 are the corridors our team rates highest. Dwarka Expressway offers strong rental yield (3\u20134% gross) for yield-focused investors.",
  },
  {
    question: "What documents are required to buy property in Gurgaon?",
    answer:
      "Resident Indian: Aadhaar, PAN, address proof, last 2 years\u2019 ITR, 6 months\u2019 bank statements. NRI buyers additionally need: valid passport, OCI card (if applicable), NRE/NRO account details, overseas address proof, and FEMA declaration. Unisel Realty provides a personalised documentation checklist and assists with every step including POA setup.",
  },
  {
    question: "What is carpet area vs super built-up area?",
    answer:
      "Carpet area is the usable floor space within your apartment\u2019s walls. Super built-up area (SBA) includes carpet area plus your proportionate share of common areas. Since RERA 2017, all transactions must be priced on carpet area basis. Carpet efficiency in Gurgaon luxury projects ranges from 65% to 78%. We present both figures on every project.",
  },
  {
    question: "What are typical maintenance charges for luxury apartments?",
    answer:
      "Maintenance charges range from \u20B94\u20138 per sq ft per month for mid-luxury projects on Dwarka Expressway, to \u20B912\u201340 per sq ft per month for ultra-luxury properties on Golf Course Road. For a 3,000 sq ft apartment on Golf Course Extension Road, expect \u20B915,000\u2013\u20B925,000 per month. Always ask for the existing maintenance schedule before booking \u2014 \u2018to be decided\u2019 is not acceptable.",
  },
  {
    question:
      "Is 2026 a good time to buy luxury residential property in Gurgaon?",
    answer:
      "Based on current fundamentals, yes \u2014 for buyers with a 5+ year horizon. Structural drivers remain strong: sustained corporate demand, infrastructure maturation (Dwarka Expressway, metro expansion), entry of global developers (Oberoi Realty, Prestige), and growing NRI buyer base. The luxury segment (\u20B93 Crore+) continues to see demand outpacing supply in low-density projects by marquee developers.",
  },
];

export type DeveloperPartner = {
  name: string;
  segment: string;
  corridors: string;
  status: string;
  felicitated: boolean;
};

export const DEVELOPER_PARTNERS: DeveloperPartner[] = [
  {
    name: "DLF",
    segment: "Ultra-Luxury",
    corridors: "Golf Course Road & GCER",
    status: "Felicitated Partner",
    felicitated: true,
  },
  {
    name: "Godrej Properties",
    segment: "Premium",
    corridors: "Golf Course Road & Dwarka Expwy",
    status: "Felicitated Partner",
    felicitated: true,
  },
  {
    name: "M3M India",
    segment: "Luxury",
    corridors: "GCER & Dwarka Expressway",
    status: "Felicitated Partner",
    felicitated: true,
  },
  {
    name: "Emaar India",
    segment: "Luxury",
    corridors: "Sector 62 & GCER",
    status: "Felicitated Partner",
    felicitated: true,
  },
  {
    name: "Oberoi Realty",
    segment: "Ultra-Luxury",
    corridors: "Sector 58 (Pre-Launch)",
    status: "New Launch Partner",
    felicitated: false,
  },
  {
    name: "Adani Realty",
    segment: "Premium",
    corridors: "Golf Course Extension Road",
    status: "Active Portfolio",
    felicitated: false,
  },
  {
    name: "Sobha Limited",
    segment: "Luxury",
    corridors: "Dwarka Expressway",
    status: "Active Portfolio",
    felicitated: false,
  },
  {
    name: "Smart World",
    segment: "Mid-Luxury",
    corridors: "Sector 66, GCER",
    status: "Active Portfolio",
    felicitated: false,
  },
];

export const UNISEL_ADVANTAGES = [
  {
    number: "01",
    title: "Curated Portfolio, Not Exhaustive Listings",
    description:
      "We evaluate 8\u201310 projects for every 1 we recommend. If it doesn\u2019t pass our due diligence, it doesn\u2019t appear in our portfolio \u2014 regardless of developer relationship or commission structure.",
  },
  {
    number: "02",
    title: "Pre-Launch Access for Qualified Buyers",
    description:
      "Our authorised partner status gives clients access to pre-launch inventory before public listing \u2014 typically 10\u201320% below launch pricing on the same developer, same project, same floor.",
  },
  {
    number: "03",
    title: "Developer Recognition",
    description:
      "Felicitated by DLF, Godrej Properties, M3M, and Emaar for advisory transparency and consistent buyer delivery. This reflects our client-first approach to every transaction.",
  },
  {
    number: "04",
    title: "Zero Cost to Buyers",
    description:
      "Our entire advisory \u2014 from first call to post-registration handover \u2014 costs our clients nothing. We are compensated directly by developers as authorised channel partners.",
  },
  {
    number: "05",
    title: "Corridor-Specialist Advisors",
    description:
      "Each advisor on our team specialises in one corridor. You speak to someone who has visited every project they recommend, multiple times.",
  },
  {
    number: "06",
    title: "The Relationship Continues After Possession",
    description:
      "From interior referrals and punch list management to resale and rental advisory \u2014 we remain your Gurgaon real estate partner for the life of the asset.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Most brokers showed us brochures. Unisel showed us real registered transaction data for the same corridor. That transparency \u2014 in a market where everyone is selling \u2014 was what made us trust them with a \u20B95 Crore decision.",
    author: "Senior Executive \u2014 Technology Sector, Gurgaon",
    detail: "4 BHK Purchase, Golf Course Extension Road, 2024",
  },
  {
    quote:
      "As an NRI based in Dubai, I needed someone who would be straight with me about what I couldn\u2019t see. They video-walked me through the actual construction site, not just the showflat. Honest, thorough, and genuinely helpful.",
    author: "NRI Buyer \u2014 UAE",
    detail: "3 BHK Purchase, Sector 62, Golf Course Extension Road, 2023",
  },
  {
    quote:
      "I had looked at 11 projects before reaching Unisel. They told me 7 of the 11 didn\u2019t meet their standards and explained exactly why. That alone saved me from a poor investment. The project they recommended has already appreciated 18% in 14 months.",
    author: "HNI Investor \u2014 Entrepreneur, Delhi NCR",
    detail: "Pre-Launch Purchase, Golf Course Road, 2023",
  },
  {
    quote:
      "What impressed us most was that they told us upfront which project had a higher maintenance cost and why. No one else we\u2019d spoken to had volunteered that information. That honesty is rare in this business.",
    author: "Family Purchase \u2014 Doctor, Gurgaon",
    detail: "3 BHK Purchase, Dwarka Expressway, 2024",
  },
];
