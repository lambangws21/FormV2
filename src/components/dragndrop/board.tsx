// components/Board.tsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Column from './column';

interface BoardProps {
  index: number;
  data: any[];
}

const Board: React.FC<BoardProps> = ({ index, data }) => {
  return (
    <Droppable droppableId={`board-${index}`}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-1/3 p-2"
        >
          <Column data={data.filter((item, idx) => idx % 6 === index)} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Board;
