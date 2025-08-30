// api/explain.js

// This function is now exported to be used by our Express server
export default async function explainHandler(req, res) {
    const { transaction } = req.body;
  
    if (!transaction) {
      return res.status(400).json({ message: "Transaction data is required." });
    }
  
    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  
    const prompt = `
      You are a world-class blockchain security expert named ClaritySign.
      Your job is to explain a raw transaction in simple, human-readable terms.
      Analyze the following transaction and provide a clear, concise summary and a risk assessment.
      
      Respond ONLY with a JSON object with two keys:
      1. "explanation": A plain English summary of what the transaction does.
      2. "risk": A risk analysis, starting with a risk level (e.g., "High Risk," "Low Risk," "Informational").
      
      Transaction to analyze: 
      ${JSON.stringify(transaction)}
    `;
  
    try {
      const apiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });
  
      if (!apiResponse.ok) {
        const errorBody = await apiResponse.text();
        console.error("API Error:", errorBody);
        throw new Error(`API call failed with status: ${apiResponse.status}`);
      }
  
      const data = await apiResponse.json();
      const aiResponseText = data.candidates[0].content.parts[0].text;
      const aiJson = JSON.parse(aiResponseText.replace(/```json|```/g, '').trim());
  
      res.status(200).json(aiJson);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        explanation: "Could not analyze the transaction.",
        risk: "An error occurred while communicating with the AI service."
      });
    }
  }