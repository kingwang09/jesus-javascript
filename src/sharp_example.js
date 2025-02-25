const sharp = require('sharp');
const { promisify } = require('util');
const fs = require('fs');
const axios = require('axios');

const filePath = 'images/sample.jpg';
(async () => {
    const imageUrl = 'https://img.danawa.com/prod_img/500000/341/061/img/56061341_1.jpg?shrink=330:*&_v=20250203101020';
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const inputBuffer = imageResponse.data;
    //const inputBuffer = await promisify(fs.readFile)(filePath);
  
    // await promisify(fs.writeFile)('./result.jpg', outputBuffer);
    const resizedBuffer = await sharp(inputBuffer)
          .png()
          .toBuffer();
    await promisify(fs.writeFile)('images/converted_images.png', resizedBuffer);
    console.log('completed..')
})();