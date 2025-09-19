import { Phone } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Final CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Sell Your Home Fast?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your fair cash offer today. No repairs, no fees, no hassle. 
            Join hundreds of satisfied homeowners who chose the fast, easy way to sell.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button 
              onClick={() => scrollToSection('get-offer')}
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get My Cash Offer Now
            </button>
            <div className="text-center">
              <div className="text-sm text-white/70 mb-1">Or call us directly:</div>
              <a 
                href="tel:(555) 123-4567" 
                className="text-2xl font-bold text-secondary hover:text-secondary/80 transition-colors flex items-center gap-2 justify-center"
              >
                <Phone className="w-6 h-6" />
                (555) 123-4567
              </a>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-white/80">
            <div>✓ 24-Hour Response</div>
            <div>✓ No Obligation</div>
            <div>✓ Fair Cash Offers</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 text-secondary">Enmirex Homes</div>
              <p className="text-gray-300 mb-4">
                Professional real estate investors helping homeowners sell their homes fast for cash. 
                No repairs, no fees, no hassle.
              </p>
              <div className="text-lg font-semibold">Call us today:</div>
              <a 
                href="tel:(555) 123-4567" 
                className="text-yellow-400 text-xl font-bold hover:text-yellow-300 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (555) 123-4567
              </a>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button 
                    onClick={() => scrollToSection('how-it-works')}
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('get-offer')}
                    className="hover:text-white transition-colors"
                  >
                    Get Cash Offer
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('testimonials')}
                    className="hover:text-white transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">We Buy Homes In</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Any Condition</li>
                <li>Any Situation</li>
                <li>Foreclosure</li>
                <li>Inherited Properties</li>
                <li>Divorce Situations</li>
                <li>Rental Properties</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Enmirex Homes. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </>
  );
}