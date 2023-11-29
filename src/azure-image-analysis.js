import axios from 'axios';

const subscriptionKey = process.env.AZURE_IMAGE_ANALYSIS_KEY;
const endpoint = process.env.AZURE_IMAGE_ANALYSIS_ENDPOINT;

export const analyzeImage = async (imageUrl) => {
  const features = 'Categories,Description,Color';
  const apiUrl = `${endpoint}/vision/v4.0/analyze?visualFeatures=${features}`;

  try {
    const response = await axios.post(apiUrl, { url: imageUrl }, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in Azure Image Analysis API:', error);
    throw error;
  }
};

export const isConfigured = () => {
  return subscriptionKey && endpoint;
};