import type { NextApiRequest, NextApiResponse } from 'next';

// URL dari Web App Google Apps Script Anda
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4yCjfcHVTHxugqGfy8cmhQs0in9qnrQv_DFpruPXpSzftAuZ7x9xPheihOSfd1C-UHw/exec';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const result = await response.json();

      if (result.status === 'success') {
        res.status(200).json({ message: 'Form submitted successfully' });
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
