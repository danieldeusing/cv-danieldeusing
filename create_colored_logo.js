const sharp = require('sharp');
const path = require('path');

// Brand primary color: #1E3A5F
const r = 0x1E; // 30
const g = 0x3A; // 58
const b = 0x5F; // 95

async function createColoredLogo() {
  const inputPath = path.join(__dirname, 'logo', 'white_D.png');
  const outputPath = path.join(__dirname, 'logo', 'primary_D.png');
  
  // Read the white logo and tint it with brand primary color
  await sharp(inputPath)
    .tint({ r, g, b })
    .toFile(outputPath);
  
  console.log('Created primary_D.png with color #1E3A5F');
}

createColoredLogo().catch(console.error);
