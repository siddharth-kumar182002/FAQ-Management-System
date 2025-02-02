import { Translate } from '@google-cloud/translate/build/src/v2/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Translate client with API Key
const translate = new Translate({
  key: process.env.GOOGLE_API_KEY,
});  

export const translateText = async (text, targetLang) => {
  try {
    const [translation] = await translate.translate(text, targetLang);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return null; // Fallback to English
  }
};