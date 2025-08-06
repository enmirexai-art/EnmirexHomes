import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How fast can you buy my house?",
      answer: "We can typically make an offer within 24 hours of seeing your property and close in as little as 7 days. The exact timeline depends on your needs - we're flexible and can work around your schedule."
    },
    {
      id: 2,
      question: "Do I need to make repairs before selling?",
      answer: "No! We buy houses completely as-is. You don't need to make any repairs, clean, or stage the property. We handle everything and factor the property's condition into our fair cash offer."
    },
    {
      id: 3,
      question: "Are there any fees or commissions?",
      answer: "No fees, no commissions, no closing costs. Our cash offer is what you'll receive at closing. Unlike traditional sales, there are no agent fees, and we cover all closing costs."
    },
    {
      id: 4,
      question: "How do you determine your cash offer?",
      answer: "We base our offers on current market value, property condition, needed repairs, and local comparable sales. Our goal is to provide a fair offer that reflects your property's true value in its current condition."
    },
    {
      id: 5,
      question: "What if I'm behind on payments or facing foreclosure?",
      answer: "We specialize in helping homeowners in difficult situations. If you're behind on payments or facing foreclosure, we can often close quickly enough to help you avoid foreclosure and protect your credit."
    },
    {
      id: 6,
      question: "Is there any obligation to accept your offer?",
      answer: "Absolutely not! Our offers are completely no-obligation. Take your time to review it, discuss with family, and decide what's best for you. There's no pressure whatsoever."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to the most common questions about Enmirex Homes' buying process.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <Card key={faq.id} className="shadow-sm border border-gray-200">
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <ChevronDown 
                  className={`w-6 h-6 text-gray-400 transform transition-transform ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFAQ === faq.id && (
                <CardContent className="px-8 pb-6 pt-0">
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}