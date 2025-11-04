import { motion } from "framer-motion";
import { useMemo } from "react";

interface SunLogoProps {
  className?: string;
  animate?: boolean;
  size?: number;
}

// Generate 19-point star points
function generateStar19Points(size: number) {
  const outerRadius = size / 2;
  const innerRadius = outerRadius * 0.4;
  const centerX = size / 2;
  const centerY = size / 2;
  
  const points: string[] = [];
  const spikes = 19;
  
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  
  return points.join(' ');
}

export default function SunLogo({ className = "", animate = true, size = 100 }: SunLogoProps) {
  const viewBoxSize = size;
  const points = useMemo(() => generateStar19Points(viewBoxSize), [viewBoxSize]);
  
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className={className}
      animate={animate ? { rotate: 360 } : {}}
      transition={
        animate
          ? {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }
          : {}
      }
    >
      <polygon 
        points={points} 
        fill="#FFA500"
        stroke="#FFA500"
        strokeWidth="0"
      />
    </motion.svg>
  );
}
