import * as actions from '../../actions/vehicleAction'

import { Button, Container, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import { VehicleNavBar } from "./VehicleNavBar"
import { connect } from 'react-redux';

class AddVehicle extends Component {

    constructor() {
        super();
        this.vehicleNumber = React.createRef();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.type = React.createRef();
        this.category= React.createRef();
        this.description= React.createRef();
        this.location= React.createRef();
        this.capacity= React.createRef();
        this.chargesPerKm= React.createRef();
        this.fixedCharges= React.createRef();
        this.applicationId = React.createRef();
        this.driver = React.createRef();
        this.state = { message: "" };
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }
    

    addVehicle(event) {
        event.preventDefault();
        var vehicle = {
            vehicleNumber: this.vehicleNumber.current.value,
			driver : {
          firstName: this.firstName.current.value,
          lastName: this.lastName.current.value,
          },
          type: this.type.current.value,
          category: this.category.current.value,
          description: this.description.current.value,
          location: this.location.current.value,
          capacity: this.capacity.current.value,
          chargesPerKm: this.chargesPerKm.current.value,
          fixedCharges : this.fixedCharges.current.value
        };

        this.props.onAddVehicle(vehicle)


    }

    render() { 
        return (
            <div>
                 <VehicleNavBar/>
                {this.state.displayAlert &&  <Alert variant="filled" severity="success" style={{justifyContent:"center"}}>
                    {this.props.message}
                </Alert>}
                <Container maxWidth="sm" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                        <form>

                        <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Vehicle Number</Typography>
                            <input type="text" ref={this.vehicleNumber} placeholder="Enter vehicle number" name="vehicleNumber" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Vehicle driver firstname</Typography>
                            <input type="text" ref={this.firstName} placeholder="Enter firstName" name="firstName" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Vehicle driver lastname </Typography>
                 <input type="text" ref={this.lastName} placeholder="Enter lastName" name="lastName" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Vehicle Type</Typography>
                            <input type="text" ref={this.type} placeholder="Enter vehicle type" name="type" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Vehicle Category</Typography>
                            <input type="text" ref={this.category} placeholder="Enter vehicle category" name="category" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Description</Typography>
                            <input type="text" ref={this.description} placeholder="Enter description" name="description" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Location</Typography>
                            <input type="text" ref={this.location} placeholder="Enter Location" name="location" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Capacity</Typography>
                            <input type="text" ref={this.capacity} placeholder="Enter capacity" name="capacity" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>chargesPerKm</Typography>
                            <input type="text" ref={this.chargesPerKm} placeholder="Enter chargesPerKm" name="chargesPerKm" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>fixedCharges</Typography>
                            <input type="text" ref={this.fixedCharges} placeholder="Enter Fixed Charges" name="fixedCharges" required /><br></br><br></br>
                            <Button style={{ align: "center" }} variant="contained" onClick={this.addVehicle.bind(this)} color="primary">Add Vehicle</Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.vehiclesData.message
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddVehicle: (payload) => dispatch(actions.addVehicle(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(AddVehicle)