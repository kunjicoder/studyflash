import { NextResponse } from "next/server";
import OpenAI from 'openai'


const systemPrompt = `You are a flashcard creator. 
${process.env.PASSAGE}. 
1. Create professional and educational flashcards that are visually appealing, concise, and easy to understand. 
2. Ensure the content is accurate, up-to-date, and relevant to the topic. 
3. Use a clear and consistent format throughout the flashcards, including headings, bullet points, and concise descriptions. 
4.Make sure to include key terms, definitions, and examples to facilitate learning and retention. 
5. Only generate 10 flashcards

Return in the following JSON format:
{
    "flashcards":[
        {
            "front": str,
            "back": str
        }
    ]
}
`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create()({
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: data },
        ],
        model: "gpt-4o",
        response_format: {type: 'json_object'},
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}