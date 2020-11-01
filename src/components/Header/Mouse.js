import React, {useEffect, useRef} from 'react';

const Mouse = ({squareSize, gridOffset, activeCell, setActiveCell, children}) => {
  const container = useRef(null);

  // Get the cell coordinate based on a position.
  const getNearestCellCoordinate = position => (Math.round(position / squareSize) - 1) * squareSize + gridOffset;

  // Set the active cell based on given position.
  const handleCellChange = (x,y) => {
    const left = getNearestCellCoordinate(x);
    const top = getNearestCellCoordinate(y);

    if (left !== activeCell[0] || top !== activeCell[1]) {
      setActiveCell([left, top]);
    }
  };

  const handleMouseMove = e => {
    e.persist();
    window.requestAnimationFrame(() => {
      const x = e.clientX;
      const y = e.clientY;
      handleCellChange(x, y);
    })
  };

  return (
    <div ref={container} style={{height: '100%'}} onMouseMove={handleMouseMove}>
      {children}
    </div>
  )
};

export default Mouse;
