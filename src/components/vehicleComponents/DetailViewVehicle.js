import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import { VehicleNavBar } from "./VehicleNavBar"
import { connect } from 'react-redux';
import { fetchVehicleByID } from '../../actions/vehicleAction';

class DetailViewVehicle extends Component {
    constructor() {
        super();
        this.state = { vehicle: {}, message: '' }
    }

    componentDidMount() {
        this.props.onFetchVehicleByID(this.props.match.params.id);
    }

    render() {
        let { vehicle } = this.props;
        vehicle = vehicle.vehicleId ? vehicle : false
        return (
            !vehicle ? <div>
                Loading
            </div>
                :
                // <div>{JSON.stringify(booking)}</div>
                <div>
                    <VehicleNavBar />
                    <h2 style={{color: '#3f51b5', align: 'center',  justifyContent: "center", display: "flex" }}>Detailed View Of Booking</h2>
                    <Container maxWidth="lg" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                    <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                            <TableBody>
                                <TableRow><TableCell align="left">
                                    Customer Details</TableCell ><TableCell align="left">
                                        <Table aria-label="customized table">
                                            <TableBody>
                                                <TableRow><TableCell align="left">
                                                    FirstName</TableCell ><TableCell >
                                                        {vehicle.vehicleNumber}</TableCell ></TableRow>

                                                {/* <TableRow><TableCell align="left">
                                                    LastName</TableCell ><TableCell >
                                                        {customer.lastName}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                    EmailId</TableCell ><TableCell >
                                                        {customer.emailId}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                    MobileNumber</TableCell ><TableCell >
                                                        {customer.mobileNumber}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                    Address</TableCell ><TableCell >
                                                        {customer.address}</TableCell ></TableRow> */}

                                            </TableBody></Table>
                                    </TableCell ></TableRow>
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
        vehicle: state.vehiclesData.vehicle
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchVehicleByID: (param) => dispatch(fetchVehicleByID(param))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(DetailViewVehicle);