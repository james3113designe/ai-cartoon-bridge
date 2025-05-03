export default async function handler(req, res) {
  try {
    const { imagePrompt } = req.body;
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: imagePrompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const data = await response.json();

    if (data?.data?.[0]?.url) {
      res.status(200).json({ output_url: data.data[0].url });
    } else {
      console.error("OpenAI antwoord:", data);
      res.status(500).json({ error: "AI afbeelding kon niet worden gegenereerd." });
    }
  } catch (error) {
    console.error("Fout in generate.js:", error);
    res.status(500).json({ error: "Interne serverfout." });
  }
}
