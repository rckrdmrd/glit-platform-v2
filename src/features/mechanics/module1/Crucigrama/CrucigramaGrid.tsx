import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CrucigramaCell } from './crucigramaTypes';
import { cn } from '@shared/utils/cn';

export interface CrucigramaGridProps {
  grid: CrucigramaCell[][];
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  onCellInput: (row: number, col: number, value: string) => void;
}

export const CrucigramaGrid: React.FC<CrucigramaGridProps> = ({
  grid,
  selectedCell,
  onCellClick,
  onCellInput
}) => {
  const cellRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    if (selectedCell) {
      const key = `${selectedCell.row}-${selectedCell.col}`;
      cellRefs.current[key]?.focus();
    }
  }, [selectedCell]);

  const handleKeyDown = (
    e: React.KeyboardEvent,
    row: number,
    col: number
  ) => {
    if (e.key === 'ArrowRight' && col < grid[0].length - 1) {
      onCellClick(row, col + 1);
    } else if (e.key === 'ArrowLeft' && col > 0) {
      onCellClick(row, col - 1);
    } else if (e.key === 'ArrowDown' && row < grid.length - 1) {
      onCellClick(row + 1, col);
    } else if (e.key === 'ArrowUp' && row > 0) {
      onCellClick(row - 1, col);
    } else if (e.key === 'Backspace') {
      onCellInput(row, col, '');
    }
  };

  return (
    <div className="inline-block bg-white p-4 rounded-lg shadow-lg">
      <div className="grid gap-px bg-gray-300 border-2 border-gray-400">
        {grid.map((rowCells, rowIndex) => (
          <div key={rowIndex} className="flex">
            {rowCells.map((cell) => {
              const key = `${cell.row}-${cell.col}`;
              const isSelected =
                selectedCell?.row === cell.row && selectedCell?.col === cell.col;

              if (cell.isBlack) {
                return (
                  <div
                    key={key}
                    className="w-10 h-10 bg-gray-800"
                  />
                );
              }

              return (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    'w-10 h-10 bg-white relative cursor-pointer',
                    isSelected && 'ring-2 ring-blue-500'
                  )}
                  onClick={() => onCellClick(cell.row, cell.col)}
                >
                  {cell.number && (
                    <span className="absolute top-0 left-0.5 text-xs font-bold text-gray-600">
                      {cell.number}
                    </span>
                  )}
                  <input
                    ref={(el) => { cellRefs.current[key] = el; }}
                    type="text"
                    maxLength={1}
                    value={cell.userInput || ''}
                    onChange={(e) =>
                      onCellInput(cell.row, cell.col, e.target.value.toUpperCase())
                    }
                    onKeyDown={(e) => handleKeyDown(e, cell.row, cell.col)}
                    className="w-full h-full text-center text-lg font-bold uppercase bg-transparent border-none outline-none"
                    style={{ caretColor: 'transparent' }}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
