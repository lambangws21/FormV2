// pages/api/calendar.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

type CalendarEvent = {
  id: string;
  summary: string;
  start: {
    date?: string;
    dateTime?: string;
  };
  end: {
    date?: string;
    dateTime?: string;
  };
};

type CalendarResponse = {
  items: CalendarEvent[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarResponse | { error: string }>
) {
  try {
    const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    if (!credentials) {
      res.status(500).json({ error: 'Service account credentials tidak tersedia' });
      return;
    }
    const serviceAccount = JSON.parse(credentials);

    // Buat JWT client untuk autentikasi
    const auth = new google.auth.JWT(
      serviceAccount.client_email,
      undefined,
      serviceAccount.private_key.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/calendar.readonly']
    );
    await auth.authorize();

    const calendar = google.calendar({ version: 'v3', auth });
    // Kalender ID di-decode dari URL: https://calendar.google.com/calendar/u/0?cid=bGFtYmFuZ3dzMjFAZ21haWwuY29t
    // menghasilkan "lambangws21@gmail.com"
    const calendarId = 'lambangws21@gmail.com';

    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    // Transformasi data agar properti id selalu string dan tanggal tidak null
    const events: CalendarEvent[] = (response.data.items || []).map((event) => ({
      id: event.id ?? 'unknown',
      summary: event.summary || '',
      start: {
        date: event.start?.date ?? undefined,
        dateTime: event.start?.dateTime ?? undefined,
      },
      end: {
        date: event.end?.date ?? undefined,
        dateTime: event.end?.dateTime ?? undefined,
      },
    }));

    res.status(200).json({ items: events });
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data kalender' });
  }
}
