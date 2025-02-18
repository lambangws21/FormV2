// pages/calendar.tsx
import React from 'react';
import useSWR from 'swr';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface CalendarEvent {
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
}

interface CalendarResponse {
  items: CalendarEvent[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Daftar warna untuk badge
const badgeColors = [
  'bg-blue-400',
  'bg-green-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-purple-400',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-teal-500',
];

// Fungsi untuk memotong summary menjadi maksimal 8 kata
const truncateSummary = (summary: string, wordLimit: number): string => {
  const words = summary.split(' ');
  if (words.length <= wordLimit) return summary;
  return words.slice(0, wordLimit).join(' ') + '...';
};

export default function CalendarPage() {
  const { data, error } = useSWR<CalendarResponse>('/api/calendar', fetcher);

  if (error) return <div>Terjadi kesalahan saat memuat data kalender.</div>;
  if (!data) return <div>Memuat...</div>;

  const events = data.items;
  const visibleEvents = events.slice(0, 10);
  const hiddenEvents = events.slice(10);

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-4">Kalender Saya</div>
      {/* Pada mobile, susun secara vertikal, dan secara horizontal pada layar medium ke atas */}
      <div className="flex flex-col md:flex-row items-start gap-4 w-full">
        {/* Komponen Kalender - dibungkus agar terpusat */}
        <div className="flex w-[400px] justify-center md:w-auto">
          <Calendar />
        </div>

        {/* Daftar Event */}
        <ul className="flex-1 mt-0 space-y-1">
          {visibleEvents.map((event, index) => {
            const alignmentClass = index % 2 === 0 ? 'justify-start' : 'justify-end';
            const badgeColor = badgeColors[index % badgeColors.length];
            const eventDateStr = event.start.dateTime || event.start.date;
            const eventDay = eventDateStr ? new Date(eventDateStr).getDate() : '-';
            const isTruncated = event.summary.split(' ').length > 3;
            const displaySummary = truncateSummary(event.summary, 3);

            return (
              <li key={event.id} className={`flex ${alignmentClass} w-96  md:w-auto justify-center`}>
                <Collapsible>
                  <div className="relative inline-block">
                    <CollapsibleTrigger asChild>
                      {/* Gunakan lebar responsif: w-36 pada mobile, w-30 pada md ke atas */}
                      <Badge
                        className={`w-44 md:w-30 h-6 flex items-center text-right justify-center ${badgeColor} text-white rounded-xl text-xs cursor-pointer`}
                      >
                        <div className="flex items-center gap-1">
                          {/* Lingkaran tanggal */}
                          <div className="w-4 h-4 rounded-full p-2 flex items-center justify-center bg-white text-black text-xs font-light animate-pulse">
                            <div className="text-[9px]">{eventDay}</div>
                          </div>
                          <div className="truncate text-xs">{displaySummary}</div>
                        </div>
                      </Badge>
                    </CollapsibleTrigger>
                    {/* CollapsibleContent muncul ke atas trigger, dengan lebar responsif */}
                    <CollapsibleContent className="w-44 md:w-44 absolute bottom-full left-0 ">
                      <div className="mt-2 p-2 border rounded bg-white">
                        {isTruncated && (
                          <div className="text-xs">
                            <div className="font-bold">Detail:</div>
                            {event.summary}
                          </div>
                        )}
                        <div className="text-xs">
                          <div className="font-bold">Mulai:</div>
                          {new Date(
                            event.start.dateTime || event.start.date || ''
                          ).toLocaleString()}
                        </div>
                        <div className="text-xs">
                          <div className="font-bold">Berakhir:</div>
                          {new Date(
                            event.end.dateTime || event.end.date || ''
                          ).toLocaleString()}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </li>
            );
          })}

          {hiddenEvents.length > 0 && (
            <li className="flex justify-center">
              <Collapsible>
                <div className="relative inline-block">
                  <CollapsibleTrigger asChild>
                    <Badge className="w-44 md:w-30 h-6 flex items-center justify-center bg-gray-700 text-white rounded-xl text-xs cursor-pointer">
                      <div className="truncate text-xs font-thin">Show More</div>
                    </Badge>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="w-44 md:w-30 absolute bottom-full left-0">
                    <ul className="space-y-0">
                      {hiddenEvents.map((event, index) => {
                        const overallIndex = index + 10;
                        const alignmentClass =
                          overallIndex % 2 === 0 ? 'justify-start' : 'justify-end';
                        const badgeColor = badgeColors[overallIndex % badgeColors.length];
                        const eventDateStr = event.start.dateTime || event.start.date;
                        const eventDay = eventDateStr ? new Date(eventDateStr).getDate() : '-';
                        const isTruncated = event.summary.split(' ').length > 8;
                        const displaySummary = truncateSummary(event.summary, 8);

                        return (
                          <li key={event.id} className={`flex ${alignmentClass}`}>
                            <Badge
                              className={`w-44 md:w-30 h-6 flex items-center justify-center ${badgeColor} text-white rounded-xl text-xs`}
                            >
                              <div className="flex items-center gap-1">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center bg-white text-black text-xs font-light">
                                  {eventDay}
                                </div>
                                <div className="truncate">{displaySummary}</div>
                              </div>
                            </Badge>
                          </li>
                        );
                      })}
                    </ul>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
