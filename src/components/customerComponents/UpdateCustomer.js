import * as actions from '../../actions/customerAction';

import { Button, Container, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'
import { Link } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';
import { CustomerNavBar } from "./CustomerNavBar"
import { connect } from 'react-redux';

class UpdateCustomer extends Component {

    constructor() {
        super();
        this.emailId = React.createRef();
        this.state = { message: '', customer: {}, customers: {}, displayAlert: false }

    }

    updateCustomer() {
        console.log("updating...");
    
        var customer = {
            customerId: this.props.match.params.id,
            emailId: this.emailId.current.value
        };
    
        this.props.onUpdateCustomer(customer)
    }

    componentDidMount() {
        this.props.onFetchCustomerByID(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }
  

    render() {
        let { customer } = this.props;
        customer = customer.customerId ? customer : false
        return (
            !CustomElementRegistry ?
                <div>Loading</div>
                :
                <div>
                <CustomerNavBar/>
                    {this.state.displayAlert && <Alert variant="filled" severity="success" style={{justifyContent:"center"}}>
                        {this.props.message}
                    </Alert>}
                    <Container maxWidth="sm" style={{ marginTop: 15 }}>
                        <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                            <form>
                                <br></br>
                                <h4><b><u>UPDATE CUSTOMER EMAIL ID</u></b></h4>
                                <br></br><br></br>
                                <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Customer Name</Typography>
                                <input type="text" disabled value={customer.firstName + ' ' + customer.lastName} name="customerName" 
                                style = {{
                                    width: '100%',
                                    padding: '12px 20px',
                                    margin: '8px 0',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'}}
                                    /><br></br><br></br>
                                <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Email Id</Typography>
                                <input type="text" ref={this.emailId} placeholder="Enter EmailId" name="emailId" required 
                                style = {{
                                    width: '100%',
                                    padding: '12px 20px',
                                    margin: '8px 0',
                                    borderRadius: '4px',
                                    boxSizing: 'border-box'}}
                                    /><br></br><br></br>
                                <Button style={{ align: "center" ,  width:'100%'}} variant="contained" onClick={this.updateCustomer.bind(this)} color="primary">Update Customer</Button>
                                <Button style={{ align: "center" , width:'100%', margin: 4}} variant="contained" color="primary">
                                    <Link to={"/viewCustomers"} style={{ textDecoration: 'none', color: 'white' }}>  Cancel  </Link></Button>
                                    </form>
                        </Paper>
                    </Container>
                </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.customersData.message,
        customer: state.customersData.customer,
        customers: state.customersData.customers
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onUpdateCustomer: (payload) => dispatch(actions.updateCustomer(payload)),
        onFetchCustomerByID: (payload) => dispatch(actions.fetchCustomerByID(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToState)(UpdateCustomer);