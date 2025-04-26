import Footer from "@/components/landing/footer";
import WhyUs from "@/components/landing/why-us";
import Pricing from "@/components/landing/pricing";
import Testimonials from "@/components/landing/testimonials";
import FAQ from "@/components/landing/faq";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import CTA from "@/components/landing/cta";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
