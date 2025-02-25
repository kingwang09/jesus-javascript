require('dotenv').config();
const sharp = require('sharp');
const { promisify } = require('util');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
(async () => {
    console.log('step1. get image url..');
    const imageUrl = 'https://img.danawa.com/prod_img/500000/808/494/img/41494808_1.jpg?shrink=330:*&_v=20241205171044';
    const inputImageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const inputImageBuffer = inputImageResponse.data;

    console.log('step2. remove text..');
    const formData = new FormData();
    //formData.append('imageFile', Buffer.from(inputImageBuffer));
    formData.append('imageFile', inputImageBuffer, 'image.jpg');
    formData.append('removeBackground', 'false');
    formData.append('referenceBox', 'originalImage');
    formData.append('textRemoval.mode', 'ai.all');
    const response = await axios.post('https://image-api.photoroom.com/v2/edit', formData, {
      headers: {
        'x-api-key': process.env.PHOTOROOM_API_KEY,
        ...formData.getHeaders(),
      },
      responseType: 'arraybuffer',
    });
    console.log('step3. save image..');
    const inputBuffer = response.data;
    fs.writeFileSync('images/result_photoroom_remove_text.png', Buffer.from(inputBuffer, 'binary'));
    
    console.log('step4. completed..');
})();