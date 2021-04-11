import * as actions from '../../actions/vehicleAction'

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { VehicleNavBar } from "./VehicleNavBar"
import  VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';

class ViewVehicles extends Component {


    constructor() {
        super();
        this.state = { vehicles: {}, message: '', displayAlert: false }
    }

    componentDidMount() {
        if (this.props.isLoggedIn) {
        this.props.onFetchVehicles();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    deleteVehicle(id) {
        this.props.onDeleteVehicle(id);
    }

    render() {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }
        const isAdmin=this.props.user.roles.includes("ROLE_ADMIN")
        return (
            <div>
                <VehicleNavBar isAdmin={this.props.user.roles.includes("ROLE_ADMIN")}/>
                {this.state.displayAlert && <Alert variant="filled" severity={this.props.message.includes("Successfully") ? "success" : "error"} style={{ justifyContent: "center" }}>
                    {this.props.message}
                </Alert>}
                <br></br><br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow style={{color:"#3f51b5",  fontSize: 'medium'}}>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}} >#</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Vehicle Number</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Type</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Charges</TableCell>
                                {/* <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booked Till Date</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booking Desc</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Distance</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Total Cost</TableCell> */}
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.props && this.props.vehicles && <TableBody>
                            {this.props.vehicles.map((vehicle, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{vehicle.vehicleNumber} </TableCell>
                                    <TableCell align="center">{vehicle.type}</TableCell>
                                    <TableCell align="center">{vehicle.chargesPerKm}</TableCell>
                                    {/* <TableCell align="center">{booking.bookedTillDate}</TableCell>
                                    <TableCell align="center">{booking.bookingDescription}</TableCell>
                                    <TableCell align="center">{booking.distance}</TableCell>
                                    <TableCell align="center">{booking.totalCost}</TableCell> */}
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" > 
                                           {isAdmin && <> <Button><Link to={"/detailViewVehicle/" + vehicle.vehicleId} style={{ textDecoration: 'none', color: 'white' }}><VisibilityIcon/></Link></Button>
                                            <Button><Link to={"/updateVehicle/" + vehicle.vehicleId} style={{ textDecoration: 'none', color: 'white' }}><EditIcon/></Link></Button> </>}
                                            <Button onClick={this.deleteVehicle.bind(this, vehicle.vehicleId)}><DeleteIcon/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>
                </TableContainer>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        message: state.vehiclesData.message,
        vehicles: state.vehiclesData.vehicles,
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchVehicles: () => dispatch(actions.fetchVehicles()),
        onDeleteVehicle: (id) => dispatch(actions.deleteVehicle(id)),
        onUpdateAlertMessage: (msg) => dispatch(actions.removeVehicle(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewVehicles);

