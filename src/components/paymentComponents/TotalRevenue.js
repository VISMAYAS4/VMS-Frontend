import * as actions from '../../actions/paymentAction'

import { Button, Container, Paper, Typography } from '@material-ui/core';
import React, { Component } from 'react'

import AlertMessage from '@material-ui/lab/Alert';
import { PaymentNavBar } from "./PaymentNavBar"
import { connect } from 'react-redux';

class TotalRevenue extends Component{

    constructor(){
        super();
        this.paymentDate1 = React.createRef();
        this.paymentDate2 = React.createRef();
        this.state = { message: '', displayAlert: false }
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }): this.setState({ displayAlert: false });
        }
    }


    fetchTotalRevenue(event) {
        event.preventDefault();
        this.props.onfetchTotalRevenue({
            paymentDate1: this.paymentDate1.current.value,
            paymentDate2: this.paymentDate2.current.value
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

                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Payment Date1</Typography>
                            <input type="date" ref={this.paymentDate1} placeholder="Enter payment Date1" name="paymentDate1" required /><br></br><br></br>
                            <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Payment Date2</Typography>
                            <input type="date" ref={this.paymentDate2} placeholder="Enter payment Date2" name="paymentDate2" required /><br></br><br></br>
                            <Button style={{ align: "center" }} variant="contained" onClick={this.fetchTotalRevenue.bind(this)} color="primary">Calculate</Button><br></br><br></br>
                        <Typography  variant="h6" style={{ width: 'fit-content', margin: '' }}>Total revenue is  : {this.props.revenue}</Typography><br></br><br></br>
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
        revenue : state.paymentsData.revenue
    }
}

const mapDispatchToState = (dispatch) => {
    return {
        onfetchTotalRevenue : (payload) => dispatch(actions.fetchTotalRevenue (payload))
    }
}


export default connect(mapStateToProps, mapDispatchToState)(TotalRevenue);
