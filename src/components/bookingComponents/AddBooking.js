import * as actions from '../../actions/bookingAction'

import { Button, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react';

import AlertMessage from '../AlertMessage';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { BookingNavBar } from "./BookingNavBar"
import CssBaseline from '@material-ui/core/CssBaseline';
import Form from "react-validation/build/form";
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { fetchVehicles } from '../../actions/vehicleAction';
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

class AddBooking extends Component {

    constructor() {
        super();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.vehicleNumber = React.createRef();
        this.bookingDate = React.createRef();
        this.bookedTillDate = React.createRef();
        this.bookingDescription = React.createRef();
        this.distance = React.createRef();
        this.customer = React.createRef();
        this.vehicle = React.createRef();
        this.state = { message: '', booking: {}, bookings: {}, vehicles: {}, displayAlert: false, fields: {}, errors: {} }
        this.handleChange = this.handleChange.bind(this);
        this.addBooking = this.addBooking.bind(this)
        this.submitForm = this.submitForm.bind(this);
    }

    handleChange(e, vehicleDetails) {
        let fields = this.state.fields;
        if (e) {
            fields[e.target.name] = e.target.value;
        }
        if (vehicleDetails) {
            fields["vehicleNumber"] = vehicleDetails;
        }

        this.setState({
            fields
        });

    }

    submitForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.addBooking(e);
            this.setState({ fields: { ...this.state.fields } })
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
        if (!fields["firstName"] || fields["firstName"].length < 3) {
            formIsValid = false;
            errors["firstName"] = "*Please enter customer firstName.";
        }
        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = "*Please enter customer lastName.";
        }
        if (!fields["vehicleNumber"]) {
            formIsValid = false;
            errors["vehicleNumber"] = "*Please select a vehicle.";
        }
        if (!fields["bookingDate"] || fields["bookingDate"] < today) {
            formIsValid = false;
            errors["bookingDate"] = "*Please enter valid booking date.";
        }
        if (!fields["bookedTillDate"] || fields["bookedTillDate"] < today) {
            formIsValid = false;
            errors["bookedTillDate"] = "*Please enter valid booking till date.";
        }
        if (!fields["bookingDescription"] || fields["bookingDescription"].length < 1) {
            formIsValid = false;
            errors["bookingDescription"] = "*Please enter booking description.";
        }
        if (!fields["distance"] || fields["distance"] < 100) {
            formIsValid = false;
            errors["distance"] = "*The distance must be greater than 100.";
        }
        this.setState({
            errors: errors
        });

        return formIsValid;


    }


    componentDidMount() {
        if (this.props.isLoggedIn) {
            this.props.onFetchVehicles()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    addBooking(event) {
        event.preventDefault();
        this.props.onAddBooking({
            customer: { firstName: this.state.fields.firstName, lastName: this.state.fields.lastName },
            vehicle: { vehicleNumber: this.state.fields.vehicleNumber }, bookingDate: this.state.fields.bookingDate,
            bookedTillDate: this.state.fields.bookedTillDate, bookingDescription: this.state.fields.bookingDescription,
            distance: this.state.fields.distance
        });

    }

    render() {
        const { classes, vehicles: allVehicles } = this.props;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return (
            <React.Fragment>
                <BookingNavBar />
                {this.state.displayAlert && <AlertMessage message={this.props.message} />}
                <br></br>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ margin: 'auto' }}>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Add Booking
                                </Typography>

                            <Form
                                onSubmit={this.submitForm}
                                className={classes.form}
                            >
                                <TextField
                                    id="firstName"
                                    label="Customer first Name"
                                    name="firstName"
                                    variant="outlined"
                                    value={this.state.fields.firstName}
                                    onChange={this.handleChange}
                                    required
                                />
                                <div className={classes.error}>{this.state.errors.firstName}</div>
                                <br></br><br></br>

                                <TextField
                                    id="lastName"
                                    label="Customer last Name"
                                    name="lastName"
                                    variant="outlined"
                                    value={this.state.fields.lastName}
                                    onChange={this.handleChange}
                                    required
                                />
                                <div className={classes.error}>{this.state.errors.lastName}</div>
                                <br></br><br></br>

                                <Autocomplete
                                    id="vehicle"
                                    label="Vehicle"
                                    name="vehicle"
                                    options={allVehicles?allVehicles:null}
                                    getOptionLabel={(option) => `${option.type} - ${option.location} - ${option.vehicleNumber}`}
                                    renderInput={(params) => <TextField {...params} label="Vehicle" required variant="outlined" />}
                                    onChange={(event, vehicleDetails) => {
                                        this.handleChange(null, vehicleDetails.vehicleNumber);
                                    }}
                                />
                                <div className={classes.error}>{this.state.errors.vehicleNumber}</div>
                                <br></br><br></br>

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
                                    id="distance"
                                    label="Booking distance"
                                    name="distance"
                                    value={this.state.fields.distance}
                                    onChange={this.handleChange}
                                    required
                                    variant="outlined"
                                />
                                <div className={classes.error}>{this.state.errors.distance}</div>
                                <br></br><br></br>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>  
                                <Button type="submit" style={{ align: "center", width:'100%', margin: 2 }} variant="contained" color="primary">Add Booking</Button>
                                <Button style={{ align: "center", width:'100%', margin: 2 }} variant="contained" color="primary">
                                <Link to={"/viewBooking"} style={{ textDecoration: 'none', color: 'white' }}>Cancel</Link></Button>
                                </div> 

                            </Form>
                        </div>
                    </Grid>
                </Grid>
            </React.Fragment>)
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.bookingsData.message,
        vehicles: state.vehiclesData.vehicles,
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddBooking: (payload) => dispatch(actions.addBooking(payload)),
        onFetchVehicles: () => dispatch(fetchVehicles())
    }
}

export default connect(mapStateToProps, mapDispatchToState)(withStyles(styles)(AddBooking));

