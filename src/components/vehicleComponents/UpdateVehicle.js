import * as actions from '../../actions/vehicleAction';

import { Button, Container, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import { VehicleNavBar } from "./VehicleNavBar"
import { connect } from 'react-redux';

class UpdateVehicle extends Component {

    constructor() {
        super();
        this.fixedCharges = React.createRef();
      
        this.state = { message: '', vehicle: {}, vehicles: {}, displayAlert: false }

    }

    componentDidMount() {
        this.props.onFetchVehicleByID(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }

    updateVehicle(event) {
        event.preventDefault();
        this.props.onUpdateVehicle({
            vehicleId: this.props.match.params.id,  
            fixedCharges: this.fixedCharges.current.value
        })
    }

    render() {
        // let { vehicle } = this.props;
        // vehicle = vehicle.vehicleId ? vehicle : false
        return (
             !CustomElementRegistry 
            ?
                <div>Loading</div>  
                :
                <div>
                <VehicleNavBar/>
                    {this.state.displayAlert && <Alert variant="filled" severity="success" style={{justifyContent:"center"}}>
                        {this.props.message}
                    </Alert>}
                    <Container maxWidth="sm" style={{ marginTop: 15 }}>
                        <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                            <form>
                               
                                <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Fixed Charges</Typography>
                                <input type="text"  ref={this.fixedCharges} name="fixedCharges" /><br></br><br></br>
                                <Button style={{ align: "center" }} variant="csontained" onClick={this.updateVehicle.bind(this)} color="primary">Update Vehicle</Button>
                            </form>
                        </Paper>
                    </Container>
                </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.vehiclesData.message,
        vehicle: state.vehiclesData.vehicle,
        vehicles: state.vehiclesData.vehicles
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onUpdateVehicle: (payload) => dispatch(actions.updateVehicle(payload)),
        onFetchVehicleByID: (payload) => dispatch(actions.fetchVehicleByID(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(UpdateVehicle);

