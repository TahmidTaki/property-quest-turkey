"use client";

import { useState } from "react";
import { MessageCircle, Mail, X, Phone } from "lucide-react";
import { company } from "@/lib/site";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2">
          {company.whatsapp && (
            <a
              href={`https://wa.me/${company.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          )}
          <a
            href={`mailto:${company.email}`}
            className="flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 dark:bg-blue-700"
          >
            <Mail size={18} />
            Email
          </a>
          {company.phone && (
            <a
              href={`tel:${company.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 rounded-full bg-red px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
            >
              <Phone size={18} />
              Call
            </a>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-red text-white shadow-lg transition hover:scale-105 hover:bg-red-dark"
        aria-label="Contact us"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}