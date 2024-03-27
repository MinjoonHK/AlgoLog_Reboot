import OpenAI from "openai";

export default async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (req.method === "POST") {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          // 시스템 fine tuning
          role: "system",
          content: `you are korean assistant for solving algorithm solutions, 
              so you need to answer every question in korean,
              you need to provide the solution for questions and show one possible counter example. do not start with sure!`,
        },
        {
          // 유저 인풋
          role: "user",
          content: req.body.message,
        },
      ],
      temperature: 0,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (response) {
      return res.status(200).json({ response: response, status: "success" });
    }
  }
};
