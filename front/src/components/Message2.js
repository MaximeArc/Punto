import {Typography} from "@mui/material";

const Message2 = ({ gameWon }) => {
    console.log(gameWon)
    return (
        <>
            {gameWon!=='' && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {gameWon} won the game !
            </Typography>}
        </>

    );
}

export default Message2;