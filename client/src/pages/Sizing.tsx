import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function Sizing() {
  const shouldReduceMotion = useReducedMotion();

  const sizeChart = [
    { size: "XS", chest: "34-36", length: "26", sleeve: "32" },
    { size: "S", chest: "36-38", length: "27", sleeve: "33" },
    { size: "M", chest: "38-40", length: "28", sleeve: "34" },
    { size: "L", chest: "40-42", length: "29", sleeve: "35" },
    { size: "XL", chest: "42-44", length: "30", sleeve: "36" },
    { size: "XXL", chest: "44-46", length: "31", sleeve: "37" },
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
            data-testid="text-sizing-title"
          >
            Sizing Guide
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find your perfect fit with our detailed size chart and measurement tips.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-12">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-size-chart">Size Chart (inches)</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Size</th>
                      <th className="text-left p-3 font-semibold">Chest Width</th>
                      <th className="text-left p-3 font-semibold">Length</th>
                      <th className="text-left p-3 font-semibold">Sleeve Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row) => (
                      <tr key={row.size} className="border-b hover-elevate">
                        <td className="p-3 font-semibold" data-testid={`size-${row.size.toLowerCase()}`}>
                          {row.size}
                        </td>
                        <td className="p-3 text-muted-foreground">{row.chest}</td>
                        <td className="p-3 text-muted-foreground">{row.length}</td>
                        <td className="p-3 text-muted-foreground">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">How to Measure</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.
                </p>
                <p>
                  <strong className="text-foreground">Length:</strong> Measure from the highest point of the shoulder to the bottom hem.
                </p>
                <p>
                  <strong className="text-foreground">Sleeve:</strong> Measure from the center back of the neck to the end of the sleeve.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Fit Guide</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  Our hoodies are designed for a relaxed, comfortable fit. If you prefer a more oversized look, 
                  we recommend sizing up. All measurements are approximate and may vary by up to 1 inch.
                </p>
                <p>
                  <strong className="text-foreground">True to size:</strong> Most customers find our sizing accurate. Order your usual size for the perfect fit.
                </p>
                <p>
                  <strong className="text-foreground">Between sizes?</strong> We recommend sizing up for a more relaxed, streetwear-style fit.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
