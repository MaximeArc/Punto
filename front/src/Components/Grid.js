import React, {useState} from 'react'
import "../App.css";


const Grid = () => {

    const initialGrid = Array(6)
        .fill(null)
        .map(() => Array(6).fill(null));

    const [grid, setGrid] = useState(initialGrid);
    const [playerTurn, setPlayerTurn] = useState(1);
    const isValidMove = (x, y) => {
        // Check if the target cell is already occupied
        if (grid[x][y]) {
            return false;
        }

        // Check if the target cell is neighboring an occupied cell
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (grid[x + i] && grid[x + i][y + j]) {
                    return true;
                }
            }
        }

        // If none of the above conditions are met, it's not a valid move
        return false;
    };



        const handleCellDrop = (event, x, y) => {
        event.preventDefault();
        const value = event.dataTransfer.getData("value");
        // Do something with the value, such as update the grid state
        // For example, you can use the setGrid function to update the grid state
        const newGrid = [...grid];
        newGrid[x][y] = value;
        setGrid(newGrid);
    };

    const handleCellDragOver = event => {
        event.preventDefault();
    };
    const handleCellClick = (x, y) => {
        // Check if the move is valid
        if (!isValidMove(x, y)) {
            return;
        }

        // Make the move
        const newGrid = [...grid];
        newGrid[x][y] = playerTurn;
        setGrid(newGrid);

        // Check if the game is over
        if (isGameOver()) {
            alert("Game over!");
            return;
        }

        // Switch to the next player's turn
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
    };


// Helper function to check if the game is over
    const isGameOver = () => {
        // Check if any columns or rows have 6 or more cards
        for (let i = 0; i < 6; i++) {
            let colCount = 0;
            let rowCount = 0;
            for (let j = 0; j < 6; j++) {
                if (grid[i][j]) {
                    colCount++;
                }
                if (grid[j][i]) {
                    rowCount++;
                }
            }
            if (colCount === 6 || rowCount === 6) {
                return true;
            }
        }

        // If none of the above conditions are met, the game is not over
        return false;
    };
    const renderGrid = () => {

        return grid.map((row, x) => {
            return row.map((cell, y) => {
                return (
                    <div
                        key={`${x}-${y}`}
                        className={`grid-cell ${
                            isValidMove(x, y) ? "valid-move" : ""
                        }`}
                       // onClick={() => handleCellClick(x, y)}
                        onDrop={event => handleCellDrop(event,x, y)}
                        onDragOver={handleCellDragOver}
                    >
                        {cell}
                    </div>
                );

            });
        });
    }
    return <div className="grid-container">{renderGrid()}</div>
};


export default Grid;