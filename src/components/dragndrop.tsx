"use client";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Operasi {
  ok: string;
  unit: string;
  jaminan: string;
  anestesi: string;
  tindakan: string;
  operator: string;
  perawat: string;
}

const reorder = (list: Operasi[], startIndex: number, endIndex: number): Operasi[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  padding: 16,
  margin: `0 0 8px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  width: "100%"
});

const JadwalOperasi = () => {
  const [data, setData] = useState<Operasi[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://script.googleusercontent.com/macros/echo?user_content_key=DkkvJ90wbJSD2f4H9EaAiJOX-cxR-e-63hAnQWmNpayyDqiBBDq09q-XHYcnshYWRPlbtA1gzZvkD4N-UGzTNv0DJs8RKiXtm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnIVDya24KwKMU2SMlhduOzU1fUPr-abTl4Vma9v-srkKuehCbE3DCY84O8sNIeDfwutK7Bo0PN7kSG3qBpBCnqgGLks4n3uHlA&lib=M0KnaNP4XUQ2R9hBxHd3wsod9O8po_Gmo"
      );
      const result = await response.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(data, result.source.index, result.destination.index);
    setData(items);
  };

  return (
    <div className="container mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <table
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="min-w-full divide-y divide-gray-200 text-black p-2"
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OK
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jaminan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anestesi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tindakan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Operator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Perawat
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                  <Draggable key={row.ok} draggableId={row.ok} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="hover:bg-gray-100"
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-nowrap">
                          {row.ok}
                        </td>
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-nowrap">
                          {row.unit}
                        </td>
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-nowrap">
                          {row.jaminan}
                        </td>
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-nowrap">
                          {row.anestesi}
                        </td>
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-wrap">
                          {row.tindakan}
                        </td>
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-nowrap">
                          {row.operator}
                        </td>
                        <td className="px-6 text-start font-normal capitalize indent-2 py-4 whitespace-nowrap">
                          {row.perawat}
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default JadwalOperasi;
