import authHeader from "../services/auth-header";

// Add Customers
export const addcustomer = (msg) => {
    return { type: "ADD_CUSTOMER", payload: { message: msg } }
}

export const addCustomer = (payload) => {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customers', requestOptions)
            .then(res => {
                if (res.status === 201) {
                    dispatch(addcustomer("Successfully added customer!!"))
                }else {
                    dispatch(addcustomer("Adding customer failed!!"))
                }
                setTimeout(() => {
                    dispatch(addcustomer(""));
                }, 3000);
            })
    }
}


// Fetching Customers
export const fetchcustomers = (payload) => {
    return { type: "FETCH_CUSTOMERS", payload: payload }
}

export const fetchCustomers = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customers', requestOptions)
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch(fetchcustomers(data));
            })
    }
}

// Delete Customers
export const removeCustomer = (msg) => {
    return { type: "DELETE_CUSTOMER", payload: { message: msg }  }

}

export const deleteCustomer = (customerId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return dispatch => {
        fetch("http://localhost:8081/api/v1/customers/" + customerId, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    dispatch(fetchCustomers())
                    dispatch(removeCustomer("Successfully deleted customer !!!"))
                }else {
                    dispatch(removeCustomer("Customer not deleted"))
                }
                setTimeout(() => {
                    dispatch(removeCustomer(""));
                }, 3000);
            })

    }
}


// Update Customers
export const editCustomer = (msg) => {
    return { type: "UPDATE_CUSTOMER", payload: { message: msg } }
}

export const updateCustomer = (payload) => {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customers/', requestOptions)
            .then(res => {
                if (res.status === 202) {
                    dispatch(editCustomer("Successfully updated customer !!!"));
                }else {
                    dispatch(editCustomer("Updating customer failed !!!"))
                }
                setTimeout(() => {
                    dispatch(editCustomer(""));
                }, 3000);
            })
    }

}


// Fetch Customer By ID
export const fetchCustomerBy_ID = (payload) => {
    return { type: "VIEW_CUSTOMER_ID", payload: payload }
}


export const fetchCustomerByID = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customers/' + payload,requestOptions )
            .then(res =>
                res.json()
            )
            .then(data => {
                dispatch(fetchCustomerBy_ID(data));
            }).catch(
                error => {
                    console.log(error)
                }
            )
    }
}


// Fetching Customers By Vehicle Type
export const fetchCustomerBy_Vtype = (payload) => {
    return { type: "VIEW_CUSTOMER_BY_VTYPE", payload: payload }
}

export const fetchCustomerByVtype = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customerByVehicleType/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }        
        })
        .then(data => {
            dispatch(fetchCustomerBy_Vtype(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}


// Fetching Customers By Vehicle Location
export const fetchCustomerBy_VehicleLocation = (payload) => {
    return { type: "VIEW_CUSTOMER_VEHICLE_LOCATION", payload: payload }
}

export const fetchCustomerByVehicleLocation = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customerByVehicleLocation/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }
        })
        .then(data => {
            dispatch(fetchCustomerBy_VehicleLocation(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}

// Fetching Customers By Email
export const fetchByCustomer_Email = (payload) => {
    return { type: "VIEW_CUSTOMER_EMAIL", payload: payload }
}
export const fetchByCustomerEmail = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/customerByCustomerEmail/'+payload, requestOptions)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                console.log("Error");
            }        
        })
        .then(data => {
            dispatch(fetchByCustomer_Email(data));
        }).catch(err=>{
            console.warn(err)
        })
    }
}
