import axios from "axios";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude und Longitude fehlen" });
  }

  try {
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json`, {
      params: {
        key: apiKey,
        q: `${lat},${lon}`,
        lang: "de",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error.message);
    res.status(500).json({ error: "Fehler beim Abrufen der Wetterdaten" });
  }
}

