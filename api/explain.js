// api/explain.js

export default async function explainHandler(req, res) {
    const { transaction } = req.body;
  
    if (!transaction) {
      return res.status(400).json({ message: "Transaction data is required." });
    }
  
    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  
    // --- IMPROVED PROMPT ---
    const prompt = `
      You are a world-class blockchain security expert named ClaritySign.
      Your job is to explain a raw transaction in simple, human-readable terms.
      Analyze the following transaction and provide a clear, concise summary and a risk assessment.

      Follow these risk level guidelines STRICTLY:
      - **Low Risk**: Standard, common transactions like simple ETH/token transfers or swaps on well-known platforms. Do NOT assign medium risk just because information like the sender is missing. Assume it's a standard user interaction.
      - **Medium Risk**: Transactions that ask for broad permissions but aren't necessarily malicious, like a standard "permit" signature or interacting with a new, unverified contract. Advise caution.
      - **High Risk**: Transactions that are highly suspicious, such as asking for "unlimited approval" of all tokens, transactions with known scam addresses, or signatures that grant control over the entire wallet.
      
      Respond ONLY with a JSON object with two keys:
      1. "explanation": A plain English summary of what the transaction does.
      2. "risk": Your risk analysis, starting with the risk level.
      
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