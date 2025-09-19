import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";
import renovatedHomeImage from "@assets/stock_images/renovated_modern_hom_c6d048c5.jpg";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="gradient-primary text-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Sell Your Home 
              <span className="text-secondary text-shadow-gold"> Fast for Cash</span>
            </h1>
            <p className="text-lg sm:text-xl mb-3 sm:mb-4 text-white/90">
              Get a fair cash offer in 24 hours.
              We buy homes in any condition throughout your area.
            </p>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 text-secondary font-semibold">
              — Enmirex Homes: Your Trusted Cash Home Buyer
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
              <Button 
                onClick={() => scrollToSection('get-offer')}
                style={{ backgroundColor: 'hsl(45, 100%, 50%)', color: 'hsl(218, 100%, 12%)' }}
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:opacity-90 transition-opacity shadow-lg w-full sm:w-auto"
                data-testid="button-get-cash-offer"
              >
                Get My Cash Offer Now
              </Button>
              <Button 
                variant="outline"
                asChild
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white hover:text-primary transition-colors w-full sm:w-auto"
              >
                <a href="tel:(555) 123-4567" className="flex items-center justify-center">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                  <span className="hidden xs:inline">Call </span>(555) 123-4567
                </a>
              </Button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm justify-center lg:justify-start">
              <div className="flex items-center">
                <Check className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-secondary flex-shrink-0" />
                <span>No Repairs Needed</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-secondary flex-shrink-0" />
                <span>No Agent Fees</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-secondary flex-shrink-0" />
                <span>No Hassle</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-secondary flex-shrink-0" />
                <span>Close Fast</span>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="order-first lg:order-last">
            <img 
              src={renovatedHomeImage} 
              alt="Renovated modern home exterior ready for cash purchase" 
              className="rounded-xl shadow-2xl w-full h-auto max-w-lg mx-auto lg:max-w-none" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}