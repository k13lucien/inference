import type { VercelRequest, VercelResponse } from "@vercel/node";

const apiKey = process.env["MAILBRIDGE_API_KEY"] ?? "";
const apiUrl = process.env["MAILBRIDGE_API_URL"] ?? "";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Bloquer les requêtes autres que POST
  if (req.method !== "POST") {
    console.error("Invalid request method:", req.method);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { name, email, message, organisation } = req.body;
    
    if(!process.env["MAILBRIDGE_API_KEY"]) {
      console.error("API Key is not found in environment");
      return res.status(500).json({ error: "Server configuration error" });
    }

    if(!apiUrl) {
      console.error("API URL is not found in environment");
      return res.status(500).json({ error: "Server configuration error" });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const organisationText = organisation ? `\nOrganisation: ${organisation}` : "";

    const data = await fetch(     
      apiUrl,
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": `${apiKey}`,
        Authorization: `Bearer ${process.env["MAILBRIDGE_API_KEY"]}`,
      },
      body: JSON.stringify({
      
      from: "Contact Form <onboarding@resend.dev>",
      to: ["techinference1@gmail.com"], 
      subject: `Nouveau message de ${name}`,
      replyTo: email,
      text: `Nom: ${name}\nEmail: ${email}${organisationText}\n\nMessage:\n${message}`,
    })});

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
}
