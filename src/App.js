import React, { useEffect, useState } from 'react';
import { analyzeImage, isConfigured as isImageAnalysisConfigured } from './azure-image-analysis';
import { generateImage, isConfigured as isImageGenerationConfigured } from './azure-image-generation';

function App() {
  const [promptText, setPromptText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isConfigured = isImageGenerationConfigured() && isImageAnalysisConfigured();

  useEffect(() => {
    if (!isConfigured) {
      console.log('La aplicación no está configurada correctamente. Por favor, configure las variables de entorno necesarias.');
    }
  }, [isConfigured]);

  const handleImageAnalysis = async () => {
    setIsLoading(true);
    try {
      const imageUrl = await generateImage(promptText);
      setImageUrl(imageUrl);
      const result = await analyzeImage(imageUrl);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error in image analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleImageGeneration = async () => {
    setIsLoading(true);
    try {
      const generatedImageUrl = await generateImage(promptText);
      setImageUrl(generatedImageUrl);
    } catch (error) {
      console.error('Error in image generation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!isConfigured && <p>Key and/or endpoint not configured for cognitive services</p>}
      {isConfigured && (
        <>
          <h1>Computer vision</h1>
          <p>Insert URL or type prompt:</p>
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="Introduce la URL de la imagen"
          />
          <br />
          <button onClick={handleImageAnalysis}>Analyze image</button>
          <button onClick={handleImageGeneration}>Generate image</button>
        </>
      )}
      {isLoading && <p>Analizando imagen...</p>}
      {analysisResult && <DisplayResults result={analysisResult} imageUrl={imageUrl} />}
    </div>
  );
}

const DisplayResults = ({ result, imageUrl }) => {
  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
};

export default App;