// api/explainContract.js

export default async function explainContractHandler(req, res) {
    const { contractAddress } = req.body;
  
    if (!contractAddress) {
      return res.status(400).json({ message: "Contract address is required." });
    }
  
    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  
    const prompt = `
      You are a world-class blockchain security expert named ClaritySign. 
      Your job is to analyze a smart contract from its address and explain its potential risks.
      Please provide a summary for the contract at the following address: ${contractAddress}.
      
      Respond ONLY with a JSON object with three keys:
      1. "whoCanCall": A summary of the contract's function permissions.
      2. "adminPowers": A description of any special powers the contract owner has.
      3. "rugPullRisks": An analysis of any potential "rug-pull" risks or other vulnerabilities.
      
      Contract Address: ${contractAddress}
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
        whoCanCall: "Error analyzing contract.",
        adminPowers: "Could not retrieve admin power details.",
        rugPullRisks: "An error occurred while communicating with the AI service."
      });
    }
  }