import {Typography} from "@mui/material";

const Message = ({ roundWon, gameWon }) => {
    console.log(roundWon, gameWon)
    return (
        <>
            {roundWon!=='' && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {roundWon} won the round !
            </Typography>}
            {gameWon!=='' && <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {gameWon} won the game !
            </Typography>}
        </>
    );
}
export default Message;