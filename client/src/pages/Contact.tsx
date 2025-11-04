import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import SunBeams from "@/components/SunBeams";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSch78o9b6XSmqpeQz6thqp3jKid-J76tz5DoNnCRgGeHuC4iA/viewform?usp=header";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  const handleOpenForm = () => {
    window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen relative">
      <SunBeams className="opacity-10" />
      <div className="bg-gradient-to-br from-accent/30 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="text-contact-title"
          >
            Lumio Early Access & Feedback Survey
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Thank you for your interest! Fill out this survey to sign up for early access and share your feedback. Your input will help us improve and deliver a better experience.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-2xl mx-auto text-center space-y-8"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Click the button below to open the survey in a new tab. Your feedback helps us create better products for you.
            </p>
          </div>

          <Button
            size="lg"
            className="gap-2 rounded-full shadow-lg hover:shadow-xl transition-shadow text-lg px-8 py-6"
            onClick={handleOpenForm}
            data-testid="button-open-form"
          >
            <ExternalLink className="h-5 w-5" />
            Open Survey Form
          </Button>

          <div className="pt-8">
            <p className="text-sm text-muted-foreground">
              If the form doesn't open automatically,{" "}
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                click here
              </a>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
