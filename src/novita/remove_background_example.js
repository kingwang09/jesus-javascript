require('dotenv').config();
const { removeText, removeBackground } = require('./novita.utils');
const axios = require('axios');
const { promisify } = require('util');
const fs = require('fs');

(async () => {
    const imageUrl = 'https://img.danawa.com/prod_img/500000/757/356/img/65356757_1.jpg?shrink=330:*&_v=20241209133357';
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const inputBuffer = imageResponse.data;
    
    //The base64 original image
    console.log('step1. remove text..');
    const removedTextBuffer = await removeText(inputBuffer);
    
    console.log('step2. remove background..');
    const removedBackgroundBuffer = await removeBackground(removedTextBuffer);

    console.log('step3. save image..');
    await promisify(fs.writeFile)('images/final_novita_remove_background.png', removedBackgroundBuffer);
  
    console.log('remove Text and Background completed..')
  })();