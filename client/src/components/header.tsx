import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-primary">Enmirex Homes</div>
        </div>
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('how-it-works')}
            className="text-gray-700 hover:text-primary transition-colors"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-gray-700 hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className="text-gray-700 hover:text-primary transition-colors"
          >
            Reviews
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className="text-gray-700 hover:text-primary transition-colors"
          >
            FAQ
          </button>
        </nav>
        <div className="flex items-center space-x-4">
          <a 
            href="tel:(555) 123-4567" 
            className="text-primary font-semibold hover:text-primary/80 transition-colors flex items-center gap-1"
          >
            <Phone className="w-4 h-4" />
            (555) 123-4567
          </a>
          <Button 
            onClick={() => scrollToSection('get-offer')}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Get Cash Offer
          </Button>
        </div>
      </div>
    </header>
  );
}