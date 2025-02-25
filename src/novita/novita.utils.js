const axios = require('axios');

async function removeText(imageBuffer) {
  const base64String = imageBuffer.toString('base64');

  const response = await axios.post('https://api.novita.ai/v3/remove-text', {
    image_file: base64String,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.NOVITA_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const result = Buffer.from(response.data.image_file, 'base64');
  return result;
}

async function removeBackground(imageBuffer) {
  const base64String = imageBuffer.toString('base64');

  const response = await axios.post('https://api.novita.ai/v3/remove-background', {
    image_file: base64String,
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.NOVITA_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const result = Buffer.from(response.data.image_file, 'base64');
  return result;
}

module.exports = {
  removeText,
  removeBackground,
};
