import * as actions from '../../actions/paymentAction'

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { PaymentNavBar } from "./PaymentNavBar"
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ViewPayments extends Component {


    constructor() {
        super();
        this.state = { payments: [], message: '', displayAlert: false }
    }

    componentDidMount() {
        const user = this.props.user;
        if (this.props.isLoggedIn) {
            if (user.roles.includes("ROLE_ADMIN")) { this.props.onFetchPayments() }
            else { this.props.onFetchCustomerPayments(user.email) }
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }

    deletePayment(id) {
        this.props.onDeletePayment(id);
    }

    render() {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }
        return (
            <div>
                <PaymentNavBar isAdmin={this.props.user.roles.includes("ROLE_ADMIN")}/>
                {this.state.displayAlert && <Alert variant="filled" severity={this.props.message.includes("Successfully") ? "success" : "error"} style={{ justifyContent: "center" }}>
                    {this.props.message}
                </Alert>}
                <br></br><br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                            <TableRow style={{color:"#3f51b5",  fontSize: 'medium'}}>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}} >#</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Payment Mode</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Payment Date</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Booking ID</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Payment Status</TableCell>
                                {/* <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>TotalPayment</TableCell>
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Total Revenue</TableCell> */}
                                <TableCell align="center" style={{color:"#3f51b5",  fontSize: 'medium'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.props && this.props.payments && <TableBody>
                            {this.props.payments.map((payment, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{payment.paymentMode}</TableCell>
                                    <TableCell align="center">{payment.paymentDate}</TableCell>
                                    <TableCell align="center">{payment.booking.bookingId}</TableCell>
                                    <TableCell align="center">{payment.paymentStatus}</TableCell>
                                    {/* <TableCell align="center">{payment.TotalPayment}</TableCell>
                                    <TableCell align="center">{payment.TotalRevenue}</TableCell> */}
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" > 
                                            {/* <Button><Link to={"/detailPayment/" + payment.paymentId} style={{ textDecoration: 'none', color: 'white' }}><VisibilityIcon/></Link></Button>
                                            <Button><Link to={"/updatePayment/" + payment.paymentId} style={{ textDecoration: 'none', color: 'white' }}><EditIcon/></Link></Button> */}
                                            <Button onClick={this.deletePayment.bind(this, payment.paymentId)}><DeleteIcon/></Button>
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
        message: state.paymentsData.message,
        payments: state.paymentsData.payments,
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user,
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchPayments: () => dispatch(actions.fetchPayments()),
        onDeletePayment: (id) => dispatch(actions.deletePayment(id)),
        onUpdateAlertMessage: (msg) => dispatch(actions._deletePayment(msg)),
        onFetchCustomerPayments : (email) => dispatch(actions.fetchPaymentByCustomerEmail(email))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewPayments);

