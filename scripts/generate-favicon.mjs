import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Generate the Star19 SVG based on the component logic
function generateStar19SVG(size = 32) {
  const outerRadius = size / 2;
  const innerRadius = outerRadius * 0.4;
  const centerX = outerRadius;
  const centerY = outerRadius;
  
  const points = [];
  const spikes = 19;
  
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  
  const pathData = points.join(' ');
  
  // Create SVG with transparent background
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${pathData}" fill="#FFA500" />
    </svg>
  `.trim();
  
  return svg;
}

// Generate favicon in different sizes
async function generateFavicon() {
  const sizes = [32, 16]; // Standard favicon sizes
  
  for (const size of sizes) {
    const svg = generateStar19SVG(size);
    
    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();
    
    // Save to client/public directory (Vite project structure)
    const outputPath = join(__dirname, '..', 'client', 'public', `favicon-${size}x${size}.png`);
    writeFileSync(outputPath, pngBuffer);
    console.log(`Generated ${outputPath}`);
  }
  
  // Also create a standard favicon.png (32x32) in client/public
  const svg32 = generateStar19SVG(32);
  const faviconBuffer = await sharp(Buffer.from(svg32))
    .resize(32, 32)
    .png()
    .toBuffer();
  
  const faviconPath = join(__dirname, '..', 'client', 'public', 'favicon.png');
  writeFileSync(faviconPath, faviconBuffer);
  console.log(`Generated ${faviconPath}`);
  
  // Also create favicon.ico in root and client/public for compatibility
  const icoBuffer = await sharp(Buffer.from(svg32))
    .resize(32, 32)
    .png()
    .toBuffer();
  
  const rootIcoPath = join(__dirname, '..', 'favicon.ico');
  const publicIcoPath = join(__dirname, '..', 'client', 'public', 'favicon.ico');
  writeFileSync(rootIcoPath, icoBuffer);
  writeFileSync(publicIcoPath, icoBuffer);
  console.log(`Generated ${rootIcoPath}`);
  console.log(`Generated ${publicIcoPath}`);
  
  // Create a larger icon for better quality (using 64x64 then resizing)
  const svg64 = generateStar19SVG(64);
  const iconBuffer = await sharp(Buffer.from(svg64))
    .resize(64, 64)
    .png()
    .toBuffer();
  
  // Generate icon.png in client/public folder for metadata reference
  const iconPath = join(__dirname, '..', 'client', 'public', 'icon.png');
  writeFileSync(iconPath, iconBuffer);
  console.log(`Generated ${iconPath}`);
}

generateFavicon().catch(console.error);

