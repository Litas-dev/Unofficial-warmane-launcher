const pngToIco = require('png-to-ico');
const convert = pngToIco.default || pngToIco;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFile = path.resolve(__dirname, '../src/assets/logo-new-white.png');
const outputFile = path.resolve(__dirname, '../build/icon.ico');
const tempSquareFile = path.resolve(__dirname, '../build/temp_square_icon.png');

console.log(`Processing ${inputFile}...`);

async function generate() {
    try {
        // 1. Resize/Crop to Square using Sharp
        console.log("Resizing to square...");
        await sharp(inputFile)
            .resize(256, 256, {
                fit: 'contain', // Add transparent padding to make it square
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFile(tempSquareFile);
        
        console.log("Square PNG created.");

        // 2. Convert to ICO
        console.log("Converting to ICO...");
        const buf = await convert(tempSquareFile);
        fs.writeFileSync(outputFile, buf);
        console.log('Icon generated successfully at', outputFile);

        // 3. Cleanup
        fs.unlinkSync(tempSquareFile);

    } catch (err) {
        console.error("Failed:", err);
        process.exit(1);
    }
}

generate();
