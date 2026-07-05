"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type Props = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  question,
  answer,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white dark:border-dark-border dark:bg-dark-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-6 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-bold text-gold">
            Q
          </span>

          <span className="font-semibold text-ink dark:text-dark-text">
            {question}
          </span>
        </div>

        {open ? (
          <Minus
            size={18}
            className="text-gold"
          />
        ) : (
          <Plus
            size={18}
            className="text-gold"
          />
        )}
      </button>

      {open && (
        <div className="border-t border-line px-6 py-6 dark:border-dark-border">
          <p className="leading-8 text-muted dark:text-dark-muted">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}