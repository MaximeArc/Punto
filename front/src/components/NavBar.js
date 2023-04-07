import {Link} from "react-router-dom";
import {AppBar, Button, Chip, List, ListItem, Toolbar} from "@mui/material";
import "../css/App.css";



export const Navbar = ()=> {

    return (
        <AppBar position="static">
            <Toolbar className="nav-bar">
                <Chip
                    label="Profile"
                    component={Link}
                    to="/profile"
                    clickable
                    color="error"
                />
                <Chip
                    label="Rules"
                    component={Link}
                    to="/rules"
                    clickable
                    color="info"
                />
                <Chip
                    label="Create Game"
                    component={Link}
                    to="/lobby"
                    clickable
                    color="warning"
                />
                <Chip
                    label="Join Game"
                    component={Link}
                    to="/join"
                    clickable
                    color="success"
                />
            </Toolbar>
        </AppBar>
    )
}
