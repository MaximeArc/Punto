import React from 'react'

const renderGrid = () => {
  const cells = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      cells.push(<div key={`${row}-${col}`} className="grid-cell"></div>);
    }
  }
  return cells;
};

export default renderGrid;