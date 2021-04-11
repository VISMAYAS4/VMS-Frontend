const initialState = {
    message: '',
    customers: [],
    customer: []
}

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_CUSTOMER":
            return { ...state, message: payload.message, customers: state.customers };
        case "FETCH_CUSTOMERS":
            return { ...state, customers: payload };
        case "DELETE_CUSTOMER":
            return { ...state, message: payload.message };
        case "UPDATE_CUSTOMER":
            return { ...state, message: payload.message, customers: state.customers };
        case "VIEW_CUSTOMER_ID":
            return { ...state, customer: payload };
        case "VIEW_CUSTOMER_BY_VTYPE":
            return { ...state, customers: payload };
        case "VIEW_CUSTOMER_VEHICLE_LOCATION":
            return { ...state, customers: payload };
        default:
            return state
    }
}

export default reducer;