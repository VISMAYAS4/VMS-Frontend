import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core';
import React, { Component } from 'react'

import { PaymentNavBar } from "./PaymentNavBar"
import { connect } from 'react-redux';
import { fetchPaymentByID } from '../../actions/paymentAction';

class DetailViewPayment extends Component {
    constructor() {
        super();
        this.state = { payment: {}, message: '' }
    }

    componentDidMount() {
        this.props.onFetchPaymentByID(this.props.match.params.id);
    }

    render() {
        let { payment } = this.props;
        payment = payment.paymentId ? payment : false
        return (
            !payment ? <div>
                Loading
            </div>
                :
                // <div>{JSON.stringify(booking)}</div>
                <div>
                    <PaymentNavBar />
                    <h2 style={{color: '#3f51b5', align: 'center',  justifyContent: "center", display: "flex" }}>Detailed View Of Payment</h2>
                    <Container maxWidth="lg" style={{ marginTop: 15 }}>
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableBody>
                                <TableRow><TableCell align="left">
                                    Payment Details</TableCell ><TableCell align="left">
                                        <Table aria-label="customized table">
                                            <TableBody>
                                                <TableRow><TableCell align="left">
                                                    Payment Mode </TableCell ><TableCell >
                                                        {payment.paymentMode}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                    Payment Date</TableCell ><TableCell >
                                                        {payment.paymentDate}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                    Payment Status</TableCell ><TableCell >
                                                        {payment.paymentStatus}</TableCell ></TableRow>

                                                <TableRow><TableCell align="left">
                                                    Booking ID</TableCell ><TableCell >
                                                        {payment.booking.bookingId}</TableCell ></TableRow>

                                            </TableBody></Table>
                                    </TableCell ></TableRow>

                                    <TableRow><TableCell align="left">
                                    BookingDate</TableCell ><TableCell >
                                        {payment.booking.bookingDate}</TableCell ></TableRow>

                                <TableRow><TableCell align="left">
                                    BookedTillDate</TableCell ><TableCell >
                                        {payment.booking.bookedTillDate}</TableCell ></TableRow>

                                <TableRow><TableCell align="left">
                                    BookingDescription</TableCell ><TableCell >
                                        {payment.booking.bookingDescription}</TableCell ></TableRow>

                                <TableRow><TableCell align="left">
                                    Distance</TableCell ><TableCell >
                                        {payment.booking.distance}</TableCell ></TableRow>

                                <TableRow><TableCell align="left">
                                    Total Cost</TableCell ><TableCell >
                                        {payment.booking.totalCost}</TableCell ></TableRow>

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
        payment: state.paymentsData.payment
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchPaymentByID: (param) => dispatch(fetchPaymentByID(param))
    }
}

export default connect(mapStateToProps, mapDispatchToState)(DetailViewPayment);