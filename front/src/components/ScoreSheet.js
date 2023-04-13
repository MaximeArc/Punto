import {Typography} from "@mui/material";
import {useState} from "react";

const ScoreSheet = ({score}) => {


    return (
        <>
        {score?.map((score) => (
        <div key={score.name} style={{display:'flex', flexDirection:'row', marginRight:'90%'}}>
            <h3 style={{ marginLeft:'5px'}}>{`${score.score}   ${score.name}`}</h3>

        </div>
        ))}
        </>
    );
}

export default ScoreSheet;