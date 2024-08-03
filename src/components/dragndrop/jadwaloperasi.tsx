// components/JadwalOperasi.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import type { NextPage } from 'next';
import Board from './board';

interface Operasi {
  id: string;
  ok: string;
  unit: string;
  jaminan: string;
  anestesi: string;
  tindakan: string;
  operator: string;
  perawat: string;
  waktu: string;
}

const JadwalOperasi: NextPage = () => {
  const [data, setData] = useState<Operasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (result.data) {
          setData(result.data);
        } else {
          setError('No data found');
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);

    fetch('/api/updateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {Array.from({ length: 6 }, (_, i) => (
            <Board key={i} index={i} data={data} />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default JadwalOperasi;
