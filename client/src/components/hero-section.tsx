import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gradient-primary text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Sell Your House 
              <span className="text-yellow-300">Fast for Cash</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Get a fair cash offer in 24 hours. No repairs, no fees, no hassle. 
              We buy houses in any condition throughout your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('get-offer')}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
              >
                Get My Cash Offer Now
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-colors"
              >
                <a href="tel:(555) 123-4567">
                  <Phone className="w-5 h-5 mr-2" />
                  Call (555) 123-4567
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-400" />
                No Repairs Needed
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-400" />
                No Agent Fees
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-green-400" />
                Close Fast
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=800" 
              alt="Beautiful modern house exterior" 
              className="rounded-xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
