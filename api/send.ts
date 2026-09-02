import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env["RESEND_API_KEY"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Bloquer les requêtes autres que POST
  if (req.method !== "POST") {
    console.error("Invalid request method:", req.method);
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { name, email, message, organisation } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs manquants" });
    }

    const organisationText = organisation ? `\nOrganisation: ${organisation}` : "";

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["techinference1@gmail.com"], // L'adresse où vous souhaitez recevoir le message
      subject: `Nouveau message de ${name}`,
      replyTo: email,
      text: `Nom: ${name}\nEmail: ${email}${organisationText}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Échec de l'envoi de l'email" });
  }
}
