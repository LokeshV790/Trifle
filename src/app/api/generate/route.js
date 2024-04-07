import { GoogleGenerativeAI } from "@google/generative-ai";

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 1000,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

export async function POST(req) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig: generationConfig,
    });
    const data = await req.json();

    const parts = [
      {
        text: ` you are an AI developer with capablity to think like a human who can generate a project idea that can be software or hardware or anything depending on the situation in the format, give priority to situtions,software solutions (project title, objectives, outcomes) based on a given situation, outlining the primary goal, secondary objectives, and expected results about the situation \"${data.query}\"`,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
    });
    const response = await result.response;
    const text = response.text();
   

    return Response.json({ status: 201, response: text });
  } catch (error) {
    console.log(error);
    return Response.json({ status: 404 });
  }
}
