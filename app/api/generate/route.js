import { NextResponse } from "next/server";
import { Groq } from "groq-sdk"; // Ensure this matches the correct import based on the SDK documentation

const systemPrompt = `You are a flashcard creator. You take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards. The front should have an interesting question related to that topic. Don't repeat similar questions. Both front and back should be one sentence long. You should return in the following JSON format:
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
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    
    const data = await req.text();  // Read the request body as text

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',  // Ensure this model is correct and available
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data }
      ],
      response_format: { type: 'json_object' },  // Ensure this format is supported and required
    });

    // Assuming the response content is a JSON string with a "flashcards" key
    const responseContent = completion.choices[0].message.content;
    const flashcards = JSON.parse(responseContent);
    
    // Ensure the returned JSON structure matches your expectations
    if (flashcards.flashcards) {
      return NextResponse.json(flashcards.flashcards);
    } else {
      throw new Error('Unexpected response format');
    }

  } catch (error) {
    console.error("Error creating flashcards:", error);
    // Provide a generic error message for the client
    return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
  }
}