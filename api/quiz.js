const axios = require("axios");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST only" });
  }

  const { verse } = req.body;

  if (!verse) {
    return res.status(400).json({ error: "Verse missing" });
  }

  try {

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",

        messages: [
          {
            role: "system",
            content: `
You are a Bible quiz generator focused on GRACE.

RULES:
- 1 question only
- 4 options
- 1 correct answer
- DO NOT repeat the verse as answer
- Return ONLY JSON

FORMAT:
{
  "question": "",
  "options": ["A","B","C","D"],
  "answer": ""
}
`
          },
          {
            role: "user",
            content: verse
          }
        ],

        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let content = response.data.choices[0].message.content;

    // remove markdown formatting if AI adds it
    content = content.replace(/```json|```/g, "").trim();

    return res.status(200).json(JSON.parse(content));

  } catch (err) {
    return res.status(500).json({
      error: "Quiz generation failed",
      details: err.response?.data || err.message
    });
  }
};