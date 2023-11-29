import axios from 'axios';

export const isConfigured = () => {
  return process.env.AZURE_IMAGE_GENERATION_KEY && process.env.AZURE_IMAGE_GENERATION_ENDPOINT;
};

export const generateImage = async (text) => {
  const response = await axios.post('https://api.openai.com/v1/dalle2/generate', {
    text: text
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_AZURE_OPENAI_KEY}`
    }
  });

  return response.data.image_url;
};