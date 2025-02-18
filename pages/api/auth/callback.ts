import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL(req.url!, `http://${req.headers.host}`) // Gunakan req.url
  const code = url.searchParams.get("code")

  if (!code) return res.redirect("/error")

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        grant_type: "authorization_code",
      }),
    })

    const data = await response.json()

    if (data.access_token) {
      res.redirect("/dashboard")
    } else {
      res.redirect("/error")
    }
  } catch (error) {
    res.redirect("/error")
  }
}
