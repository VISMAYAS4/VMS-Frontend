import * as actions from '../../actions/bookingAction'

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import AlertMessage from '../AlertMessage';
import { BookingNavBar } from "./BookingNavBar"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import TablePagination from '@material-ui/core/TablePagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#e6e6e6',
        },
    },
}))(TableRow);


class ViewBookings extends Component {


    constructor() {
        super();
        this.state = { bookings: [], message: '', displayAlert: false, page: 0, rowsPerPage: 5 }
    }

    componentDidMount() {
        const user = this.props.user;
        if (this.props.isLoggedIn) {
            if (user.roles.includes("ROLE_ADMIN")) { this.props.onFetchBookings() }
            else { this.props.onFetchCustomerBookings(user.email) }
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    deleteBoooking(id) {
        this.props.onDeleteBooking(id);
    }

    getVehicleIcon(vehicleType) {
        if (vehicleType === "Sedan") {
            return <> <img src={require('../../images/sedan.svg')} alt="SedanIcon" className="icons" />Sedan</>
        } else if (vehicleType === "SUV") {
            return <> <img src={require('../../images/suv.svg')} alt="SuvIcon" className="icons" />SUV</>
        } else if (vehicleType === "Hatchback") {
            return <> <img src={require('../../images/hatchback.svg')} alt="HatchbackIcon" className="icons" />Hatchback</>
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({page:newPage})
        
      };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage:parseInt(event.target.value, 10)})
        this.setState({page:0})
      };
      
    render() {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container-fluid " style={{ marginTop: "1rem " }}>
                <BookingNavBar isAdmin={this.props.user.roles.includes("ROLE_ADMIN")} />
                {this.state.displayAlert && <AlertMessage message={this.props.message} />}
                <br></br>
                <TableContainer component={Paper} elevation={6} >
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow style={{ backgroundColor: "#3f51b5" }}>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }} >#</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Customer Name</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Vehicle Type</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Vehicle Number</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Booking Date</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Booked Till Date</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Booking Desc</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Distance</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Total Cost</TableCell>
                                <TableCell align="center" style={{ color: "white", fontSize: '0.875rem', }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        {this.props && this.props.bookings.length>=1 &&  <TableBody>                           
                            {this.props.bookings
                            .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                            .map((booking, i) => (                               
                                <StyledTableRow key={i} >
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{booking.customer.firstName} {booking.customer.lastName}</TableCell>
                                    <TableCell align="left">{this.getVehicleIcon(booking.vehicle.type)}</TableCell>
                                    <TableCell align="center">{booking.vehicle.vehicleNumber}</TableCell>
                                    <TableCell align="center">{booking.bookingDate}</TableCell>
                                    <TableCell align="center">{booking.bookedTillDate}</TableCell>
                                    <TableCell align="center">{booking.bookingDescription}</TableCell>
                                    <TableCell align="center">{booking.distance}</TableCell>
                                    <TableCell align="center" style={{ color: 'darkgreen' }}>&#8377; {booking.totalCost}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" >
                                            <Button style={{ backgroundColor: '#e48900' }}><Link to={"/detailViewBooking/" + booking.bookingId} style={{ textDecoration: 'none', color: 'white' }}><VisibilityIcon /></Link></Button>
                                            <Button style={{ backgroundColor: 'steelblue' }}><Link to={"/updateBooking/" + booking.bookingId} style={{ textDecoration: 'none', color: 'white' }}><EditIcon /></Link></Button>
                                            <Button onClick={this.deleteBoooking.bind(this, booking.bookingId)} style={{ backgroundColor: '#ec4646', fontWeight: 'bold' }}><DeleteIcon /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>}
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={this.props.bookings.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        message: state.bookingsData.message,
        bookings: state.bookingsData.bookings,
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchBookings: () => dispatch(actions.fetchBookings()),
        onDeleteBooking: (id) => dispatch(actions.deleteBooking(id)),
        onUpdateAlertMessage: (msg) => dispatch(actions._deleteBooking(msg)),
        onFetchCustomerBookings: (email) => dispatch(actions.fetchBookingByCustomerEmail(email))

    }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewBookings);

