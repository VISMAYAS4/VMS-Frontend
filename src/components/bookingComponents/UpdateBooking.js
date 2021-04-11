import * as actions from '../../actions/bookingAction';

import { Button, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import AlertMessage from '../AlertMessage';
import { BookingNavBar } from "./BookingNavBar"
import CssBaseline from '@material-ui/core/CssBaseline';
import Form from "react-validation/build/form";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    root: {
        height: '65vh',

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
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'grid'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    error: {
        color: '#cc0000',
        marginBottom: 12,
    }
});

class UpdateBooking extends Component {

    constructor() {
        super();
        this.bookingDate = React.createRef();
        this.bookedTillDate = React.createRef();
        this.bookingDescription = React.createRef();
        this.state = {
            message: '', booking: {}, bookings: {}, displayAlert: false, fields: {},
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateBooking = this.updateBooking.bind(this)
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submitForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.updateBooking(e);
            this.setState({ fields: { ...this.state.fields, bookingDate: '', bookedTillDate: '', bookingDescription: '' } })
        }
    }

    validateForm() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        let fields = { ...this.state.fields };

        let errors = {};
        let formIsValid = true;
        if (!fields["bookingDate"] || fields["bookingDate"] < today) {
            formIsValid = false;
            errors["bookingDate"] = "*Please enter a valid booking date.";
        }
        if (!fields["bookedTillDate"] || fields["bookedTillDate"] < today) {
            formIsValid = false;
            errors["bookedTillDate"] = "*Please enter a valid booking till date.";
        }
        if (!fields["bookingDescription"] || fields["bookingDescription"].length < 1) {
            formIsValid = false;
            errors["bookingDescription"] = "*Please enter booking description.";
        }
        this.setState({
            errors: errors
        });
        return formIsValid;


    }


    componentDidMount() {
        this.props.onFetchBookingByID(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    updateBooking(event) {
        event.preventDefault();
        this.props.onUpdateBooking({
            bookingId: this.props.match.params.id, bookingDate: this.state.fields.bookingDate,
            bookedTillDate: this.state.fields.bookedTillDate, bookingDescription: this.state.fields.bookingDescription
        })
    }

    render() {
        const { classes } = this.props;
        let { booking } = this.props;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        booking = booking.bookingId ? booking : false
        return (
            !booking ?
                <div>Loading</div>
                :
                <div className="container-fluid " style={{ marginTop: "1rem " }}>
                    <BookingNavBar />
                    {this.state.displayAlert && <AlertMessage message={this.props.message} />}
                    <br></br>
                    <div className="container mt-3">
                    <Grid container component="main" className={classes.root}>
                        <CssBaseline />
                        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ margin: 'auto' }}>
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5" style={{ color: '#3f51b5' }}>
                                    Update Booking
                                    </Typography>

                                <Form
                                    onSubmit={this.submitForm}
                                    className={classes.form}
                                >
                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Customer Name"
                                        defaultValue={booking.customer.firstName + ' ' + booking.customer.lastName}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        disabled
                                    /><br></br><br></br>

                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Vehicle Number"
                                        defaultValue={booking.vehicle.vehicleNumber}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        disabled
                                    /><br></br><br></br>

                                    <TextField
                                        required
                                        name="bookingDate"
                                        id="bookingDate"
                                        label="Booking Date"
                                        variant="outlined"
                                        type="date"
                                        defaultValue={today}
                                        value={this.state.fields.bookingDate}
                                        onChange={this.handleChange}
                                    />
                                    <div className={classes.error}>{this.state.errors.bookingDate}</div>
                                    <br></br><br></br>

                                    <TextField
                                        required
                                        name="bookedTillDate"
                                        id="bookedTillDate"
                                        label="Booking Till Date"
                                        variant="outlined"
                                        type="date"
                                        defaultValue={today}
                                        value={this.state.fields.bookedTillDate}
                                        onChange={this.handleChange}
                                    />
                                    <div className={classes.error}>{this.state.errors.bookedTillDate}</div>
                                    <br></br><br></br>

                                    <TextField
                                        required
                                        name="bookingDescription"
                                        id="bookingDescription"
                                        label="Booking description"
                                        variant="outlined"
                                        value={this.state.fields.bookingDescription}
                                        onChange={this.handleChange}
                                    />
                                    <div className={classes.error}>{this.state.errors.bookingDescription}</div>
                                    <br></br><br></br>

                                    <TextField
                                        id="outlined-disabled"
                                        label="Booking distance"
                                        defaultValue={booking.distance}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        disabled
                                        variant="outlined"
                                    /><br></br><br></br>

                                    <TextField
                                        id="outlined-read-only-input"
                                        label="Total Cost"
                                        defaultValue={booking.totalCost}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        disabled
                                        variant="outlined"
                                    /><br></br><br></br>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>

                                        <Button type="submit" style={{ align: "center", width:'100%', margin: 2 }} variant="contained" color="primary">Update Booking</Button>
                                        <Button style={{ align: "center" , width:'100%', margin: 2}} variant="contained" color="primary">
                                            <Link to={"/viewBooking"} style={{ textDecoration: 'none', color: 'white' }}>  Cancel  </Link></Button>
                                    </div>
                                </Form>
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.bookingsData.message,
        booking: state.bookingsData.booking,
        bookings: state.bookingsData.bookings
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onUpdateBooking: (payload) => dispatch(actions.updateBooking(payload)),
        onFetchBookingByID: (payload) => dispatch(actions.fetchBookingByID(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(withStyles(styles)(UpdateBooking));

