import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ProcessSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const steps = [
    {
      number: "1",
      title: "Share Property Info",
      description: "Tell us about your home through our simple form or give us a call. Basic details help us provide an accurate cash offer.",
      bgColor: "bg-primary",
      showArrow: true,
    },
    {
      number: "2", 
      title: "Schedule Visit",
      description: "We'll arrange a convenient time to visit your property. Quick walk-through to assess condition and finalize our offer.",
      bgColor: "bg-primary",
      showArrow: true,
    },
    {
      number: "3",
      title: "Get Cash Offer", 
      description: "Receive our fair, no-obligation cash offer within 24 hours. Review it at your pace - no pressure, no hidden fees.",
      bgColor: "bg-primary",
      showArrow: true,
    },
    {
      number: "4",
      title: "Close & Get Paid",
      description: "Accept our offer and we'll handle the paperwork. Close on your timeline and get cash in your hands fast.",
      bgColor: "bg-secondary",
      showArrow: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">How Enmirex Homes Works - Simple 4 Steps</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our proven process makes selling your home fast and easy. 
            From initial contact to closing, Enmirex Homes handles everything.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center group">
              <div className="relative mb-6">
                <div className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                  <span className={`text-2xl font-bold ${step.bgColor === 'bg-secondary' ? 'text-primary' : 'text-white'}`}>{step.number}</span>
                </div>
                {step.showArrow && (
                  <div className="absolute -right-4 top-8 hidden lg:block">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => scrollToSection('get-offer')}
            className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 shadow-lg border-2 border-secondary"
          >
            Start Your Cash Offer Now
          </Button>
        </div>
      </div>
    </section>
  );
}