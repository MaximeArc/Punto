import {Typography} from "@mui/material";

const Turn = ({ turn }) => {
    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 , textAlign:'center', backgroundColor: '#282c34',
            color: 'white'}}>
            {turn}'s turn
        </Typography>
    );
}

export default Turn;