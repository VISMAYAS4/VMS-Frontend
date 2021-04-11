import auth from "./auth";
import bookingReducer from "./bookingReducer";
import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import message from "./message";
import paymentReducer from "./paymentReducer";
import vehicleReducer from "./vehicleReducer";

export default combineReducers({
  auth,
  message,
  bookingsData:bookingReducer,
  customersData:customerReducer,
  vehiclesData: vehicleReducer,
  paymentsData: paymentReducer
});
