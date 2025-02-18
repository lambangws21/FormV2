// app/api/auth/callback/route.ts
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code) return NextResponse.redirect("/error")

  try {
    // Tukarkan 'code' dengan access token
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
      // Simpan token atau set cookies/session
      return NextResponse.redirect("/dashboard")
    } else {
      return NextResponse.redirect("/error")
    }
  } catch (error) {
    return NextResponse.redirect("/error")
  }
}
