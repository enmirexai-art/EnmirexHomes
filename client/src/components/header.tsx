import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import logoPath from "@assets/19_1754440880955.png";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src={logoPath} 
            alt="Enmirex Homes Logo" 
            className="h-12 w-auto"
          />
        </div>
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-white hover:text-secondary transition-colors font-medium"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-secondary transition-colors font-medium"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="text-white hover:text-secondary transition-colors font-medium"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-white hover:text-secondary transition-colors font-medium"
          >
            FAQ
          </button>
        </nav>
        <div className="flex items-center space-x-4">
          <a 
            href="tel:(555) 123-4567" 
            className="text-secondary font-bold hover:text-secondary/80 transition-colors flex items-center gap-1"
          >
            <Phone className="w-4 h-4" />
            (555) 123-4567
          </a>
          <Button 
            onClick={() => scrollToSection('get-offer')}
            className="bg-secondary text-primary hover:bg-secondary/90 font-bold"
          >
            Get Cash Offer
          </Button>
        </div>
      </div>
    </header>
  );
}