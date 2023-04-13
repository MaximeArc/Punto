import React, {useEffect, useState} from 'react'
import "../css/App.css";
import Card from "./Card";


const Grid = ({cards, socket, user, setTurn}) => {

    const [grid, setGrid] = useState([]);

    socket.once('gameOver',() => {
        setGrid([])
    })

    socket.on('initialState', async () => {
        await fetchInitialGrid();
    });

    socket.once('yourTurn', async (player) => {
        await setTurn(player.name);
        socket.off('yourTurn');
    })

    socket.on('gameState', (newGameBoard) => {
        setGrid(newGameBoard);
    });

    const fetchInitialGrid = async () => {
        const res = await fetch(`http://localhost:8080/api/boards/`);
        const json = await res.json();
        const updatedGrid = json.grid.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                cell === 'free' ? <div className="free-cell" key={`${rowIndex}-${colIndex}`} /> : cell
            )
        );
        setGrid(updatedGrid)
    };

    const isFree = (x, y) => {
        return grid[x][y]?.props?.className === `free-cell`
    }

    const isNull = (x, y) => {
        if(x >= 0 && y >= 0 && x < 11)
            return grid[x][y] === null;
    }

    const isLocked = (x, y) => {
        return grid[x][y]?.props?.className === `locked-cell`
    }

    const setFreeCells = (x, y) => {
        let cells = [];
        [-1, 0, 1].map((i) => {
            [-1, 0, 1].map((j) => {
                cells.push({x: x + j, y: y + i});
            });
        });
        const newGrid = [...grid];
        cells.map((cell) => {
            if(isNull(cell.x, cell.y)) {
                newGrid[cell.x][cell.y] =
                    <div
                    className="free-cell"
                    key={`${cell.x}-${cell.y}`}
                    />;
            }
        });
        return newGrid
    }
    const mapWin = (color) => {
        let arrays = [];
        grid.map((row, rowIndex) => {
            row.map((cell, cellIndex) => {
                if (cell !== null && cell.props?.className !== 'free-cell' && cell.props?.className !== 'locked-cell' && cell.props?.card[0]?.color === color) {
                    let horizontal = [row[cellIndex], row[cellIndex + 1], row[cellIndex + 2], row[cellIndex + 3]];
                    let vertical = [grid[rowIndex][cellIndex], grid[rowIndex + 1][cellIndex], grid[rowIndex + 2][cellIndex]];
                    let diagonalLeft = [grid[rowIndex][cellIndex], grid[rowIndex + 1][cellIndex + 1], grid[rowIndex + 2][cellIndex + 2]];
                    let diagonalRight = [grid[rowIndex][cellIndex], grid[rowIndex + 1][cellIndex - 1], grid[rowIndex + 2][cellIndex - 2]];
                    if (grid[rowIndex + 3] !== undefined) {
                        vertical.push(grid[rowIndex + 3][cellIndex]);
                        diagonalLeft.push(grid[rowIndex + 3][cellIndex + 3]);
                        diagonalRight.push(grid[rowIndex + 3][cellIndex - 3]);
                    }
                    arrays.push(horizontal, vertical, diagonalLeft, diagonalRight);
                }
            })
        })
        return arrays
    }


    function checkColor(element){
        const card = element?.props?.card?.[0];
        return card && card.color === this?.color;
    }


    const checkWin = (color) => {
        const arrays = mapWin(color);

        const res = arrays.map(arr => {
            if (arr.length > 3) {
                return arr.every(checkColor, {color: color});
            }
            return false;
        });

        if (res.includes(true)) {
            console.log('test',res)
            socket.emit('winRound',user)
            return true;
        }
    };

    const handleCellDrop = async (event, x, y) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("cardId");
        const card = await getCardById(cardId)
        if (isFree(x, y) || (grid[x][y]?.props?.card[0].value < card[0].value)) {
            const img = <Card card={card} y={y} x={x}/>
            let newGrid = setFreeCells(x, y);
            newGrid[x][y] = img;
            let tempLock = [];
            newGrid.map((row, rIndex) => {
                row.map((cell, cIndex) => {
                    if (!isNull(rIndex, cIndex) && !isFree(rIndex, cIndex) && !isLocked(rIndex, cIndex)) {
                        tempLock.push({x: rIndex, y: cIndex});
                    }

                })
            })
            const xValues = tempLock.map(({x}) => x);
            const yValues = tempLock.map(({y}) => y);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const minY = Math.min(...yValues);
            const maxY = Math.max(...yValues);

            newGrid.map((row, rIndex) => {
                row.map((cell, cIndex) => {
                    if (rIndex > minX + 5 || rIndex < maxX - 5 || cIndex > minY + 5 || cIndex < maxY - 5) {
                        if (isNull(rIndex, cIndex) || isFree(rIndex, cIndex)) {
                            newGrid[rIndex][cIndex] =
                                <div className="locked-cell" key={`${rIndex}-${cIndex}`}>{cell}</div>
                        }
                    }
                })
            })
            socket.emit('move', newGrid);

            checkWin(card[0].color)
        } else {
            alert('You can\'t place a card here');
        }
    };

    const getCardById = (id) => {
        return cards.filter((card) => card._id === id);
    }

    const handleCellDragOver = event => {
        event.preventDefault();
    };


    return (
        <div className="grid-container">
            {grid && grid.map((row, x) => {
                return row.map((cell, y) => {
                    return (
                        <div
                            key={`${x}-${y}`}
                            className={`grid-cell`}
                            onDrop={event => handleCellDrop(event, x, y)}
                            onDragOver={handleCellDragOver}
                        >
                            {cell && cell.props.card && (
                                <Card card={cell.props.card} x={x} y={y} />
                            )}
                            {cell && cell.props.className === "free-cell" && (
                                <div className="free-cell" key={`${cell.x}-${cell.y}`} />
                            )}
                        </div>
                    )
                });
            })}
        </div>
    );
};

export default Grid;