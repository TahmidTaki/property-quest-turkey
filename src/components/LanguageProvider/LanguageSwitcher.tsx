// "use client";

// import { useState, useEffect, useRef } from "react";
// import { ChevronDown, Check, Search } from "lucide-react";

// const SUPPORTED_LANGUAGES = [
//   { code: "en", name: "English", flag: "GB" },
//   { code: "zh", name: "中文", flag: "CN" },
//   { code: "ru", name: "Русский", flag: "RU" },
//   { code: "ur", name: "اردو", flag: "PK" },
//   { code: "hi", name: "हिन्दी", flag: "IN" },
//   { code: "bn", name: "বাংলা", flag: "BD" },
//   { code: "fa", name: "فارسی", flag: "IR" },
//   { code: "ar", name: "العربية", flag: "AE" },
//   { code: "es", name: "Español", flag: "ES" },
// ];

// export function LanguageSwitcher() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentLang, setCurrentLang] = useState("en");
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Load Google Translate script
//   useEffect(() => {
//     // Check if already loaded
//     if (document.querySelector('script[src*="gtranslate"]')) return;

//     // Load GTranslate script
//     const script = document.createElement("script");
//     script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
//     script.async = true;
//     script.defer = true;
//     document.head.appendChild(script);

//     // Get current language from localStorage
//     const savedLang = localStorage.getItem("gtranslate_lang");
//     if (savedLang) {
//       setCurrentLang(savedLang);
//     }
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const changeLanguage = (langCode: string) => {
//     setCurrentLang(langCode);
//     setIsOpen(false);
//     setSearchTerm("");
//     localStorage.setItem("gtranslate_lang", langCode);

//     // Set the language using GTranslate's API
//     if (window.gtranslate) {
//       window.gtranslate.changeLanguage(langCode);
//     } else {
//       // Fallback: reload with query param
//       const url = new URL(window.location.href);
//       url.searchParams.set("glang", langCode);
//       window.location.href = url.toString();
//     }
//   };

//   const filteredLanguages = SUPPORTED_LANGUAGES.filter(
//     (lang) =>
//       lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       lang.code.includes(searchTerm.toLowerCase())
//   );

//   const currentLanguage = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

//   return (
//     <div ref={dropdownRef} className="relative">
//       {/* Hidden GTranslate wrapper */}
//       <div className="gtranslate_wrapper" />

//       {/* Language Selector Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
//         aria-label="Change language"
//       >
//         <span className="text-sm font-semibold">{currentLanguage.flag}</span>
//         <span className="hidden sm:inline text-ink dark:text-dark-text">
//           {currentLanguage.code.toUpperCase()}
//         </span>
//         <span className="hidden md:inline text-muted">{currentLanguage.name}</span>
//         <ChevronDown size={14} className={`text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 top-full mt-2 z-50 w-64 rounded-xl border border-line bg-white p-3 shadow-lift dark:border-dark-border dark:bg-dark-card">
//           {/* Search input */}
//           <div className="relative mb-2">
//             <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
//             <input
//               type="text"
//               placeholder="Search languages..."
//               className="w-full rounded-lg border border-line bg-ivory pl-9 pr-3 py-2 text-sm placeholder:text-muted focus:border-navy focus:outline-none dark:border-dark-border dark:bg-dark-bg dark:text-dark-text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Language list */}
//           <div className="max-h-72 overflow-y-auto">
//             {filteredLanguages.map((lang) => {
//               const isActive = currentLang === lang.code;
//               return (
//                 <button
//                   key={lang.code}
//                   onClick={() => changeLanguage(lang.code)}
//                   className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
//                     isActive
//                       ? "bg-navy/10 text-navy dark:bg-navy/20 dark:text-blue-300"
//                       : "hover:bg-ivory dark:hover:bg-dark-bg"
//                   }`}
//                 >
//                   <span className="w-10 text-left text-sm font-semibold">{lang.flag}</span>
//                   <span className="flex-1 text-left text-ink dark:text-dark-text">{lang.name}</span>
//                   <span className="text-xs text-muted">{lang.code.toUpperCase()}</span>
//                   {isActive && <Check size={16} className="text-red" />}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // TypeScript declarations
// declare global {
//   interface Window {
//     gtranslate: {
//       changeLanguage: (lang: string) => void;
//     };
//   }
// }