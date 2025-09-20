import { Phone } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Sell Your Home Fast?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Get your fair cash offer today. No repairs, no fees, no hassle. Join
            hundreds of satisfied homeowners who chose the fast, easy way to
            sell.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-8">
            <button
              onClick={() => scrollToSection("get-offer")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:opacity-90 transition-opacity shadow-lg"
              style={{
                backgroundColor: "hsl(45, 100%, 50%)",
                color: "hsl(218, 100%, 12%)",
              }}
              data-testid="button-get-cash-offer-footer"
            >
              Get My Cash Offer Now
            </button>
            <div className="text-center">
              <div className="text-xs sm:text-sm text-white/70 mb-1">
                Or call us directly:
              </div>
              <a
                href="tel:(469) 730-6711"
                className="text-lg sm:text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors flex items-center gap-2 justify-center"
              >
                <Phone className="w-5 sm:w-6 h-5 sm:h-6" />
                (469) 730-6711
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 text-xs sm:text-sm text-white/80">
            <div>✓ 24-Hour Response</div>
            <div>✓ No Obligation</div>
            <div>✓ Fair Cash Offers</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-white py-8 sm:py-12"
        style={{ backgroundColor: "hsl(218, 100%, 12%)" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-secondary">
                Enmirex Homes
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4">
                Professional real estate investors helping homeowners sell their
                homes fast for cash. No repairs, no fees, no hassle.
              </p>
              <div className="text-base sm:text-lg font-semibold">
                Call us today:
              </div>
              <a
                href="tel:(469) 730-6711"
                className="text-yellow-400 text-lg sm:text-xl font-bold hover:text-yellow-300 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
                (469) 730-6711
              </a>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>
                  <button
                    onClick={() => scrollToSection("how-it-works")}
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("get-offer")}
                    className="hover:text-white transition-colors"
                  >
                    Get Cash Offer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonials")}
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faq")}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                We Buy Homes In
              </h3>
              <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                <li>Any Condition</li>
                <li>Any Situation</li>
                <li>Foreclosure</li>
                <li>Inherited Properties</li>
                <li>Divorce Situations</li>
                <li>Rental Properties</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>
              &copy; 2024 Enmirex Homes. All rights reserved. | Privacy Policy |
              Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
