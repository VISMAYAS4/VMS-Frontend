import AppBar from '@material-ui/core/AppBar';
import {
    Link
} from "react-router-dom";
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));



const UserNavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: 'ghostwhite ', color: 'black' }}>
                <Toolbar>
                    <Typography style={{ margin: "10px" }}><Link to="/users" style={{ color: 'black' }}>Manage Users</Link></Typography>
                    <Typography style={{ margin: "10px" }}><Link to="/users" style={{ textDecoration: 'none', color: 'black' }}>View Users</Link></Typography>
                    <Typography style={{ margin: "10px" }}><Link to="/add-user/_add" style={{ textDecoration: 'none', color: 'black' }}>Add Users</Link></Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default UserNavBar;