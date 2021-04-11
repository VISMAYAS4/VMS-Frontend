import * as actions from '../../actions/customerAction'

import { Button, ButtonGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, theme, createStyles } from '@material-ui/core';
import React, { Component } from 'react'

import AlertMessage from '../AlertMessage';
import { CustomerNavBar } from "./CustomerNavBar"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import  VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';



const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

class ViewCustomers extends Component {

    constructor() {
        super();
        this.state = { customers:[], message: '', displayAlert: false }
    }

    componentDidMount() {
        const user = this.props.user;
        if (this.props.isLoggedIn) {
            if (user.roles.includes("ROLE_ADMIN")) { this.props.onFetchCustomers() }
        else { this.props.onFetchCustomerEmail(user.email) }
        }
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.message !== prevProps.message) {
            this.props.message ? this.setState({ displayAlert: true }) : this.setState({ displayAlert: false });
        }
    }



    deleteCustomer(id) {
        this.props.onDeleteCustomer(id);
    }


    render() {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }

        return (

            <div className="container-fluid " style={{ marginTop: "1rem " }}>
                <CustomerNavBar isAdmin={this.props.user.roles.includes("ROLE_ADMIN")}/>
                {this.state.displayAlert && <AlertMessage message={this.props.message}/>}
                <br></br><br></br>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead >
                        <TableRow style={{ backgroundColor: "#3f51b5" }}>
                                <TableCell align="center" style={{color:"white",  fontSize: 'medium', fontWeight: 'bold'}} >#</TableCell>
                                <TableCell align="center" style={{color:"white",  fontSize: 'medium', fontWeight: 'bold'}}>Customer Name</TableCell>
                                <TableCell align="center" style={{color:"white",  fontSize: 'medium', fontWeight: 'bold'}}>Email Id</TableCell>
                                {/* <TableCell align="center" style={{color:"white",  fontSize: 'medium', fontWeight: 'bold'}}>Mobile Number</TableCell> */}
                                <TableCell align="center" style={{color:"white",  fontSize: 'medium', fontWeight: 'bold'}}>Address</TableCell>
                                <TableCell align="center" style={{color:"white",  fontSize: 'medium', fontWeight: 'bold'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.props && this.props.customers && <TableBody>
                            {this.props.customers.map((customer, i) => (
                                <StyledTableRow key={i} >
                                <TableCell component="th" scope="row">
                                        {i + 1}
                                    </TableCell>
                                    <TableCell align="center">{customer.firstName} {customer.lastName}</TableCell>
                                    <TableCell align="center">{customer.emailId}</TableCell>
                                    {/* <TableCell align="center">{customer.mobileNumber}</TableCell> */}
                                    <TableCell align="center">{customer.address}</TableCell>
                                    {/* <TableCell align="center">{booking.vehicle.vehicleNumber}</TableCell> */}
                                    <TableCell align="center">
                                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" > 
                                            <Button ><Link to={"/detailViewcustomer/" + customer.customerId} style={{ textDecoration: 'none', color: 'white', color: "#58D68D "}}><VisibilityIcon/></Link></Button>
                                            <Button><Link to={"/updateCustomer/" + customer.customerId} style={{ textDecoration: 'none', color: 'white' }}><EditIcon/></Link></Button>
                                            <Button style = {{color: "#E74C3C "}} onClick={this.deleteCustomer.bind(this, customer.customerId)}><DeleteIcon/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </StyledTableRow>
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
        message: state.customersData.message,
        customers: state.customersData.customers,
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.user
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        onFetchCustomers: () => dispatch(actions.fetchCustomers()),
        onDeleteCustomer: (id) => dispatch(actions.deleteCustomer(id)),
        onUpdateAlertMessage: (msg) => dispatch(actions.removeCustomer(msg)),
        onFetchCustomerEmail: (email) => dispatch(actions.fetchByCustomerEmail(email))
        
    }
}

export default connect(mapStateToProps, mapDispatchToState)(ViewCustomers);