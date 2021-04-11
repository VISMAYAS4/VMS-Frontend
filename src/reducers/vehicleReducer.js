const initialState = {
    message: '',
    vehicles: [],
    vehicle: []
}

const vehicleReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "FETCH_VEHICLES":
            return { ...state, vehicles: payload };
        case "ADD_VEHICLE":
            return { ...state, message: payload.message, vehicles: state.vehicles };
        case "DELETE_VEHICLE":
            return { ...state, message: payload.message };
        case "UPDATE_VEHICLE":
            return { ...state, message: payload.message, vehicles: state.vehicles };
        case "VIEW_VEHICLE_ID":
            return { ...state, vehicle: payload };
        default:
            return state
    }
}

export default vehicleReducer;