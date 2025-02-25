require('dotenv').config();
const { promisify } = require('util');
const fs = require('fs');
const convert = require('heic-convert');
const sharp = require('sharp');
const filePath = 'images/IMG_0574.HEIC';
(async () => {
  const inputBuffer = await promisify(fs.readFile)(filePath);
  const outputBuffer = await convert({
    buffer: inputBuffer, // the HEIC file buffer
    format: 'JPEG',      // output format
    quality: 1           // the jpeg compression quality, between 0 and 1
  });

  await promisify(fs.writeFile)('images/heic_converted_result.jpg', outputBuffer);
  sharp(outputBuffer)
        .resize(320, 240)
        .toFile('images/heic_converted_result_resize_result.jpg', (err, info) => {
            console.log('resize: ', info);
            if(err){
                console.error('error: ', err);
            }
        });
})();