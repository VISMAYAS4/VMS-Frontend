import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import { BookingNavBar } from "./BookingNavBar"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { fetchBookingByID } from '../../actions/bookingAction';

class DetailViewBooking extends Component {
    constructor() {
        super();
        this.state = { booking: {}, message: '' }
    }

    componentDidMount() {
        this.props.onFetchBookingByID(this.props.match.params.id);
    }

    getVehicleIcon(vehicleType) {
        if (vehicleType === "Sedan") {
            return <> <img src={require('../../images/sedan.svg')} alt="SedanIcon" className="icons" style={{ marginLeft: '5px' }} />Sedan - {this.props.booking.vehicle.description}</>
        } else if (vehicleType === "SUV") {
            return <> <img src={require("../../images/suv.svg")} alt="SuvIcon" className="icons" style={{ marginLeft: '5px' }} />SUV - {this.props.booking.vehicle.description} </>
        } else if (vehicleType === "Hatchback") {
            return <> <img src={require("../../images/hatchback.svg")} alt="HatchbackIcon" className="icons" style={{ marginLeft: '5px' }} />Hatchback - {this.props.booking.vehicle.description}</>
        }
    }

    getCustomerIcon(customer){
        return <div style={{display:'flex', flexDirection:'row', }}>
            <Avatar className="avatar" style={{ marginLeft: '5px', backgroundColor:'steelblue' }} >
        {customer.firstName.substring(0,1)} </Avatar>
           <p style={{marginTop:'12px'}}>   
         {customer.firstName} {customer.lastName}</p>
         </div>
    }

    render() {
        let { booking } = this.props;
        booking = booking.bookingId ? booking : false
        return (
            !booking ? <div>
                Loading
            </div>
                :
                // <div>{JSON.stringify(booking)}</div>
                <div className="container-fluid " style={{ marginTop: "1rem " }}>
                    <BookingNavBar />
                    <Container maxWidth="lg" style={{ marginTop: 15 }}>
                        <Paper elevation={6} style={{ padding: 8, justifyContent: "center", display: "flex", flexDirection: "column", alignItems: 'center' }} >
                            <Typography component="h1" variant="h5" style={{ color: '#3f51b5', padding: 10, fontWeight: 'bold' }}>
                                Detailed View Of Booking
                                </Typography>
                            <TableContainer style={{ padding: 25, }}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" >
                                            <Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>Customer Details</Typography>
                                        </TableCell >
                                            <TableCell align="left">
                                                <Accordion elevation={5}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                       <Typography style={{ fontWeight: 'bold' }}>{this.getCustomerIcon(booking.customer)} </Typography> 
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Table aria-label="customized table">
                                                            <TableBody>
                                                                <TableRow ><TableCell align="left">
                                                                    FirstName</TableCell ><TableCell >
                                                                        {booking.customer.firstName}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    LastName</TableCell ><TableCell >
                                                                        {booking.customer.lastName}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    EmailId</TableCell ><TableCell >
                                                                        {booking.customer.emailId}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    MobileNumber</TableCell ><TableCell >
                                                                        {booking.customer.mobileNumber}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Address</TableCell ><TableCell >
                                                                        {booking.customer.address}</TableCell ></TableRow>

                                                            </TableBody></Table>
                                                    </AccordionDetails>
                                                </Accordion>

                                            </TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            Vehicle Details</Typography></TableCell ><TableCell >
                                                <Accordion elevation={5}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography style={{ fontWeight: 'bold' }}>{this.getVehicleIcon(booking.vehicle.type)} </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Table aria-label="customized table">
                                                            <TableBody>
                                                                <TableRow ><TableCell align="left">
                                                                    VehicleNumber</TableCell ><TableCell >
                                                                        {booking.vehicle.vehicleNumber}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Type</TableCell ><TableCell >
                                                                        {booking.vehicle.type}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Category</TableCell ><TableCell >
                                                                        {booking.vehicle.category}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Location</TableCell ><TableCell >
                                                                        {booking.vehicle.location}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Description</TableCell ><TableCell >
                                                                        {booking.vehicle.description}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Capacity</TableCell ><TableCell >
                                                                        {booking.vehicle.capacity}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    ChargesPerKm</TableCell ><TableCell >
                                                                        {booking.vehicle.chargesPerKm}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    FixedCharges</TableCell ><TableCell >
                                                                        {booking.vehicle.fixedCharges}</TableCell ></TableRow>

                                                            </TableBody></Table>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            Driver Details</Typography></TableCell ><TableCell >
                                                <Accordion elevation={5}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography style={{ fontWeight: 'bold' }}>
                                                        <img src={require('../../images/driver.svg')} alt="DriverIcon" className="icons" style={{ marginLeft: '5px' }} />
                                                            {booking.vehicle.driver.firstName + ' ' + booking.vehicle.driver.lastName + ' - ' + booking.vehicle.driver.mobileNumber} </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Table aria-label="customized table">
                                                            <TableBody>
                                                                <TableRow ><TableCell align="left">
                                                                    FirstName</TableCell ><TableCell >
                                                                        {booking.vehicle.driver.firstName}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    LastName</TableCell ><TableCell >
                                                                        {booking.vehicle.driver.lastName}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    EmailId</TableCell ><TableCell >
                                                                        {booking.vehicle.driver.emailId}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    MobileNumber</TableCell ><TableCell >
                                                                        {booking.vehicle.driver.mobileNumber}</TableCell ></TableRow>

                                                                <TableRow ><TableCell align="left">
                                                                    Address</TableCell ><TableCell >
                                                                        {booking.vehicle.driver.address}</TableCell ></TableRow>

                                                                <TableRow style={{ borderBottom: 'none' }}><TableCell align="left">
                                                                    LicenseNo</TableCell ><TableCell >
                                                                        {booking.vehicle.driver.licenseNo}</TableCell ></TableRow>

                                                            </TableBody></Table>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            BookingDate</Typography></TableCell ><TableCell style={{ fontWeight: 'bold' }}>

                                                {booking.bookingDate}</TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            BookedTillDate</Typography></TableCell ><TableCell style={{ fontWeight: 'bold' }}>
                                                {booking.bookedTillDate}</TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            BookingDescription</Typography></TableCell ><TableCell style={{ fontWeight: 'bold' }}>
                                                {booking.bookingDescription}</TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            Distance</Typography></TableCell ><TableCell style={{ fontWeight: 'bold' }}>
                                                {booking.distance}</TableCell ></TableRow>

                                        <TableRow style={{ borderBottom: '2px solid #3f51b5' }}><TableCell align="left" ><Typography component="h6" variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                            Total Cost</Typography></TableCell ><TableCell style={{ color: 'darkgreen', fontWeight: 'bold' }}>&#8377;
                                                {booking.totalCost}</TableCell ></TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Container>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        booking: state.bookingsData.booking
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchBookingByID: (param) => dispatch(fetchBookingByID(param))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(DetailViewBooking);