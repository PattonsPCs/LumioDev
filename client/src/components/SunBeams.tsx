import { motion } from "framer-motion";

interface SunBeamsProps {
  className?: string;
}

export default function SunBeams({ className = "" }: SunBeamsProps) {
  const beams = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {beams.map((index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 w-1 h-24 bg-gradient-to-t from-transparent via-primary/30 to-transparent origin-bottom"
          style={{
            transform: `rotate(${index * 30}deg) translateY(-50%)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
