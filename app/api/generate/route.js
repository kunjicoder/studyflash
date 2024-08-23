import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt = `You are a flashcard creator. 
1. Create professional and educational flashcards that are visually appealing, concise, and easy to understand. 
2. Ensure the content is accurate, up-to-date, and relevant to the topic. 
3. Use a clear and consistent format throughout the flashcards, including headings, bullet points, and concise descriptions. 
4. Make sure to include key terms, definitions, and examples to facilitate learning and retention. 
5. Only generate 10 flashcards
Return in the following format:
Here are 10 flashcards:

1. Front: [Front content]
   Back: [Back content]

2. Front: [Front content]
   Back: [Back content]

[and so on for all 10 flashcards]`;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function parseFlashcards(content) {
  const flashcards = [];
  const regex = /(\d+)\.\s*Front:\s*([\s\S]*?)\s*Back:\s*([\s\S]*?)(?=\n\d+\.|\n*$)/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    flashcards.push({
      front: match[2].trim(),
      back: match[3].trim()
    });
  }

  return flashcards;
}

export async function POST(req) {
  try {
    const data = await req.text();
    console.log("Received data:", data);  // Log the received data

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: data },
      ],
      model: 'llama3-70b-8192',
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    console.log("Groq response:", completion);  // Log the full response

    const flashcards = parseFlashcards(completion.choices[0].message.content);
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error in generate API:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error.response) {
      errorMessage = error.response.data.error.message;
      console.error('Groq API error response:', error.response.data);
    } else if (error.message) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}