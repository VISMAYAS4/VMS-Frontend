import * as actions from '../../actions/paymentAction'

import { Button, Container, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import AlertMessage from '@material-ui/lab/Alert';
import { PaymentNavBar } from "./PaymentNavBar"
import { connect } from 'react-redux';

class TotalPaymentByVehicle extends Component{

    constructor(){
        super();
        this.vehicleId = React.createRef();
        this.state = { message: '', displayAlert: false }
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }

    fetchTotalPaymentByVehicle(event) {
        event.preventDefault(); 
        this.props.onfetchTotalPaymentByVehicle({
            vehicleId: this.vehicleId.current.value
        });
    }

    render() { 
        return (
            <div>
                 <PaymentNavBar/>
                 {this.state.displayAlert && <AlertMessage message={this.props.message}/>}                       
                <Container maxWidth="sm" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                        <form>
                        <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Vehicle ID</Typography>
                            <input type="text" ref={this.vehicleId} placeholder="Enter vehicle id" name="vehicleId" required /><br></br><br></br>
                            <Button style={{ align: "center" }} variant="contained" onClick={this.fetchTotalPaymentByVehicle.bind(this)} color="primary">Calculate</Button><br></br><br></br>
                        <Typography  variant="h6" style={{ width: 'fit-content', margin: '' }}>Total Payment By Vehicle is  : {this.props.paymentByVehicle}</Typography><br></br><br></br>
                        </form>
                    </Paper>
                
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        paymentByVehicle : state.paymentsData.paymentByVehicle
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onfetchTotalPaymentByVehicle : (payload) => dispatch(actions.fetchTotalPaymentByVehicle (payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(TotalPaymentByVehicle);