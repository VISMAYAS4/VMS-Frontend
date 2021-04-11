import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import { CustomerNavBar } from "./CustomerNavBar"
import { connect } from 'react-redux';
import { fetchCustomerByID } from '../../actions/customerAction';

class DetailViewCustomer extends Component {
    constructor() {
        super();
        this.state = { customer: {}, message: '' }
    }

    componentDidMount() {
        this.props.onFetchCustomerByID(this.props.match.params.id);
    }

    render() {
        let { customer } = this.props;
        customer = customer.customerId ? customer : false
        return (
            !customer ? <div>
                Loading
            </div>
                :
                // <div>{JSON.stringify(booking)}</div>
                <div>
                    <CustomerNavBar />
                    <h2 style={{color: '#3f51b5', align: 'center',  justifyContent: "center", display: "flex" }}>Detailed View Of Customer</h2>
                    <Container maxWidth="lg" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableBody>
                                <TableRow><TableCell align="left">
                                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                    CUSTOMER DETAILS</Typography></TableCell ><TableCell align="left">
                                        <Table aria-label="customized table">
                                            <TableBody>
                                                <TableRow ><TableCell align="left" >
                                                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                                    FirstName</Typography></TableCell ><TableCell >
                                                        {customer.firstName}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                                    LastName</Typography></TableCell ><TableCell >
                                                        {customer.lastName}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                                    EmailId</Typography></TableCell ><TableCell >
                                                        {customer.emailId}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                                    MobileNumber</Typography></TableCell ><TableCell >
                                                        {customer.mobileNumber}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                <Typography variant="h6" style={{ color: "#3f51b5", fontWeight: 'bold' }}>
                                                    Address</Typography></TableCell ><TableCell >
                                                        {customer.address}</TableCell ></TableRow>

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
        customer: state.customersData.customer
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchCustomerByID: (param) => dispatch(fetchCustomerByID(param))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(DetailViewCustomer);