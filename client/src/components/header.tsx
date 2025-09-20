import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import logoPath from "@assets/19_1754440880955.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <img
              src={logoPath}
              alt="Enmirex Homes Logo"
              className="h-12 sm:h-16 w-auto"
            />
            <div className="text-lg sm:text-2xl font-bold text-primary">
              Enmirex Homes
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-secondary transition-colors font-medium"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-secondary transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-700 hover:text-secondary transition-colors font-medium"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-secondary transition-colors font-medium"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:(469) 730-6711"
              className="text-secondary font-bold hover:text-secondary/80 transition-colors flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              (469) 730-6711
            </a>
            <Button
              onClick={() => scrollToSection("get-offer")}
              style={{
                backgroundColor: "hsl(45, 100%, 50%)",
                color: "hsl(218, 100%, 12%)",
              }}
              className="px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-bold text-base lg:text-lg hover:opacity-90 transition-opacity shadow-lg"
              data-testid="button-get-cash-offer-header"
            >
              Get Cash Offer
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="tel:(469) 730-6711"
              className="text-secondary font-bold hover:text-secondary/80 transition-colors"
              data-testid="button-call-mobile"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-secondary transition-colors p-2"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-700 hover:text-secondary transition-colors font-medium text-left"
                data-testid="link-mobile-how-it-works"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-700 hover:text-secondary transition-colors font-medium text-left"
                data-testid="link-mobile-about"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-700 hover:text-secondary transition-colors font-medium text-left"
                data-testid="link-mobile-reviews"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-gray-700 hover:text-secondary transition-colors font-medium text-left"
                data-testid="link-mobile-faq"
              >
                FAQ
              </button>
              <Button
                onClick={() => scrollToSection("get-offer")}
                style={{
                  backgroundColor: "hsl(45, 100%, 50%)",
                  color: "hsl(218, 100%, 12%)",
                }}
                className="px-6 py-3 rounded-lg font-bold text-base hover:opacity-90 transition-opacity shadow-lg w-full mt-4"
                data-testid="button-get-cash-offer-mobile"
              >
                Get Cash Offer
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
