import { fade, makeStyles } from '@material-ui/core/styles';
import { fetchCustomerByVehicleLocation, fetchCustomerByVtype, fetchCustomers } from "../../actions/customerAction"

import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import InputBase from '@material-ui/core/InputBase';
import {
    Link
} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
        
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
           
        },
        border: '2px solid black',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    container: {
        width: 'auto'
    }
}));

const options = ['Search', 'Vehicle Type', 'Vehicle Location'];

export const CustomerNavBar = ({isAdmin}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [searchText, setSearchText] = React.useState("");
    //redux
    const dispatch = useDispatch();

    const handleClick = () => {
        switch (options[selectedIndex]) {
            case "Search":
                {
                    dispatch(fetchCustomers());
                    break;
                }
            case "Vehicle Type":
                {
                    console.info(`You clicked ${options[selectedIndex]}`);
                    searchText && dispatch(fetchCustomerByVtype(searchText));
                    setSearchText("")
                    break;
                }
            case "Vehicle Location":
                {
                    console.info(`You clicked ${options[selectedIndex]}`);
                    searchText && dispatch(fetchCustomerByVehicleLocation(searchText));
                    setSearchText("")
                    break;
                }
           
            default:

        }
    };


    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: 'ghostwhite ', color: 'black' }}>
                <Toolbar>
                    <Typography style={{ margin: "10px" }}><Link to="/viewCustomers" style={{ color: 'black', fontWeight: 'bold' }}>Manage Customers</Link></Typography>
                    <Typography style={{ margin: "10px" }}><Link to="/viewCustomers" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>View Customers</Link></Typography>
                    <Typography style={{ margin: "10px" }}><Link to="/addCustomer" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>Add Customer</Link></Typography>

                    {isAdmin ? <>
                    <div className={classes.search} style={{ marginLeft: 'auto' }}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={e => setSearchText(e.target.value)}
                            value={searchText}
                        />
                    </div>
                    <Grid container direction="column" alignItems="center" className={classes.container}>
                        <Grid item xs={12}>
                            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                                <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                                <Button
                                    color="primary"
                                    size="small"
                                    aria-controls={open ? 'split-button-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-label="search"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 5 }}>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList id="split-button-menu">
                                                    {options.map((option, index) => (
                                                        <MenuItem
                                                            key={option}
                                                            selected={index === selectedIndex}
                                                            onClick={(event) => handleMenuItemClick(event, index)}
                                                        >
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Grid>
                    </Grid>
                    </> : <span></span>}
                </Toolbar>
            </AppBar>
        </div>
    );
}