import {
  Building2,
  ShieldCheck,
  TrendingUp,
  Globe2,
  Landmark,
  KeyRound,
  Wallet,
  Users,
  Search,
  FileSignature,
  ClipboardCheck,
  Home,
  Shield,
  FileCheck,
  Scale,
  Globe,
  MapPinned,
  Building,
  Briefcase,
  Store,
  Trees,
} from "lucide-react";

export const investorStats = [
  {
    value: "$400K",
    label: "Citizenship Threshold",
    description: "Minimum property investment for Turkish citizenship.",
  },
  {
    value: "5–8%",
    label: "Rental Yield",
    description: "Average gross returns in prime Istanbul districts.",
  },
  {
    value: "110+",
    label: "Visa-Free Destinations",
    description: "Accessible with a Turkish passport.",
  },
  {
    value: "3–6 Months",
    label: "Citizenship Timeline",
    description: "Typical completion period.",
  },
];

export const whyTurkey = [
  {
    icon: TrendingUp,
    title: "Strong Capital Growth",
    body: "Turkey remains one of the most dynamic real-estate markets in the region with sustained demand and infrastructure investment.",
  },
  {
    icon: Globe2,
    title: "Strategic Location",
    body: "A bridge between Europe, Asia, and the Middle East with global business and travel connections.",
  },
  {
    icon: ShieldCheck,
    title: "Citizenship Opportunity",
    body: "Eligible investments can provide Turkish citizenship for the investor and immediate family.",
  },
  {
    icon: Landmark,
    title: "Developed Banking System",
    body: "International banking services, financing options, and foreign-investor support.",
  },
  {
    icon: KeyRound,
    title: "Full Ownership Rights",
    body: "Foreign nationals can legally own freehold property in most parts of Turkey.",
  },
  {
    icon: Wallet,
    title: "Competitive Entry Costs",
    body: "Compared with many European markets, Turkish property offers attractive value.",
  },
  {
    icon: Users,
    title: "Family Lifestyle",
    body: "International schools, healthcare facilities, and modern urban infrastructure.",
  },
  {
    icon: Building2,
    title: "Diverse Property Options",
    body: "Luxury residences, branded projects, villas, commercial units, and rental investments.",
  },
];
export const buyingSteps = [
  {
    icon: Search,
    number: "01",
    title: "Initial Consultation & Property Search",
    timeline: "Week 1",
    body:
      "Define your investment goals, budget, and preferred city. We shortlist properties, arrange virtual or in-person viewings, and provide market data for informed decisions.",
  },

  {
    icon: Landmark,
    number: "02",
    title: "Get Your Turkish Tax Number & Bank Account",
    timeline: "Day 1–2",
    body:
      "Visit any tax office with your passport to obtain a tax identification number. Then open a Turkish bank account for all property transactions.",
  },

  {
    icon: ShieldCheck,
    number: "03",
    title: "Legal Due Diligence",
    timeline: "Week 1–2",
    body:
      "Your lawyer verifies the Tapu, debts, mortgages, zoning permissions, habitation certificates, and legal compliance.",
  },

  {
    icon: FileSignature,
    number: "04",
    title: "Sign Sales Agreement & Pay Deposit",
    timeline: "Week 2",
    body:
      "Sign a preliminary contract and pay a reservation deposit of 10–20% through official banking channels.",
  },

  {
    icon: ClipboardCheck,
    number: "05",
    title: "Property Valuation & Military Clearance",
    timeline: "Week 2–3",
    body:
      "Government-approved valuation reports and automatic military zone checks are completed through the Land Registry.",
  },

  {
    icon: Wallet,
    number: "06",
    title: "Fund Transfer & FX Documentation",
    timeline: "Week 3",
    body:
      "Transfer funds and obtain the Foreign Exchange Purchase Document required for ownership and citizenship applications.",
  },

  {
    icon: KeyRound,
    number: "07",
    title: "Title Deed Transfer (Tapu)",
    timeline: "Week 3–4",
    body:
      "Pay title deed taxes, present DASK insurance, and complete registration at the Land Registry Office.",
  },

  {
    icon: Home,
    number: "08",
    title: "Post-Purchase Registration",
    timeline: "After Transfer",
    body:
      "Register utilities, residency applications, citizenship procedures, and property management services.",
  },
];

export const tapuTypes = [
  {
    title: "Kat Mülkiyeti",
    subtitle: "Red Tapu",
    body:
      "Full condominium ownership for completed buildings. The strongest ownership structure available.",
    color: "border-red/20 bg-red/5",
  },

  {
    title: "Kat İrtifakı",
    subtitle: "Floor Easement",
    body:
      "Used for properties under construction and converted after project completion.",
    color: "border-gold/20 bg-gold/5",
  },

  {
    title: "Hisseli Tapu",
    subtitle: "Shared Deed",
    body:
      "Represents partial ownership of land or property and requires additional legal checks.",
    color: "border-blue-500/20 bg-blue-50",
  },
];

export const tapuDocuments = [
  "Valid Passport (translated & notarised)",
  "Turkish Tax Number",
  "Property Valuation Report (SPK)",
  "DASK Earthquake Insurance",
  "Foreign Exchange Purchase Document",
  "Biometric Photographs (2x)",
  "Bank Account Details",
  "Power of Attorney (if remote)",
  "Sales Agreement",
];


export const purchaseCosts = [
  {
    title: "Title Deed Tax",
    value: "4%",
    body: "Paid upon transfer of ownership. Usually split by agreement between buyer and seller.",
  },
  {
    title: "Property Valuation",
    value: "$200–500",
    body: "Mandatory SPK-certified valuation report required for foreigners.",
  },
  {
    title: "DASK Insurance",
    value: "$50–150",
    body: "Compulsory earthquake insurance before title transfer.",
  },
  {
    title: "Legal Fees",
    value: "1–2%",
    body: "Independent legal representation and due diligence costs.",
  },
  {
    title: "Translation & Notary",
    value: "$100–300",
    body: "Passport translation, notarization, and official documents.",
  },
  {
    title: "Annual Property Tax",
    value: "0.1–0.6%",
    body: "Depends on municipality and property category.",
  },
];

export const residencyOptions = [
  {
    title: "Residence Permit",
    requirement: "$200,000+ Property",
    benefits: [
      "Renewable annually",
      "Live in Turkey full-time",
      "Family members included",
      "Access to healthcare and education",
    ],
    color: "bg-blue-50 border-blue-200",
  },

  {
    title: "Citizenship by Investment",
    requirement: "$400,000+ Property",
    benefits: [
      "Turkish passport",
      "Citizenship for spouse & children",
      "No language requirement",
      "Dual citizenship allowed",
    ],
    color: "bg-gold/10 border-gold/30",
  },
];

export const bankingCards = [
  {
    title: "Turkish Bank Account",
    body:
      "Required for property transactions, utility payments, and rental income collection.",
  },

  {
    title: "Tax Number",
    body:
      "Issued free at any tax office with only your passport.",
  },

  {
    title: "Utilities",
    body:
      "Electricity, water, internet, and gas can be transferred after ownership registration.",
  },

  {
    title: "Property Management",
    body:
      "Recommended for overseas investors earning rental income.",
  },

  {
    title: "Rental Income Tax",
    body:
      "Rental earnings are taxable but certain exemptions may apply.",
  },

  {
    title: "Inheritance Rights",
    body:
      "Foreign owners may pass Turkish properties to legal heirs.",
  },
];

export const legalProtections = [
  {
    icon: Shield,
    title: "Equal Ownership Rights",
    body: "Foreign nationals enjoy the same ownership protections as Turkish citizens in eligible regions.",
  },

  {
    icon: FileCheck,
    title: "Government Registry System",
    body: "All ownership records are maintained by TKGM and can be verified digitally.",
  },

  {
    icon: Scale,
    title: "Legal Due Diligence",
    body: "Independent lawyers verify mortgages, liens, zoning, and building permits before purchase.",
  },

  {
    icon: Globe,
    title: "Inheritance Rights",
    body: "Foreign owners may legally transfer Turkish properties to heirs through inheritance procedures.",
  },

  {
    icon: MapPinned,
    title: "Restricted Military Zones",
    body: "Certain strategic areas remain unavailable to foreign ownership and are checked automatically.",
  },

  {
    icon: Shield,
    title: "Power of Attorney Protection",
    body: "Purchases completed remotely through notarised PoA carry full legal validity.",
  },
];

export const propertyTypes = [
  {
    icon: Building,
    title: "Apartments",
    body: "The most popular investment choice, offering strong rental demand and capital appreciation.",
  },

  {
    icon: Home,
    title: "Luxury Villas",
    body: "Private residences ideal for lifestyle buyers and high-net-worth investors.",
  },

  {
    icon: Briefcase,
    title: "Commercial Properties",
    body: "Offices, business centers, and mixed-use developments generating long-term income.",
  },

  {
    icon: Store,
    title: "Retail Units",
    body: "Street-level shops and mall investments with stable tenant demand.",
  },

  {
    icon: Trees,
    title: "Land Investments",
    body: "Plots suitable for future development or long-term appreciation strategies.",
  },
];

export const investmentCities = [
  {
    id: "istanbul",
    emoji: "🌉",
    name: "Istanbul",
    badge: "ECONOMIC CAPITAL",

    paragraphs: [
      `Istanbul is Turkey's undisputed economic, cultural, and real estate powerhouse — a city of 16 million people straddling two continents. It generates roughly 31% of Turkey's GDP and is home to the country's financial centre, its largest port, and three international airports, including the world's largest terminal at Istanbul Airport. For property investors, Istanbul offers the widest range of options anywhere in Turkey: from affordable new-build apartments in emerging western suburbs like Beylikdüzü and Esenyurt, to ultra-premium branded residences and waterfront penthouses along the Bosphorus.`,

      `The city consistently leads Turkey in foreign property purchases, attracting buyers from across the Middle East, Central Asia, Europe, and Africa. Istanbul's appeal lies in its combination of strong capital appreciation potential and solid rental demand from locals, expats, students, and tourists.`,

      `Beyond investment, Istanbul offers a lifestyle that few cities can match. World-class dining, a 3,000-year history, vibrant nightlife, international schools, modern hospitals, and a cultural scene that spans everything from Ottoman palaces to contemporary art galleries.`,

      `Key districts for investors include Beylikdüzü, Kadıköy, Beyoğlu, Maltepe, Başakşehir, and Ataşehir. Istanbul is the right choice for investors seeking long-term capital growth, liquidity, and portfolio diversity.`,
    ],
  },

  {
    id: "antalya",
    emoji: "🏖️",
    name: "Antalya",
    badge: "TOURISM CAPITAL",

    paragraphs: [
      `Antalya is Turkey's Mediterranean tourism capital — a sun-drenched coastal city welcoming millions of visitors every year. This creates one of the strongest short-term rental markets in the country.`,

      `The city stretches along a spectacular coastline backed by the Taurus Mountains, offering everything from modern apartments in Konyaaltı and Lara to detached villas in Belek and Kundu.`,

      `Its infrastructure is outstanding, featuring a major international airport, expanding public transport, international schools, and world-class healthcare.`,

      `For investors seeking income-producing holiday properties or retirement homes with global appeal, Antalya remains one of Turkey's strongest markets.`,
    ],
  },

  {
    id: "bodrum",
    emoji: "⛵",
    name: "Bodrum",
    badge: "LUXURY RIVIERA",

    paragraphs: [
      `Bodrum is Turkey's premier luxury destination — often compared to Saint-Tropez or the Amalfi Coast, but at a fraction of the price.`,

      `The peninsula encompasses numerous villages and bays, each with distinct lifestyles and investment opportunities, from Yalıkavak's yacht marinas to Türkbükü's celebrity culture.`,

      `Short-term rental yields can exceed 8–10% during peak season, supported by international tourism and wealthy domestic buyers.`,

      `Although prices are significantly higher than most Turkish markets, Bodrum offers exceptional prestige, lifestyle value, and long-term resilience.`,
    ],
  },
  {
  id: "fethiye",
  emoji: "🦋",
  name: "Fethiye",
  badge: "HIDDEN GEM",

  paragraphs: [
    `Fethiye is one of Turkey's best-kept secrets — a laid-back coastal town nestled between pine-covered mountains and the turquoise waters of the Aegean Sea. Unlike larger resort cities, Fethiye retains an authentic small-town atmosphere while offering excellent infrastructure for international buyers.`,

    `The region includes world-famous locations such as Ölüdeniz, Kayaköy, Hisarönü, and Çalış Beach. Each area provides distinct lifestyles and investment opportunities.`,

    `Property prices remain significantly lower than Bodrum while offering attractive villa investments with strong seasonal rental demand.`,

    `Fethiye appeals particularly to retirees, digital nomads, and families seeking a balanced lifestyle investment they can personally enjoy as well as profit from.`,
  ],
},

{
  id: "alanya",
  emoji: "🌊",
  name: "Alanya",
  badge: "BEST VALUE COAST",

  paragraphs: [
    `Alanya offers one of the most affordable entry points into Mediterranean property ownership. Prices remain substantially below Antalya and Bodrum while maintaining strong rental demand.`,

    `The city hosts residents from more than eighty nationalities and supports year-round living with international schools, healthcare facilities, and expat communities.`,

    `Modern apartment complexes dominate the market, frequently including resort-style amenities such as pools, gyms, and private security.`,

    `For first-time investors seeking income potential and manageable entry costs, Alanya remains one of Turkey's strongest value propositions.`,
  ],
},

{
  id: "izmir",
  emoji: "🏛️",
  name: "Izmir",
  badge: "LIFESTYLE CITY",

  paragraphs: [
    `Izmir combines the economic fundamentals of a major metropolitan area with the lifestyle advantages of the Aegean coast. Many consider it Turkey's most livable city.`,

    `Districts such as Alsancak, Karşıyaka, Bornova, and Çeşme provide distinct investment strategies ranging from student housing to luxury coastal residences.`,

    `Growing numbers of European buyers are choosing Izmir thanks to lower congestion, cleaner air, and more affordable property prices than Istanbul.`,

    `Investors benefit from diversified economic activity, strong rental demand, and long-term appreciation potential driven by infrastructure and urban regeneration projects.`,
  ],
},

{
  id: "bursa",
  emoji: "🌿",
  name: "Bursa",
  badge: "GREEN CITY",

  paragraphs: [
    `Bursa is Turkey's fourth-largest city and one of its most underrated investment destinations. Surrounded by mountains, forests, and thermal springs, it offers exceptional quality of life.`,

    `Property prices remain among the most affordable in western Turkey, attracting substantial interest from Gulf investors and family-oriented buyers.`,

    `Its strong industrial economy—particularly automotive manufacturing and textiles—supports consistent domestic rental demand beyond tourism.`,

    `For investors seeking long-term value, affordability, and improving connectivity to Istanbul, Bursa offers a compelling alternative to coastal markets.`,
  ],
},
];

