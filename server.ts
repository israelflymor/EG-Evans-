/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // 1. Initialize Gemini client lazy/safely
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing');
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // 2. Health check route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // 3. AI car diagnostics API proxy using @google/genai SDK
  app.post('/api/diagnose', async (req, res) => {
    try {
      const { carYear, carMake, carModel, symptoms } = req.body;

      if (!carYear || !carMake || !carModel || !symptoms) {
        return res.status(400).json({ error: 'Missing required fields: carYear, carMake, carModel, or symptoms' });
      }

      // Check if API key is present before calling
      if (!process.env.GEMINI_API_KEY) {
        // Return a professional mock-fallback if the key is not set, or a clear message
        console.warn('GEMINI_API_KEY is not configured in this workspace yet. Providing structured expert diagnostic.');
        return res.json({
          potentialCauses: [
            {
              title: `Worn Brake Pads / Glazed Rotors`,
              probability: 'High',
              explanation: `Based on mountain driving in Dahlonega, GA, symptoms commonly point to extreme thermal wear on the brake surfaces.`,
              severity: 'Moderate'
            },
            {
              title: 'Caliper Seizure or Slide Pin Stick',
              probability: 'Medium',
              explanation: 'Overheated brakes can cause slide pin lubrication to dry out, causing persistent friction and noise.',
              severity: 'Moderate'
            }
          ],
          urgency: 'Schedule Diagnostic Soon',
          urgencyColor: 'yellow',
          estimateRange: '$180 - $450 (Parts & Labor dependent)',
          technicalExplanation: `Without an active GEMINI_API_KEY, this is our default heavy-duty brake diagnosis for vehicles operating on North Georgia slopes. Under normal operation, Gemini analyzes your exact car details (${carYear} ${carMake} ${carModel}) and symptoms ("${symptoms}") to supply real-time certified mechanical breakdowns.`,
          nextSteps: [
            'Avoid hard braking down steep descents like Highway 19/Waterloo Dr',
            'Schedule a physical brake caliper and thickness measurement at EG Evans Auto',
            'Get a comprehensive multi-point safety check'
          ]
        });
      }

      const ai = getGeminiClient();

      const userPrompt = `
        Vehicle: ${carYear} ${carMake} ${carModel}
        User Reported Symptoms: "${symptoms}"
        
        Provide a professional mechanical diagnostic analysis for this specific car and symptom list. Be realistic, accurate, and direct. Keep local North Georgia mountain driving conditions (Dahlonega terrain) in mind if relevant.
      `;

      const systemInstruction = `
        You are an elite, certified ASE Master Mechanic and shop diagnostic engineer at EG Evans Auto Services LLC.
        Your job is to analyze the user's reported car symptoms, car year, make, and model, and provide a highly accurate, professional automotive diagnostic breakdown.
        
        Respond ONLY with a valid JSON object matching this schema:
        {
          "potentialCauses": [
            {
              "title": "Standard name of the component or fault",
              "probability": "High" or "Medium" or "Low",
              "explanation": "Clear mechanical explanation of why this happens and how it relates to their symptom",
              "severity": "Critical" or "Moderate" or "Low"
            }
          ],
          "urgency": "Immediate Inspection" or "Schedule Soon" or "Monitor Carefully",
          "urgencyColor": "red" or "yellow" or "green",
          "estimateRange": "Estimated repair price range or diagnostic standard cost, e.g. '$150 - $350' or 'Standard $95 Diagnostic fee'",
          "technicalExplanation": "A short 2-3 sentence overview of the vehicle system interactions causing this issue",
          "nextSteps": [
            "Actionable warning or advice for the driver",
            "What physical checks our mechanics will perform at EG Evans Auto Services LLC"
          ]
        }
        
        Keep your advice realistic, safety-oriented, and supportive. Emphasize that a physical inspection is always required for safe driving. Do not mention that you are an AI. Speak as a seasoned mechanic.
      `;

      // Call Gemini 3.5 Flash model
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              potentialCauses: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    probability: { 
                      type: Type.STRING,
                      enum: ['High', 'Medium', 'Low']
                    },
                    explanation: { type: Type.STRING },
                    severity: { 
                      type: Type.STRING,
                      enum: ['Critical', 'Moderate', 'Low']
                    }
                  },
                  required: ['title', 'probability', 'explanation', 'severity']
                }
              },
              urgency: { type: Type.STRING },
              urgencyColor: { 
                type: Type.STRING,
                enum: ['red', 'yellow', 'green']
              },
              estimateRange: { type: Type.STRING },
              technicalExplanation: { type: Type.STRING },
              nextSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['potentialCauses', 'urgency', 'urgencyColor', 'estimateRange', 'technicalExplanation', 'nextSteps']
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error('Gemini returned an empty response');
      }

      const parsedResult = JSON.parse(responseText.trim());
      res.json(parsedResult);

    } catch (error: any) {
      console.error('Diagnostic generation error:', error);
      res.status(500).json({ 
        error: 'Engine diagnostic system error. Please contact EG Evans Auto directly for a physical inspection.',
        details: error.message 
      });
    }
  });

  // 4. Vite Dev Middleware / Static production files
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[EG EVANS AUTO SERVER] Listening on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error('[SERVER BOOT ERROR]', err);
  process.exit(1);
});
