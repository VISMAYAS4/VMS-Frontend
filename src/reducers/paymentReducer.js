const initialState = {
    message: '',
    payments: [],
    payment: [],
    revenue: null,
    paymentByVehicle: null
}

const paymentReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_PAYMENT":
            return { ...state, message: payload.message, payments: state.payments };
        case "FETCH_PAYMENTS":
            return { ...state, payments: payload };
        case "DELETE_PAYMENT":
            return { ...state, message: payload.message };
        case "VIEW_PAYMENT_BOOKING":
            return { ...state, payment: payload };
        case "VIEW_PAYMENT_VEHICLE":
            return { ...state, payments: payload };
        case "VIEW_TOTALPAYMENT_VEHICLE":
            return { ...state, paymentByVehicle: payload };
        case "VIEW_PAYMENT_REVENUE":
            return { ...state, payments: payload };
        case "VIEW_PAYMENT_TOTALREVENUE":
            return { ...state, revenue: payload };
        case "VIEW_PAYMENT_CUSTOMER_EMAIL":
            return { ...state, payments : payload };
        default:
            return state
    }
}

export default paymentReducer;