import { NextApiRequest, NextApiResponse } from "next";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfAsTlF41fC3iOwK2d5vxMv0jdoQy5gNcy5fyP8U71q5FUZ86nyFfvYRXSNe8tqkEQZg/exec";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(APPS_SCRIPT_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
