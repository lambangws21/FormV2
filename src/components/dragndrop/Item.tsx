// components/Item.tsx
import React from 'react';

interface ItemProps {
  item: {
    id: string;
    ok: string;
    unit: string;
    jaminan: string;
    anestesi: string;
    tindakan: string;
    operator: string;
    perawat: string;
    waktu: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <div>
      <p><strong>NoRM:</strong> {item.id}</p>
      <p><strong>OK:</strong> {item.ok}</p>
      <p><strong>Unit:</strong> {item.unit}</p>
      <p><strong>Jaminan:</strong> {item.jaminan}</p>
      <p><strong>Anestesi:</strong> {item.anestesi}</p>
      <p><strong>Tindakan:</strong> {item.tindakan}</p>
      <p><strong>Operator:</strong> {item.operator}</p>
      <p><strong>Perawat:</strong> {item.perawat}</p>
      <p><strong>Waktu:</strong> {item.waktu}</p>
    </div>
  );
};

export default Item;
