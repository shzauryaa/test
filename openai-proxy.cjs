const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body; // [{role: 'user', content: '...'}, ...]
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });
    res.json(completion.choices[0].message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`OpenAI proxy running on port ${PORT}`)); 
