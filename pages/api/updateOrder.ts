// pages/api/updateOrder.ts
import type { NextApiRequest, NextApiResponse } from 'next';



const GOOGLE_APPS_SCRIPT_URL ="https://script.google.com/macros/s/AKfycbwIM35ZY7NFctz4xiiCGFEAPtcuM_CE1mfOnvsIdTwsCHhmliy0ILwjN0QmV5gyrOXR/exec"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const response = await fetch('GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
      const result = await response.json();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update order' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
