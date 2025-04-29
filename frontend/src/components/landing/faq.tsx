import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is SketchThumb AI free to use?",
      answer: "SketchThumb offers affordable paid plans starting at $9.99/week for 20 image conversions."
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
      answer: "The number of conversions depends on your plan. Our Weekly plan includes 20 images per week, the Starter plan includes 50 images per month, and the Growth plan includes 100 images per month."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to your plan until the end of your current billing period."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-20 bg-blue-50 dark:bg-blue-950/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Find answers to common questions about our AI thumbnail generator.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-300 dark:border-gray-700 last:border-0">
                <AccordionTrigger className="text-left text-base md:text-lg font-medium py-4 text-gray-800 dark:text-gray-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-gray-600 dark:text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;