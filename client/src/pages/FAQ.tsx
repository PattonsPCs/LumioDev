import { motion, useReducedMotion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const shouldReduceMotion = useReducedMotion();

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all items. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange. Items must be unworn, unwashed, and in original condition with tags attached.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. All orders over $50 ship free!",
    },
    {
      question: "What are your hoodies made of?",
      answer: "Our hoodies are crafted from premium 350gsm brushed fleece with reinforced seams. The fabric is soft, durable, and designed to maintain its vibrant color wash after wash.",
    },
    {
      question: "How do I care for my Lumio hoodie?",
      answer: "Machine wash cold with like colors. Tumble dry on low or hang dry. Do not bleach or iron directly on the print. Following these care instructions will keep your hoodie looking fresh for years.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We currently ship to the United States, Canada, UK, and Australia. International shipping rates are calculated at checkout based on your location.",
    },
    {
      question: "How do I know what size to order?",
      answer: "Check out our detailed sizing guide page for measurements and fit recommendations. Our hoodies are true to size. If you're between sizes, we recommend sizing up for a more relaxed fit.",
    },
    {
      question: "Can I track my order?",
      answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can use this to monitor your package's journey to your door.",
    },
    {
      question: "Do you restock sold-out items?",
      answer: "We restock popular items regularly! Sign up for our newsletter or follow us on social media to get notified when your favorite hoodie is back in stock.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-accent/30 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="text-faq-title"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Got questions? We've got answers.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline" data-testid={`faq-question-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
