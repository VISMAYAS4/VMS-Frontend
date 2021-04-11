import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const TemporaryDrawer = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem><ListItemIcon><HomeIcon /></ListItemIcon>
          <Link to='/dashboard' style={{ textDecoration: 'none' }}><ListItemText primary='Dashbooard' /></Link>
        </ListItem>
        <ListItem><ListItemIcon><EmojiTransportationIcon /></ListItemIcon>
        <ListItemText primary='Bookings' />
        </ListItem>
        <ListItem><ListItemIcon><PeopleAltIcon /></ListItemIcon>
        <Link to='/viewCustomers' style={{ textDecoration: 'none' }}><ListItemText primary='Customers' /></Link>
        </ListItem>
        <ListItem><ListItemIcon><DriveEtaIcon /></ListItemIcon>
        <Link to='/viewVehicles' style={{ textDecoration: 'none' }}><ListItemText primary='Vehicles' /></Link>
        </ListItem>
        <ListItem><ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
          <ListItemText primary='Payments' />
        </ListItem>
        

      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
