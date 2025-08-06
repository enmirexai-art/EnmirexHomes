import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import LeadForm from "@/components/lead-form";
import PropertyShowcase from "@/components/property-showcase";
import AboutSection from "@/components/about-section";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ProcessSection />
      <LeadForm />
      <PropertyShowcase />
      <AboutSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
