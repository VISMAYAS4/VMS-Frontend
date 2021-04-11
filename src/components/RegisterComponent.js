import React, { Component } from "react";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CheckButton from "react-validation/build/button";
import CssBaseline from '@material-ui/core/CssBaseline';
import Form from "react-validation/build/form";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    height: '75vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: '#cc0000',
    marginBottom: 12,
  }
});


class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      successful: false,
      message: "",
      fields: {},
      errors: {}
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });

  }

  submitForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.handleRegister(e);
      this.setState({ fields: { ...this.state.fields, username: '', password: '', emailid: '' } })
    }
    

  }

  validateForm() {

    let fields = { ...this.state.fields };
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
    }

    if (typeof fields["username"] !== "undefined") {
      if (fields["username"].length < 3 || fields["username"].length > 20) {
        formIsValid = false;
        errors["username"] = "*The username must be between 3 and 20 characters.";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;
      errors["emailid"] = "*Please enter your email-ID.";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;
        errors["emailid"] = "*Please enter valid email-ID.";
      }
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    if (typeof fields["password"] !== "undefined") {
      if (fields["password"].length < 6 || fields["password"].length > 20) {
        formIsValid = false;
        errors["password"] = "*The password must be between 6 and 20 characters.";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.fields.username, this.state.fields.emailid, this.state.fields.password)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;
    const { classes } = this.props;

    return (
      <div className="container mt-3 ">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
          </Typography>

            <Form
              onSubmit={this.submitForm}
              className={classes.form}
            >
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.fields.username}
                  onChange={this.handleChange}
                />
                <div className={classes.error}>{this.state.errors.username}</div>


                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="emailid"
                  label="EmailId"
                  name="emailid"
                  autoComplete="username"
                  autoFocus
                  value={this.state.fields.emailid}
                  onChange={this.handleChange}
                />
                <div className={classes.error}>{this.state.errors.emailid}</div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.fields.password}
                  onChange={this.handleChange}
                />

                <div className={classes.error}>{this.state.errors.password}</div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={this.state.loading}
                  className={classes.submit}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
              Sign Up
            </Button>
                <Grid container>
                  <Grid item>
                    <a href="/login" >
                      {"Already have an account? Sign In"}
                    </a>
                  </Grid>
                </Grid>
              </div>



              {message && (
                <div className="form-group">
                  <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </Grid>
      </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message
  };
}

export default connect(mapStateToProps)(withStyles(styles)(TestComponent));
