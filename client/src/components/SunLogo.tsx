import { motion } from "framer-motion";

interface SunLogoProps {
  className?: string;
  animate?: boolean;
  size?: number;
}

export default function SunLogo({ className = "", animate = true, size = 100 }: SunLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
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
      <g>
        <circle cx="100" cy="100" r="40" fill="#F0B429" />
        
        <path d="M 100 20 L 105 60 L 95 60 Z" fill="#F0B429" />
        <path d="M 142 29 L 135 67 L 127 62 Z" fill="#F0B429" />
        <path d="M 171 58 L 149 85 L 145 76 Z" fill="#F0B429" />
        <path d="M 180 100 L 140 100 L 140 90 Z" fill="#F0B429" />
        <path d="M 171 142 L 145 124 L 149 115 Z" fill="#F0B429" />
        <path d="M 142 171 L 127 138 L 135 133 Z" fill="#F0B429" />
        <path d="M 100 180 L 95 140 L 105 140 Z" fill="#F0B429" />
        <path d="M 58 171 L 73 138 L 65 133 Z" fill="#F0B429" />
        <path d="M 29 142 L 55 124 L 51 115 Z" fill="#F0B429" />
        <path d="M 20 100 L 60 100 L 60 90 Z" fill="#F0B429" />
        <path d="M 29 58 L 51 76 L 55 85 Z" fill="#F0B429" />
        <path d="M 58 29 L 65 62 L 73 67 Z" fill="#F0B429" />
      </g>
    </motion.svg>
  );
}
