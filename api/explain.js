export default async function handler(req, res) {
    // Get the API key from environment variables
    const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY;
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  
    // This is the fake "malicious" transaction we send to the AI
    const maliciousTransaction = {
      function: "setApprovalForAll(operator: 0x123..., approved: true)",
      contract: "0x456... (Bored Ape NFT Contract)",
    };
  
    // The master prompt that tells the AI what to do
    const prompt = `You are a world-class blockchain security expert. Your job is to explain a transaction in simple, urgent terms. Analyze the following and provide a title and a short message for a warning pop-up. Respond ONLY with a JSON object with "title" and "message" keys. Transaction: ${JSON.stringify(maliciousTransaction)}`;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      // Extract the AI's text response
      const aiResponseText = data.candidates[0].content.parts[0].text;
  
      // Clean and parse the JSON response from the AI
      const aiJson = JSON.parse(aiResponseText.replace(/```json|```/g, '').trim());
  
      // Send the parsed JSON back to the frontend
      res.status(200).json(aiJson);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ title: "Error", message: "Failed to get explanation from AI." });
    }
  }