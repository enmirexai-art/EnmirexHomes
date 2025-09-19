import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";
import renovatedHomeImage from "@assets/image_1758244460533.png";

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
              Sell Your Home 
              <span className="text-secondary text-shadow-gold">Fast for Cash</span>
            </h1>
            <p className="text-xl mb-4 text-white/90">
              Get a fair cash offer in 24 hours. No repairs, no fees, no hassle. 
              We buy homes in any condition throughout your area.
            </p>
            <p className="text-lg mb-8 text-secondary font-semibold">
              — Enmirex Homes: Your Trusted Cash Home Buyer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={() => scrollToSection('get-offer')}
                style={{ backgroundColor: 'hsl(45, 100%, 50%)', color: 'hsl(218, 100%, 12%)' }}
                className="px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg"
                data-testid="button-get-cash-offer"
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
                <Check className="w-5 h-5 mr-2 text-secondary" />
                No Repairs Needed
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-secondary" />
                No Agent Fees
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 mr-2 text-secondary" />
                Close Fast
              </div>
            </div>
          </div>
          <div>
            <img 
              src={renovatedHomeImage} 
              alt="Texas renovated home exterior ready for cash purchase" 
              className="rounded-xl shadow-2xl w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}