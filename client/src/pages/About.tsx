import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Users } from "lucide-react";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-primary/10 via-accent/30 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-testid="text-about-title"
          >
            About Lumio
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Light up your day with bold colors and premium quality.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          className="space-y-8"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4">
            <h2 className="text-3xl font-bold" data-testid="text-our-story">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Lumio was born from a simple idea: streetwear should be bold, photogenic, and full of joy. 
              We're not just making hoodies — we're creating wearable art that makes you feel confident 
              and helps you stand out in any crowd.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every Lumio hoodie is crafted with premium 350gsm brushed fleece and reinforced seams, 
              designed to be as durable as it is stylish. We believe in quality that lasts and colors 
              that pop, whether you're on a rooftop at dusk or walking city streets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Made with Love</h3>
              <p className="text-sm text-muted-foreground">
                Every hoodie is designed and quality-checked with care.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Bold & Playful</h3>
              <p className="text-sm text-muted-foreground">
                Vibrant colors and photogenic designs that make you stand out.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Community First</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands of Lumio fans rocking bold streetwear daily.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-3xl font-bold" data-testid="text-our-mission">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're on a mission to bring more color, confidence, and joy to everyday fashion. 
              Lumio is for the creators, the dreamers, and anyone who refuses to blend in. 
              We believe in premium quality at honest prices, sustainable practices, and designs 
              that make you feel unstoppable.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
