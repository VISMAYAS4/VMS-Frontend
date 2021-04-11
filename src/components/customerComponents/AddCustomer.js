import * as actions from '../../actions/customerAction'

import { Button, Container, Paper, Typography, withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import { Link } from "react-router-dom";

import AlertMessage from '../AlertMessage';
import { CustomerNavBar } from "./CustomerNavBar"
import { connect } from 'react-redux';
// By passing it to connect, our component receives it as a prop, and it will automatically dispatch the action when it’s called.

class AddCustomer extends Component {

    constructor() {
        super();
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.emailId = React.createRef();
        this.mobileNumber = React.createRef();
        this.address = React.createRef();
        this.state = { message: '',displayAlert:''}
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }
    

    addCustomer() {
       
        var customer = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            emailId: this.emailId.current.value,
            mobileNumber: this.mobileNumber.current.value,
            address: this.address.current.value
        };
        this.props.onAddCustomer(customer)
    }

    render() { 
        return (
            <div>
                 <CustomerNavBar/>
                 {this.state.displayAlert && <AlertMessage message={this.props.message} />}
                    {this.props.message}
                
                <Container maxWidth="sm" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex",         alignItems: 'center', }} >
                        <form>
                        <h4><b><u>ADD CUSTOMER</u></b></h4>
                        <br></br>
                            <Typography component="h6" style={{ width: 'fit-content', margin: 4, fontWeight: 'bold' }}>Customer First Name</Typography>
                            <input type="text" ref={this.firstName} placeholder="Enter First Name" name="firstName" required 
                            style = {{
                            width: '100%',
                            padding: '12px 20px',
                            margin: '8px 0',
                            borderRadius: '4px',
                            boxSizing: 'border-box'}}/><br></br><br></br>

                            <Typography component="h6" style={{ width: 'fit-content', margin: 4, fontWeight: 'bold'  }}>Customer Last Name</Typography>
                            <input type="text" ref={this.lastName} placeholder="Enter Last Name" name="lastName" required 
                            style = {{
                            width: '100%',
                            padding: '12px 20px',
                            margin: '8px 0',
                            borderRadius: '4px',
                            boxSizing: 'border-box'}}/><br></br><br></br>

                            <Typography component="h6" style={{ width: 'fit-content', margin: 4, fontWeight: 'bold'  }}>Email Id</Typography>
                            <input type="text" ref={this.emailId} placeholder="Enter EmailId" name="emailId" required
                            style = {{
                            width: '100%',
                            padding: '12px 20px',
                            margin: '8px 0',
                            borderRadius: '4px',
                            boxSizing: 'border-box'}} /><br></br><br></br>

                            <Typography component="h6" style={{ width: 'fit-content', margin: 4, fontWeight: 'bold'  }}>Mobile Number</Typography>
                            <input type="number" ref={this.mobileNumber} placeholder="Enter Mobile Number" name="mobileNumber" required 
                            style = {{
                            width: '100%',
                            padding: '12px 20px',
                            margin: '8px 0',
                            borderRadius: '4px',
                            boxSizing: 'border-box'}}/><br></br><br></br>

                            <Typography component="h6" style={{ width: 'fit-content', margin: 4, fontWeight: 'bold'  }}>Address</Typography>
                            <input type="text" ref={this.address} placeholder="Enter Address" name="address" required
                            style = {{
                            width: '100%',
                            padding: '12px 20px',
                            margin: '8px 0',
                            borderRadius: '4px',
                            boxSizing: 'border-box'}} /><br></br><br></br>
                            <br></br>

                            <Button style={{ align: "center", width:'80%'}} variant="contained" onClick={this.addCustomer.bind(this)} color="primary">Add Customer</Button>
                            <Button style={{ align: "center" , width:'75%', margin: 4}} variant="contained" color="primary">
                                <Link to={"/viewCustomers"} style={{ textDecoration: 'none', color: 'white' }}>  Cancel  </Link>
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </div>
        )
    }
}

// called every time the store state changes. It receives the entire store state, and should return an object of data this component needs.
const mapStateToProps = (state) => {
    return {
        message: state.customersData.message
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onAddCustomer: (payload) => dispatch(actions.addCustomer(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(AddCustomer);
