require('dotenv').config();
const sharp = require('sharp');
const { promisify } = require('util');
const fs = require('fs');
const axios = require('axios');
const { removeText } = require('./novita.utils');

(async () => {
  const imageUrl = 'https://img.danawa.com/prod_img/500000/757/356/img/65356757_1.jpg?shrink=330:*&_v=20241209133357';
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  const inputBuffer = imageResponse.data;
  
  //file reader
  // const filePath = 'removeBG먼저.png';
  // const inputBuffer = await promisify(fs.readFile)(filePath);

  // await promisify(fs.writeFile)('./result.jpg', outputBuffer);
  // const resizedBuffer = await sharp(inputBuffer)
  //       .png()
  //       .toBuffer();
  // await promisify(fs.writeFile)('before_result.png', inputBuffer.data);
  // console.log(resizedBuffer);

  //The base64 original image
  const result = await removeText(inputBuffer);
  await promisify(fs.writeFile)('images/final_novita_remove_text.png', result);

  console.log('remove text completed..');
})();
