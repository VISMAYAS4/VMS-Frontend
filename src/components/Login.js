import { NavBar } from "./AppBar"
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Button, Typography, Paper, Container } from '@material-ui/core';
export default class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    handleChange = e => {
        this.setState({ [e.currentTarget.id]: e.currentTarget.value });
    };

    render() {
        return (
            <div className="App">
                <Container maxWidth="sm" >
                    <Paper elevation={5} style={{ padding: 8, justifyContent: "center", display: "flex" }} >
                <form className="form">
                   
                    <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Email Id</Typography>
                    <input type="text" ref={this.email} placeholder="Enter emailId" name="email" required /><br></br><br></br>
                    <Typography variant="h6" style={{ width: 'fit-content', margin: '' }}>Password</Typography>
                    <input type="password" ref={this.password} placeholder="Enter password" name="password" required /><br></br><br></br>

                    <Button variant="contained" color="primary">
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
                        Log in
          </Link></Button>
                </form>
                </Paper>
                </Container>
            </div>
        );
    }
}
