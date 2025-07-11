import { GoogleGenerativeAI } from '@google/generative-ai';
import { ParsedData } from '../types';

const API_KEY = process.env.REACT_APP_API_KEY;

if (!API_KEY) {
  throw new Error('REACT_APP_API_KEY environment variable not set.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const parseCsvWithGemini = async (csvContent: string): Promise<ParsedData> => {
  const prompt = `
You are an intelligent medical data processor. Given the following diagnostic CSV content, extract the following as JSON:
- patientName
- patientId
- testDate
- clinicName
- results: list of { testName, value, units, referenceRange }

CSV Content:
\`\`\`csv
${csvContent}
\`\`\`

Return ONLY valid JSON with no comments or explanation.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Gemini API returned an empty response.");
    }

    const parsed = JSON.parse(text);

    if (
      !parsed.patientName ||
      !parsed.patientId ||
      !parsed.testDate ||
      !parsed.clinicName ||
      !Array.isArray(parsed.results)
    ) {
      throw new Error("Incomplete data received from Gemini. Check CSV format.");
    }

    return parsed as ParsedData;
  } catch (e) {
    console.error('Error in parseCsvWithGemini:', e);
    if (e instanceof SyntaxError) {
      throw new Error('Failed to parse JSON from Gemini response.');
    }
    throw e instanceof Error ? e : new Error('Unexpected error during Gemini parsing.');
  }
};