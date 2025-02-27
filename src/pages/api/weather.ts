import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key missing" });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude und Longitude sind erforderlich." });
  }

  try {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=3&lang=de`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", (error as Error).message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }   
}

