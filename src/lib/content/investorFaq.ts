export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  title: string;
  items: FaqItem[];
};

export const investorFaq: FaqCategory[] = [
  {
    title: "OWNERSHIP & ELIGIBILITY",

    items: [
      {
        question: "Can foreigners buy property in Turkey?",

        answer:
          "Yes. Citizens of most countries can purchase residential, commercial, or land property in Turkey with full freehold ownership — the same title deed (Tapu) as Turkish citizens. However, citizens of Armenia, Syria, North Korea, Nigeria, Cuba, and Yemen cannot buy. Enhanced due diligence applies to some other nationalities. A foreign individual can own up to 30 hectares, and foreign ownership cannot exceed 10% of any district's total private property area.",
      },

      {
        question: "Do I need a residence permit to buy?",

        answer:
          "No. Property ownership and immigration status are handled as completely separate processes by different government agencies. You do not need to live in Turkey or hold a residence permit to purchase property. However, if you want to live in Turkey after buying, the property itself can support your residence permit application ($200K+ value).",
      },

      {
        question: "Can I buy property in any location?",

        answer:
          "Almost. Foreign buyers cannot purchase in designated military zones, security areas, certain border regions, or strategically important coastal strips. The Land Registry Office performs an automatic military clearance check during every transaction — you don't need to apply separately. In rare cases, specific parcels in generally open areas may require special permission.",
      },

      {
        question: "Can I combine multiple properties for citizenship?",

        answer:
          "Yes. You can purchase multiple properties in different locations across Turkey to reach the $400,000 threshold. All properties must be purchased after the relevant date of the regulation, and the combined value must be verified through official valuation reports. The 3-year no-sale restriction applies to all properties used in the application.",
      },
    ],
  },

  {
    title: "BUYING PROCESS",

    items: [
      {
        question: "How long does the buying process take?",

        answer:
          "Typically 2–6 weeks from reservation to Tapu transfer when all documents are in order. The breakdown: property selection (varies), legal due diligence (3–5 days), mandatory valuation report (3–5 days), military clearance (usually instant, can take up to 3 weeks for some nationalities), fund transfer (1–3 days), and Land Registry appointment (1–2 days). The most common delays come from missing documents, not from the process itself.",
      },

      {
        question: "Do I need to visit Turkey to buy property?",

        answer:
          "Not necessarily. You can grant Power of Attorney (PoA) to your lawyer at a Turkish consulate or embassy in your country. With a valid PoA, your lawyer can handle the entire purchase — from signing the sales agreement to completing the Tapu transfer — on your behalf. However, you must visit Turkey once for biometrics if applying for citizenship.",
      },

      {
        question:
          "What is a property valuation report and why is it mandatory?",

        answer:
          "Since 2019, all foreign buyers must obtain an official valuation report from a government-licensed SPK appraiser before the Tapu transfer. The report protects buyers from overpaying and establishes the minimum taxable base. It is valid for three months.",
      },

      {
        question:
          "What is the Foreign Exchange Purchase Document (Döviz Alım Belgesi)?",

        answer:
          "This bank-issued document proves that foreign currency was converted into Turkish Lira through the Turkish banking system to pay for the property. It is essential for citizenship applications and proof of legitimate fund origin.",
      },
    ],
  },
  {
  title: "BANKING & FINANCE",

  items: [
    {
      question: "How do I open a Turkish bank account as a foreigner?",

      answer:
        "Visit a bank branch with your passport, Turkish tax number (VKN), proof of address, and a local Turkish phone number. Some banks (like Ziraat Bankası and VakıfBank) don't require a residence permit; others do. The account opens in 1–2 hours. You can hold multi-currency accounts (TRY, USD, EUR). Call the branch beforehand to confirm requirements — KYC/AML rules vary between branches. A bank account is essential for property purchases, utility payments, and rental income.",
    },

    {
      question: "Can I get a mortgage as a foreigner in Turkey?",

      answer:
        "Technically yes — Turkish banks like Garanti BBVA, Yapı Kredi, DenizBank, and Ziraat Bankası offer mortgages to foreigners. However, as of early 2026, interest rates on Turkish Lira mortgages are around 37–43% annually, making them impractical for most international buyers. Loan-to-value is typically 50–70%, meaning a 30–50% down payment. The vast majority of foreign buyers purchase with cash. If you do finance, ensure the bank documents satisfy citizenship requirements.",
    },

    {
      question: "How do I transfer money to Turkey for a property purchase?",

      answer:
        "Wire transfer from your home bank to your Turkish bank account is the standard method. The funds must be declared and converted through the official banking system (not informal channels). You'll receive a Döviz Alım Belgesi (Foreign Exchange Purchase Document) from the bank — essential for citizenship applications. Large transfers may trigger additional compliance checks under Turkish anti-money laundering regulations. Plan for 1–3 business days for international transfers.",
    },

    {
      question: "Can I hold my property purchase funds in USD or EUR?",

      answer:
        "Yes. Turkish banks offer multi-currency accounts. You can hold funds in USD, EUR, or GBP and convert to TRY when the exchange rate is favorable. However, the Tapu (title deed) sale price must be declared in Turkish Lira. Many buyers time their currency conversion strategically to maximize purchasing power — the Lira's volatility can work in your favor.",
    },
  ],
},

{
  title: "TAXES & COSTS",

  items: [
    {
      question: "What are the total costs of buying property in Turkey?",

      answer:
        "Budget approximately 5–8% on top of the purchase price for total closing costs. The main costs: title deed tax (4% of declared value), valuation report ($500–$1,000), notary and translation fees ($1,000–$1,500), legal fees ($2,000–$5,000), DASK earthquake insurance ($50–$200), and administrative charges. VAT may apply on new builds (1–18%) but first-time foreign buyers often qualify for exemption. Agency commission (2–3%) is typically paid by the seller.",
    },

    {
      question: "How is rental income taxed?",

      answer:
        "Foreign property owners earning rental income in Turkey must declare it annually in March. The tax is progressive: 15% on the first ~TRY 110,000, increasing in brackets up to 40% above ~TRY 1.9 million. Annual rental income below approximately TRY 47,000 (~$1,300) is exempt. You can deduct 15% of gross income as a flat expense deduction (no receipts needed), or deduct actual documented expenses including maintenance, insurance, management fees, and depreciation.",
    },

    {
      question: "What happens if I sell within 5 years?",

      answer:
        "If you sell within 5 years of purchase, profit is taxed as income at progressive rates (15–40%). Only the profit — sale price minus purchase price minus documented expenses (renovation, legal fees, etc.) — is taxable. After 5 years of ownership, there is zero capital gains tax. If the property was used for citizenship, you must hold for minimum 3 years regardless. Title deed tax (4%) applies again on the sale transaction.",
    },

    {
      question: "Is there any annual tax on property ownership?",

      answer:
        "Yes — the annual property tax (Emlak Vergisi) is paid to your local municipality in two installments (May and November). Rates are based on government-assessed value (usually well below market): 0.1% for residential property in non-metro areas, 0.2% in metropolitan cities like Istanbul, Ankara, and Izmir. Commercial properties are taxed at double the residential rate. This is a relatively small expense in most cases.",
    },
  ],
},

{
  title: "CITIZENSHIP & RESIDENCY",

  items: [
    {
      question: "What is the minimum investment for Turkish citizenship?",

      answer:
        "$400,000 USD in real estate. The property must be held for minimum 3 years with a no-sale annotation on the title deed. You can sell after 3 years while retaining citizenship permanently. The programme covers your spouse and children under 18 at no additional cost. Processing takes 3–6 months. Key documents include: Tapu, valuation report, Certificate of Conformity, foreign exchange document, criminal record, and birth certificate.",
    },

    {
      question:
        "What is the difference between residence permit and citizenship?",

      answer:
        "A residence permit (requires $200K+ property) allows you to live in Turkey for 1–2 years, renewable as long as you own the property. You must live in Turkey 183+ days/year to maintain it. After 5 continuous years, you can apply for citizenship through naturalisation. Citizenship ($400K+ property) is permanent from day one — no residency requirement, no language test, no cultural exam. You can live anywhere in the world while holding a Turkish passport.",
    },

    {
      question: "Can I get a US visa with Turkish citizenship?",

      answer:
        "Yes. Turkish citizens are eligible for the E-2 Investor Visa to the United States, which allows you to live and work in the US by opening or investing in a business there. It's renewable indefinitely every 2 years, your spouse can work legally, and children under 21 can study. Turkish citizens can also apply for 10-year B1/B2 tourist/business visas. This US access is one of the most valuable benefits of Turkish citizenship for many investors.",
    },

    {
      question: "What is the Certificate of Conformity?",

      answer:
        "The Certificate of Conformity (Uygunluk Belgesi) is an official document issued by the Ministry of Environment and Urbanisation confirming that your property purchase meets all citizenship programme requirements — correct valuation, proper foreign exchange documentation, and compliance with the no-sale annotation. Your lawyer applies for this after the Tapu transfer. It's a mandatory step in the citizenship application and typically takes 2–4 weeks to obtain.",
    },
    
  ],
},
    {
  title: "RENTAL INCOME & MANAGEMENT",

  items: [
    {
      question: "Can I rent out my property as a foreigner?",

      answer:
        "Yes. Foreign owners can freely rent their property in Turkey — both long-term (annual lease) and short-term (holiday/Airbnb). However, short-term holiday rentals now require a licence in most Turkish cities (introduced 2024). Buildings and hosts need permits, and building management (kat malikleri) approval may be required. Operating without a licence can result in fines. Professional property management companies can handle licencing and operations for you.",
    },

    {
      question: "What rental yields can I realistically expect?",

      answer:
        "Yields vary significantly by city and strategy. Long-term rentals: Istanbul 5–6%, Izmir 6–7%, Antalya 6–8%, Alanya 7–9%. Short-term holiday rentals (licensed): Bodrum/Fethiye 8–10% peak season, Antalya/Alanya 7–12%. Note: these are gross yields — subtract 1.5–2% for management, maintenance, vacancy, insurance, and taxes to get net returns. Furnished properties and those near beaches or metro stations command higher rents.",
    },

    {
      question: "How does property management work remotely?",

      answer:
        "Property management companies handle everything: tenant finding, rent collection, maintenance, cleaning (for short-term), utility payments, and representing you with building management. Fees range from 8–15% of rental income for long-term, higher for short-term/Airbnb management. They're available in all major cities and tourist destinations. Many communicate in English, Arabic, and Russian. Always get a written management contract specifying duties and fees.",
    },
  ],
},

{
  title: "MARKET & SAFETY",

  items: [
    {
      question: "Is Turkish property a safe investment?",

      answer:
        "Turkey has a robust, government-regulated land registry system (TKGM) where all ownership is officially registered. Mandatory valuation reports protect against overpricing. The key risks are: currency volatility (Lira fluctuations affect returns when measured in foreign currency), regulatory changes (citizenship rules have changed before), and construction quality (always check developer credentials and İskan certificate). Mitigate risk through independent legal due diligence, working with reputable agents, and diversifying across property types.",
    },

    {
      question: "Is now a good time to invest in Turkey (2026)?",

      answer:
        "According to TURKSTAT, Turkey's property market recorded 1,688,910 residential sales in 2025 — a 14.3% increase and a historic record. Mortgage sales surged 49.3% year-on-year. However, foreign purchases declined 9.4% to 21,534 units, meaning less competition for international buyers. Experts project continued domestic growth as interest rates are expected to ease. The weak Lira provides exceptional purchasing power for foreign currency holders. For USD, EUR, and GBP buyers, property in Turkey remains significantly undervalued compared to similar Mediterranean markets.",
    },

    {
      question: "What about earthquake risk?",

      answer:
        "Turkey is seismically active. Since the devastating 2023 earthquakes, building regulations have been significantly strengthened. All new constructions must meet updated earthquake-resistant standards. When buying: always verify the building has an İskan (habitation certificate), check when it was built (post-2000 buildings follow stricter codes), ask about seismic reinforcement for older buildings, and ensure mandatory DASK earthquake insurance is active. Modern complexes from reputable developers meet international seismic standards.",
    },

    {
      question: "What are the biggest mistakes foreign buyers make?",

      answer:
        "The most common mistakes: (1) Not hiring an independent lawyer — relying solely on the agent or developer's lawyer, (2) Skipping the title deed check — buying properties with undisclosed debts or liens, (3) Not budgeting for aidat (maintenance fees) — which can be $300+ per month in luxury complexes, (4) Ignoring the İskan certificate — buying properties without proper habitation permits, (5) Using informal money transfer channels — which voids citizenship applications, and (6) Not obtaining a valuation report before agreeing on price — letting the developer set the narrative.",
    },
  ],
},
];