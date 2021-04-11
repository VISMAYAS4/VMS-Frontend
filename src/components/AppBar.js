import AppBar from '@material-ui/core/AppBar';
import {
  Link
} from "react-router-dom";
import React from 'react';
import { TemporaryDrawer } from './Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
}));


export const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <TemporaryDrawer/>
                    <Typography variant="h5" className={classes.title}><Link to="/dashboard" style={{ color: 'white' }}>Vehicle Management System</Link></Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}