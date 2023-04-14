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

    // Fetch the initial game board state from the API
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

    // Check if a cell is free to drop a card
    const isFree = (x, y) => {
        return grid[x][y]?.props?.className === `free-cell`
    }

    // Check if a cell is null
    const isNull = (x, y) => {
        if(x >= 0 && y >= 0 && x < 11)
            return grid[x][y] === null;
    }

    // Check if a cell is locked (out of bound)
    const isLocked = (x, y) => {
        return grid[x][y]?.props?.className === `locked-cell`
    }

    // Set the cells around the given coordinates to free
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
    // Map the win condition arrays for the given color
    const mapWin = (color) => {
        let arrays = [];
        // Map the grid to get the cells containing a card of the given color
        grid.map((row, rowIndex) => {
            row.map((cell, cellIndex) => {
                if (cell !== null && cell.props?.className !== 'free-cell' && cell.props?.className !== 'locked-cell' && cell.props?.card[0]?.color === color) {
                    // Get the horizontal, vertical, diagonal left and diagonal right arrays
                    let horizontal = [row[cellIndex], row[cellIndex + 1], row[cellIndex + 2], row[cellIndex + 3]];
                    let vertical = [grid[rowIndex][cellIndex], grid[rowIndex + 1][cellIndex], grid[rowIndex + 2][cellIndex]];
                    let diagonalLeft = [grid[rowIndex][cellIndex], grid[rowIndex + 1][cellIndex + 1], grid[rowIndex + 2][cellIndex + 2]];
                    let diagonalRight = [grid[rowIndex][cellIndex], grid[rowIndex + 1][cellIndex - 1], grid[rowIndex + 2][cellIndex - 2]];
                    // Check if the arrays are not out of bound
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

    //Takes a color as input and returns a boolean value indicating whether the game is won or not
    const checkWin = (color) => {
        const arrays = mapWin(color);
        const res = arrays.map(arr => {
            if (arr.length > 3) {
                return arr.every(checkColor, {color: color});
            }
            return false;
        });

        if (res.includes(true)) {
            socket.emit('winRound',user)
            return true;
        }
    };

    // Executed when a card is dropped on a cell
    const handleCellDrop = async (event, x, y) => {
        event.preventDefault();
        const cardId = event.dataTransfer.getData("cardId");
        const card = await getCardById(cardId)
        // Check if the cell is free and if the card is smaller than the one on the cell
        if (isFree(x, y) || (grid[x][y]?.props?.card[0].value < card[0].value)) {
            // Create a new card image element
            const img = <Card card={card} y={y} x={x}/>
            // Set the new grid with the new card
            let newGrid = setFreeCells(x, y);
            newGrid[x][y] = img;
            let tempLock = [];
            // Get the cells containing a card
            newGrid.map((row, rIndex) => {
                row.map((cell, cIndex) => {
                    if (!isNull(rIndex, cIndex) && !isFree(rIndex, cIndex) && !isLocked(rIndex, cIndex)) {
                        tempLock.push({x: rIndex, y: cIndex});
                    }

                })
            })
            // Get the min and max values of the cells containing a card
            const xValues = tempLock.map(({x}) => x);
            const yValues = tempLock.map(({y}) => y);
            const minX = Math.min(...xValues);
            const maxX = Math.max(...xValues);
            const minY = Math.min(...yValues);
            const maxY = Math.max(...yValues);

            // Lock the cells too far from the cells containing a card
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
            // Emit a move event to update the grid for all connected clients
            socket.emit('move', newGrid);
            // Check if the game is won
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