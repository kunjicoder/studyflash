import { NextResponse } from 'next/server';
import { OpenAI } from 'openai'; // Adjust based on the package's actual export

const systemPrompt = `You are a flashcard creator. You take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards. The front should have an interesting question related to that topic. Don’t repeat similar questions. Both front and back should be one sentence long. You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}`;

export async function POST(req) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1', 
    });

    // Get the request body as text
    const data = await req.text();

    // Generate a prompt using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'llama3-8b-8192',  // Example model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data }
      ],
      response_format: { type: 'json_object' },
    });

    const flashcards = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(flashcards.flashcards);
  } catch (error) {
    console.error("Error creating flashcards:", error);
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
  }
}