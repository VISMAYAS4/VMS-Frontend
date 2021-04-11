import React, { Component } from 'react'

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Dashboard extends Component {
    render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }
        
        return (
            <div>
                Dashboard 
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.auth.isLoggedIn
    }
}


const mapDispatchToState = (dispatch) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToState)(Dashboard);
