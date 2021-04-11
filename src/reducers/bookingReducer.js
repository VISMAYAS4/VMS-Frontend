const initialState = {
    message: '',
    bookings: [],
    booking: []
}

const bookingReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "ADD_BOOKING":
            return { ...state, message: payload.message, bookings: state.bookings };
        case "FETCH_BOOKINGS":
            return { ...state, bookings: payload };
        case "DELETE_BOOKING":
            return { ...state, message: payload.message };
        case "UPDATE_BOOKING":
            return { ...state, message: payload.message, bookings: state.bookings };
        case "VIEW_BOOKING_ID":
            return { ...state, booking: payload };
        case "VIEW_BOOKING_CUSTOMER":
            return { ...state, bookings: payload, message: payload.message };
        case "VIEW_BOOKING_VEHICLE":
            return { ...state, bookings: payload, message: payload.message };
        case "VIEW_BOOKING_DATE":
            return { ...state, bookings: payload, message: payload.message };
        case "VIEW_BOOKING_CUSTOMER_EMAIL":
            return { ...state, bookings: payload };
        default:
            return state
    }
}

export default bookingReducer;