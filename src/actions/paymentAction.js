import authHeader from "../services/auth-header";

export const _addPayment = (msg) => {
    return { type: "ADD_PAYMENT", payload: { message: msg } }
}

export const addPayment = (payload) => {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/payments', requestOptions)
            .then(res => {
                if (res.status === 201) {
                    dispatch(_addPayment("Successfully added payment!!"))
                }else {
                    dispatch(_addPayment("Adding payment failed!!"))
                }
                setTimeout(() => {
                    dispatch(_addPayment(""));
                }, 3000);
            })
    }
}

export const _fetchPayments = (payload) => {
    return { type: "FETCH_PAYMENTS", payload: payload }
}

export const fetchPayments = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/payments', requestOptions)
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch(_fetchPayments(data));
            })
    }
}

export const _deletePayment = (msg) => {
    return { type: "DELETE_PAYMENT", payload: { message: msg }  }

}

export const deletePayment = (paymentId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return dispatch => {
        fetch("http://localhost:8081/api/v1/payments/" + paymentId, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    dispatch(fetchPayments())
                    dispatch(_deletePayment("Successfully deleted payment!!"))
                }else {
                    dispatch(_deletePayment("Payment cannot be deleted after booking"))
                }
                setTimeout(() => {
                    dispatch(_deletePayment(""));
                }, 3000);
            })

    }
}

export const _fetchPaymentByID = (payload) => {
    return { type: "VIEW_PAYMENT_ID", payload: payload }
}


export const fetchPaymentByID = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/payments/' + payload,requestOptions )
            .then(res =>
                res.json()
            )
            .then(data => {
                dispatch(_fetchPaymentByID(data));
            }).catch(
                error => {
                    console.log(error)
                }
            )
    }
}

export const _fetchPaymentByBooking = (payload) => {
    return { type: "VIEW_PAYMENT_BOOKING", payload: payload }
}


export const fetchPaymentByBooking = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/paymentByBooking' + payload,requestOptions )
            .then(res =>
                res.json()
            )
            .then(data => {
                dispatch(_fetchPaymentByBooking(data));
            }).catch(
                error => {
                    console.log(error)
                }
            )
    }
}

export const _fetchPaymentByVehicle = (payload) => {
    return { type: "VIEW_PAYMENT_VEHICLE", payload: payload }
}

export const fetchPaymentByVehicle = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/paymentsByVehicle'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }        
        })
        .then(data => {
            dispatch(_fetchPaymentByVehicle(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}

export const _fetchTotalPaymentByVehicle = (payload) => {
    return { type: "VIEW_TOTALPAYMENT_VEHICLE", payload: payload }
}

export const fetchTotalPaymentByVehicle = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/totalPaymentByVehicle/'+payload.vehicleId   , requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }
        })
        .then(data => {
            dispatch(_fetchTotalPaymentByVehicle(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}

export const _fetchTotalRevenue = (payload) => {
    return { type: "VIEW_PAYMENT_TOTALREVENUE", payload: payload }
}

export const fetchTotalRevenue = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch(`http://localhost:8081/api/v1/calculateMonthlyRevenue/${payload.paymentDate1}/${payload.paymentDate2}` , requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }
        })
        .then(data => {
            dispatch(_fetchTotalRevenue(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}

export const _fetchPaymentByCustomerEmail = (payload) => {
    return { type: "VIEW_PAYMENT_CUSTOMER_EMAIL", payload: payload }
}

export const fetchPaymentByCustomerEmail = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/paymentsByCustomerEmail/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }        
        })
        .then(data => {
            dispatch(_fetchPaymentByCustomerEmail(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}