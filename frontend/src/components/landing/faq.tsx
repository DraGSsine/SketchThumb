import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is scrive free to use?",
      answer: "scrive offers affordable paid plans starting at $9.99 for 20 thumbnail generations."
    },
    {
      question: "What types of sketches work best?",
      answer: "You can upload any sketch type - hand-drawn on paper, digital drawings, or even rough concept art. For best results, ensure your sketch has clear outlines with good contrast."
    },
    {
      question: "How long does it take to generate a thumbnail from my sketch?",
      answer: "Most thumbnails are generated within 10-30 seconds, depending on the complexity of your sketch and current system load. Premium plans receive priority processing."
    },
    {
      question: "Can I make adjustments to the generated thumbnail?",
      answer: "Yes! You can generate multiple variations of your thumbnail, and with paid plans, you can fine-tune specific elements like colors, text, and layout."
    },
    {
      question: "What file formats do you support for uploads and downloads?",
      answer: "We accept JPG, PNG, SVG, and BMP files for your sketches. Generated thumbnails can be downloaded in high-resolution JPG and PNG formats."
    },
    {
      question: "Do you offer thumbnails for specific platforms like YouTube, Instagram, etc?",
      answer: "Yes! We provide optimized thumbnail dimensions for all major platforms including YouTube, Instagram, Facebook, TikTok, and blog thumbnails."
    },
    {
      question: "Is there a limit to how many sketches I can convert?",
      answer: "The number of conversions depends on your plan. Our Basic plan includes 20 thumbnails, Standard includes 50 thumbnails, and Premium includes 100 thumbnails."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your credits until they are used up."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-gradient-to-b from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-24 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-slate-900 dark:text-white tracking-tight">
            Frequently Asked <span className="text-blue-600 dark:text-blue-400 relative inline-block">
              Questions
              <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-200 dark:bg-blue-800/50 -z-10 rounded-full transform translate-y-1/2"></span>
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-slate-700 dark:text-slate-300">
            Find answers to common questions about our AI thumbnail generator.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 shadow-slate-200/50 dark:shadow-black/20 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border-b border-slate-200 dark:border-slate-700 last:border-0"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4 px-6 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-slate-700 dark:text-slate-300 pb-4 px-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;