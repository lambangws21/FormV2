// components/Column.tsx
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Item from './Item';

interface ColumnProps {
  data: any[];
}

const Column: React.FC<ColumnProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-2 p-2 bg-white rounded shadow"
            >
              <Item item={item} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default Column;
