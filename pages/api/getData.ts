// pages/api/getData.ts
import type { NextApiRequest, NextApiResponse } from 'next';


const GOOGLE_APPS_SCRIPT_URL ="https://script.google.com/macros/s/AKfycbwIM35ZY7NFctz4xiiCGFEAPtcuM_CE1mfOnvsIdTwsCHhmliy0ILwjN0QmV5gyrOXR/exec"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
