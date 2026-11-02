const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Brand Icon SVG (512x512)
const brandIconSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Rounded squircle background in luxury deep wine rose -->
  <rect width="512" height="512" rx="128" fill="#7e0022" />
  
  <!-- Subtle inner gradient ring -->
  <rect x="16" y="16" width="480" height="480" rx="112" stroke="#febac4" stroke-width="4" stroke-opacity="0.3" fill="none" />
  
  <!-- Stylized Organic Pad / Petal Silhouette in blossom pink -->
  <path 
    d="M 330 140 C 375 140, 395 190, 370 235 C 350 270, 310 270, 310 240 C 310 200, 350 170, 330 140 Z" 
    fill="#febac4" 
    fill-opacity="0.9" 
  />

  <!-- Delicate Sparkle Star Accent -->
  <path 
    d="M 365 110 Q 365 130 385 130 Q 365 130 365 150 Q 365 130 345 130 Q 365 130 365 110 Z" 
    fill="#febac4" 
  />

  <!-- Majestic Serif "C" Monogram in Cream Paper -->
  <text 
    x="235" 
    y="350" 
    text-anchor="middle" 
    font-family="'Playfair Display', Georgia, 'Times New Roman', serif" 
    font-size="320" 
    font-weight="900" 
    font-style="italic"
    fill="#fdf7e7"
    letter-spacing="-10"
  >C</text>
  
  <!-- Bottom Organic Cotton Leaf flourish -->
  <circle cx="256" cy="425" r="8" fill="#febac4" />
</svg>
`;

// 2. OpenGraph Social Share Card SVG (1200x630)
const ogImageSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Cream Paper apothecary background -->
  <rect width="1200" height="630" fill="#fdf7e7" />
  
  <!-- Subtle border frame -->
  <rect x="24" y="24" width="1152" height="582" rx="32" fill="#fffdf7" stroke="#7e0022" stroke-opacity="0.15" stroke-width="2" />
  
  <!-- Soft pastel blossom corner ambient glows -->
  <circle cx="1080" cy="120" r="260" fill="#febac4" fill-opacity="0.35" />
  <circle cx="120" cy="520" r="220" fill="#fae3e5" fill-opacity="0.4" />
  
  <!-- Left Side: Content Hierarchy -->
  <!-- Top Badge Pill -->
  <g transform="translate(80, 80)">
    <rect width="360" height="38" rx="19" fill="#febac4" stroke="#7e0022" stroke-opacity="0.2" stroke-width="1.5" />
    <circle cx="22" cy="19" r="4.5" fill="#7e0022" />
    <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="900" letter-spacing="2" fill="#7e0022">A NEW KIND OF CYCLE CARE</text>
  </g>

  <!-- Giant Brand Display Serif Title -->
  <text x="80" y="220" font-family="'Playfair Display', Georgia, serif" font-size="88" font-weight="900" fill="#7e0022" letter-spacing="-3">COMFI</text>
  
  <!-- Tagline / Headline -->
  <text x="80" y="285" font-family="'Playfair Display', Georgia, serif" font-size="38" font-weight="800" fill="#d0385c" letter-spacing="-1">The Ultra-Thin Pad, Perfected.</text>
  
  <!-- Narrative description -->
  <text x="80" y="340" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#3a3a3a" opacity="0.8">Gynecologist-approved, 100% organic cotton sanitary pads.</text>
  <text x="80" y="370" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="400" fill="#3a3a3a" opacity="0.8">Engineered without bulkiness. Zero leaks. Zero irritation.</text>

  <!-- Size Chips -->
  <g transform="translate(80, 420)">
    <!-- Regular Chip -->
    <rect x="0" y="0" width="135" height="42" rx="21" fill="#fbf4de" stroke="#7e0022" stroke-opacity="0.1" stroke-width="1" />
    <text x="67" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#7e0022">Regular • 240mm</text>

    <!-- Large Chip -->
    <rect x="150" y="0" width="130" height="42" rx="21" fill="#eef1e6" stroke="#7e0022" stroke-opacity="0.1" stroke-width="1" />
    <text x="215" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#598c25">Large • 280mm</text>

    <!-- XL Chip -->
    <rect x="295" y="0" width="120" height="42" rx="21" fill="#f6e4e5" stroke="#7e0022" stroke-opacity="0.1" stroke-width="1" />
    <text x="355" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#d32737">XL • 320mm</text>

    <!-- Overnight Chip -->
    <rect x="430" y="0" width="160" height="42" rx="21" fill="#eceaef" stroke="#7e0022" stroke-opacity="0.1" stroke-width="1" />
    <text x="510" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13" font-weight="800" fill="#5f3a8c">Overnight • 360mm</text>
  </g>

  <!-- Bottom Proof Points -->
  <g transform="translate(80, 520)">
    <circle cx="6" cy="6" r="3" fill="#7e0022" />
    <text x="18" y="10" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#7e0022">100% Certified Organic Cotton</text>
    
    <circle cx="270" cy="6" r="3" fill="#7e0022" />
    <text x="282" y="10" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#7e0022">Hypoallergenic and Rash-Free</text>
    
    <circle cx="530" cy="6" r="3" fill="#7e0022" />
    <text x="542" y="10" font-family="-apple-system, sans-serif" font-size="14" font-weight="700" fill="#7e0022">Micro-Thin Fluid Lock Tech</text>
  </g>

  <!-- Right Side: Stylized Pad Visual Presentation inside circle -->
  <g transform="translate(860, 160)">
    <!-- White Circle Pedestal -->
    <circle cx="150" cy="155" r="165" fill="#ffffff" stroke="#7e0022" stroke-opacity="0.1" stroke-width="2" />
    
    <!-- Stylized Pad Illustration -->
    <!-- Wings -->
    <path d="M 105 130 C 50 130, 50 180, 105 180 Z" fill="#ffffff" stroke="#d0385c" stroke-width="3" />
    <path d="M 195 130 C 250 130, 250 180, 195 180 Z" fill="#ffffff" stroke="#d0385c" stroke-width="3" />
    
    <!-- Main Body -->
    <rect x="105" y="45" width="90" height="220" rx="45" fill="#fcfcfc" stroke="#d0385c" stroke-width="4" />
    
    <!-- Absorbent Core -->
    <rect x="120" y="65" width="60" height="180" rx="30" fill="#febac4" fill-opacity="0.3" stroke="#d0385c" stroke-width="1.5" stroke-dasharray="4 4" />
    
    <!-- Center channel line -->
    <line x1="150" y1="95" x2="150" y2="215" stroke="#d0385c" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 6" />
    
    <!-- Floating Luxury Stamp -->
    <circle cx="240" cy="240" r="50" fill="#7e0022" />
    <circle cx="240" cy="240" r="46" fill="none" stroke="#febac4" stroke-width="1.5" stroke-dasharray="3 3" />
    <text x="240" y="235" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="9" font-weight="900" fill="#febac4" letter-spacing="1">COMFI</text>
    <text x="240" y="248" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="8" font-weight="800" fill="#ffffff" letter-spacing="1">CERTIFIED</text>
  </g>
</svg>
`;

async function generate() {
  console.log("Generating brand assets...");
  
  // 1. Write SVGs
  fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), brandIconSvg);
  fs.writeFileSync(path.join(__dirname, '../app/icon.svg'), brandIconSvg);
  console.log("Saved icon.svg");

  // 2. Render PNG icons (180x180 apple icon, 512x512 app icon, 192x192 pwa icon)
  const iconBuffer = Buffer.from(brandIconSvg);
  
  await sharp(iconBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-icon.png'));
  
  await sharp(iconBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../app/apple-icon.png'));
  console.log("Saved apple-icon.png");

  await sharp(iconBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/icon-192.png'));

  await sharp(iconBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/icon-512.png'));
  console.log("Saved icon-192.png and icon-512.png");

  // 3. Render 32x32 favicon png and write as favicon.ico
  const fav32 = await sharp(iconBuffer)
    .resize(32, 32)
    .png()
    .toBuffer();

  // ICO header format for single 32x32 PNG icon
  const icoHeader = Buffer.from([
    0, 0, // Reserved
    1, 0, // Type 1 = ICO
    1, 0, // Number of images
    32,   // Width 32
    32,   // Height 32
    0,    // Color palette
    0,    // Reserved
    1, 0, // Color planes
    32, 0,// Bits per pixel
    fav32.length & 0xff, (fav32.length >> 8) & 0xff, (fav32.length >> 16) & 0xff, (fav32.length >> 24) & 0xff, // Image size
    22, 0, 0, 0 // Offset to image data (header 6 + directory entry 16 = 22)
  ]);
  const icoFile = Buffer.concat([icoHeader, fav32]);
  
  fs.writeFileSync(path.join(__dirname, '../app/favicon.ico'), icoFile);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoFile);
  console.log("Replaced app/favicon.ico and public/favicon.ico with Comfi branded favicon!");

  // 4. Render OpenGraph 1200x630 image
  const ogBuffer = Buffer.from(ogImageSvg);
  await sharp(ogBuffer)
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, '../public/og-image.png'));

  await sharp(ogBuffer)
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, '../app/opengraph-image.png'));
  console.log("Saved public/og-image.png and app/opengraph-image.png (1200x630)!");

  // 5. Delete vercel.svg and next.svg if they exist
  const vercelSvg = path.join(__dirname, '../public/vercel.svg');
  if (fs.existsSync(vercelSvg)) {
    fs.unlinkSync(vercelSvg);
    console.log("Deleted public/vercel.svg");
  }
  const nextSvg = path.join(__dirname, '../public/next.svg');
  if (fs.existsSync(nextSvg)) {
    fs.unlinkSync(nextSvg);
    console.log("Deleted public/next.svg");
  }

  console.log("All brand assets generated successfully!");
}

generate().catch(err => {
  console.error("Error generating assets:", err);
  process.exit(1);
});
