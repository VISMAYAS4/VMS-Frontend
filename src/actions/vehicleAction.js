import authHeader from "../services/auth-header";

export const _fetchVehicles = (payload) => {
    return { type: "FETCH_VEHICLES", payload: payload }
}

export const fetchVehicles = () => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/viewAllVehicles', requestOptions)
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch(_fetchVehicles(data));
            })
    }
}

export const add_vehicle = (msg) => {

    return { type: "ADD_VEHICLE", payload: { message: msg } }
}

export const addVehicle = (payload) => {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    console.log(payload)
    return dispatch => {
        fetch('http://localhost:8081/api/v1/vehicles', requestOptions)
            .then(res => {
                if (res.status === 201) {
                    dispatch(add_vehicle("Successfully added vehicle!!"))
                }else {
                    dispatch(add_vehicle("Adding vehicle failed!!"))
                }
                setTimeout(() => {
                    dispatch(add_vehicle(""));
                }, 3000);
            })
    }
}

export const removeVehicle = (msg) => {
    return { type: "DELETE_VEHICLE", payload: { message: msg }  }

}

export const deleteVehicle = (vehicleId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return dispatch => {
        fetch("http://localhost:8081/api/v1/vehicles/" +vehicleId, requestOptions)
            .then(res => {
                if (res.status === 200) {
                    dispatch(fetchVehicles())
                    dispatch(removeVehicle("Successfully deleted vehicle !!!"))
                }else {
                    console.log("RES", res)
                    dispatch(removeVehicle("Vehicle not deleted"))
                }
                setTimeout(() => {
                    dispatch(removeVehicle(""));
                }, 3000);
            })

    }
}

export const editVehicle= (msg) => {
    return { type: "UPDATE_VEHICLE", payload: { message: msg } }
}

export const updateVehicle = (payload) => {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(payload)
    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/vehicles/', requestOptions)
            .then(res => {
                console.log(res)
                if (res.status === 202) {
                    dispatch(editVehicle("Successfully updated vehicle !!!"));
                }else {
                    dispatch(editVehicle("Updating vehicle failed !!!"))
                }
                setTimeout(() => {
                    dispatch(editVehicle(""));
                }, 3000);
            })
    }

}

export const _fetchVehicleByID = (payload) => {
    return { type: "VIEW_Vehicle_ID", payload: payload }
}


export const fetchVehicleByID = (payload) => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),

    };
    return dispatch => {
        fetch('http://localhost:8081/api/v1/vehicles/' + payload,requestOptions )
            .then(res =>
                res.json()
            )
            .then(data => {
                dispatch(_fetchVehicleByID(data));
            }).catch(
                error => {
                    console.log(error)
                }
            )
    }
}