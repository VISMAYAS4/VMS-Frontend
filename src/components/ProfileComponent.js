import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        height: '50vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    }
});

class Profile extends Component {

    render() {
        const { user: currentUser } = this.props;
        const { classes } = this.props;
        if (!currentUser) {
            return <Redirect to="/login" />;
        }

        return (
            <Grid container component="main" className={classes.root} >
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{margin:'auto', marginTop:'10%'}}>
                    <div className={classes.paper} >
                        <Avatar className={classes.avatar}>
                       { currentUser.username.substring(0,1)}
                        </Avatar>
                        <Typography variant="h5">
                            Profile
                        </Typography>
                        <br></br><br></br>
                        <div className={classes.row}>
                            <Typography variant="h6">
                                Username:
                        </Typography>
                            <Typography variant="h6">
                                {currentUser.username}
                            </Typography></div>
                        <div className={classes.row}>
                            <Typography variant="h6">
                                Email:
                        </Typography>
                            <Typography variant="h6">
                                {currentUser.email}
                            </Typography>
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Profile));
