import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Link, Route, Router, Switch } from "react-router-dom";
import React, { Component } from "react";

import AddBooking from "./components/bookingComponents/AddBooking";
import AddCustomer from './components/customerComponents/AddCustomer';
import AddPayment from './components/paymentComponents/AddPayment';
import AddUser from "./components/userComponents/AddUser"
import AddVehicle from "./components/vehicleComponents/AddVehicle";
import AppBar from '@material-ui/core/AppBar';
import Dashboard from "./components/Dashboard";
import DetailViewBooking from "./components/bookingComponents/DetailViewBooking";
import DetailViewCustomer from './components/customerComponents/DetailViewCustomer';
import DetailViewPayment from './components/paymentComponents/DetailViewPayment';
import DetailViewVehicle from "./components/vehicleComponents/DetailViewVehicle";
import Login from "./components/LoginComponent";
import Profile from "./components/ProfileComponent";
import Register from "./components/RegisterComponent";
import Toolbar from '@material-ui/core/Toolbar';
import TotalPaymentByVehicle from './components/paymentComponents/TotalPaymentByVehicle';
import TotalRevenue from './components/paymentComponents/TotalRevenue';
import Typography from '@material-ui/core/Typography';
import UpdateBooking from "./components/bookingComponents/UpdateBooking";
import UpdateCustomer from './components/customerComponents/UpdateCustomer';
import UpdateVehicle from "./components/vehicleComponents/UpdateVehicle";
import UserList from "./components/userComponents/UserList"
import ViewBookings from "./components/bookingComponents/ViewBookings";
import ViewCustomers from './components/customerComponents/ViewCustomers';
import ViewPayments from './components/paymentComponents/ViewPayments';
import ViewVehicles from "./components/vehicleComponents/ViewVehicles";
import { clearMessage } from "./actions/message";
import { connect } from "react-redux";
import { history } from './helpers/history';
import { logout } from "./actions/auth";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <AppBar position="static">
            <Toolbar>
              {/* <HomeIcon style={{ marginRight: "10px" }}/> */}
              <Typography variant="h6"><Link to={"/"} style={{ color: 'white' }}>
                Vehicle Management Application
            </Link></Typography>

              {showAdminBoard && <Typography style={{ margin: "10px" }}>
                <Link to={"/users"} style={{ color: 'white' }}>Users</Link></Typography>}
              <Typography style={{ margin: "10px" }}>
                <Link to={"/viewCustomers"} style={{ color: 'white' }}>Customers</Link></Typography>
              <Typography style={{ margin: "10px" }}>
                <Link to={"/viewBooking"} style={{ color: 'white' }}>Bookings</Link></Typography>
              <Typography style={{ margin: "10px" }}>
                <Link to={"/viewVehicles"} style={{ color: 'white' }}>Vehicles</Link></Typography>
              <Typography style={{ margin: "10px" }}>
                <Link to={"/viewPayment"} style={{ color: 'white' }}>Payments</Link></Typography>

              {currentUser ? (
                <div style={{ marginLeft: 'auto', display: 'flex' }}>
                  <Typography variant="h6" style={{ margin: "10px" }}>
                    <Link to={"/profile"} style={{ color: 'white' }}>
                      {currentUser.username}
                    </Link>
                  </Typography>
                  <Typography variant="h6" style={{ margin: "10px" }}>
                    <a href="/login" style={{ color: 'white' }} onClick={this.logOut}>
                      LogOut
                  </a>
                  </Typography>
                </div>
              ) : (
                  <div style={{ marginLeft: 'auto', display: 'flex' }}>
                    <Typography variant="h6" style={{ margin: "10px" }}>
                      <Link to={"/login"} style={{ color: 'white' }}>
                        Login
                  </Link>
                    </Typography>

                    <Typography variant="h6" style={{ margin: "10px" }}>
                      <Link to={"/register"} style={{ color: 'white' }}>
                        SignUp
                  </Link>
                    </Typography>
                  </div>
                )}
            </Toolbar>
          </AppBar>

          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Login} />
              <Route exact path="/login" component={Login} />
              <Route path="/users" component={UserList}></Route>
              <Route path="/add-user/:id" component={AddUser}></Route>
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/viewBooking"><ViewBookings /></Route>
              <Route path="/addBooking"><AddBooking /></Route>
              <Route path="/updateBooking/:id" component={UpdateBooking} />
              <Route path="/detailViewBooking/:id" component={DetailViewBooking} />
              <Route path="/viewCustomers"><ViewCustomers /></Route>
              <Route path="/addCustomer"><AddCustomer /></Route>
              <Route path="/updateCustomer/:id" component={UpdateCustomer} />
              <Route path="/detailViewCustomer/:id" component={DetailViewCustomer} />
              <Route path="/viewPayment"><ViewPayments /></Route>
              <Route path="/addPayment"><AddPayment /></Route>
              <Route path="/viewTotalRevenue"><TotalRevenue /></Route>
              <Route path="/detailViewPayment/:id" component={DetailViewPayment} />
              <Route path="/viewTotalPaymentByVehicle"><TotalPaymentByVehicle /></Route>
              <Route path="/viewVehicles"><ViewVehicles /></Route>
              <Route path="/addVehicle"><AddVehicle /></Route>
              <Route path="/updateVehicle/:id" component={UpdateVehicle} />
              <Route path="/detailViewVehicle/:id" component={DetailViewVehicle} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
