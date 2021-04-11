import authHeader from "../services/auth-header";

export const _addBooking = (msg) => {
    return { type: "ADD_BOOKING", payload: { message: msg } }
}

export const addBooking = (payload) => {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookings', requestOptions)
            .then(res => {
                if (res.status === 201) {
                    dispatch(_addBooking("Successfully added booking!!"))
                }else {
                    dispatch(_addBooking("Adding booking failed!! Invalid customer name."))
                }
                setTimeout(() => {
                    dispatch(_addBooking(""));
                }, 3000);
            })
    }
}

export const _fetchBookings = (payload) => {
    return { type: "FETCH_BOOKINGS", payload: payload }
}

export const fetchBookings = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookings', requestOptions)
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch(_fetchBookings(data));
            })
    }
}

export const _deleteBooking = (msg) => {
    return { type: "DELETE_BOOKING", payload: { message: msg }  }

}

export const deleteBooking = (bookingId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return dispatch => {
        fetch("http://localhost:8081/api/v1/bookings/" + bookingId, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    dispatch(fetchBookings())
                    dispatch(_deleteBooking("Successfully deleted booking!!"))
                }else {
                    dispatch(_deleteBooking("Booking with payment cannot be deleted"))
                }
                setTimeout(() => {
                    dispatch(_deleteBooking(""));
                }, 3000);
            })

    }
}

export const _updateBooking = (msg) => {
    return { type: "UPDATE_BOOKING", payload: { message: msg } }
}

export const updateBooking = (payload) => {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookings/', requestOptions)
            .then(res => {
                if (res.status === 202) {
                    dispatch(_updateBooking("Successfully updated booking!!"));
                }else {
                    dispatch(_updateBooking("Updating booking failed!!"))
                }
                setTimeout(() => {
                    dispatch(_updateBooking(""));
                }, 3000);
            })
    }

}

export const _fetchBookingByID = (payload) => {
    return { type: "VIEW_BOOKING_ID", payload: payload }
}


export const fetchBookingByID = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookings/' + payload,requestOptions )
            .then(res =>
                res.json()
            )
            .then(data => {
                dispatch(_fetchBookingByID(data));
            }).catch(
                error => {
                    console.log(error)
                }
            )
    }
}

export const _fetchBookingByCustomer = (payload) => {
    return { type: "VIEW_BOOKING_CUSTOMER", payload: payload }
}

export const fetchBookingByCustomer = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookingsByCustomer/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }        
        })
        .then(data => {
            dispatch(_fetchBookingByCustomer(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}


export const _fetchBookingByVehicle = (payload) => {
    return { type: "VIEW_BOOKING_VEHICLE", payload: payload }
}

export const fetchBookingByVehicle = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookingsByVehicle/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }
        })
        .then(data => {
            dispatch(_fetchBookingByVehicle(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}

export const _fetchBookingByDate = (payload) => {
    return { type: "VIEW_BOOKING_DATE", payload: payload }
}

export const fetchBookingByDate = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookingsByDate/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }
        })
        .then(data => {
            dispatch(_fetchBookingByDate(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}

export const _fetchBookingByCustomerEmail = (payload) => {
    return { type: "VIEW_BOOKING_CUSTOMER_EMAIL", payload: payload }
}

export const fetchBookingByCustomerEmail = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/bookingsByCustomerEmail/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }        
        })
        .then(data => {
            dispatch(_fetchBookingByCustomerEmail(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}