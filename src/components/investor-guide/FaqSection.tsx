import { Section, SectionHead } from "@/components/ui/primitives";
import { investorFaq } from "@/lib/content/investorFaq";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  return (
    <Section tone="white">
      <SectionHead
        label="FAQs"
        title="Frequently Asked Questions"
        lede="Detailed answers to the most common questions from international property investors — covering ownership, process, taxes, banking, citizenship, and more."
      />

      <div className="space-y-14">
        {investorFaq.map((category) => (
          <div key={category.title}>
            <h3 className="mb-6 text-xl font-bold tracking-wide text-gold">
              {category.title}
            </h3>

            <div className="space-y-4">
              {category.items.map((item) => (
                <FaqAccordion
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}