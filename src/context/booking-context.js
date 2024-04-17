import React, { createContext, useReducer } from "react";

export const BookingCtx = createContext();

const initialState = {
  myBookings: [],
  selectedPropertyId: null,
  selectedBookingId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_MY_BOOKINGS":
      return {
        ...state,
        myBookings: action.payload,
      };
    case "SET_SELECTED_PROPERTY_ID":
      return {
        ...state,
        selectedPropertyId: action.payload,
      };
    case "SET_SELECTED_BOOKING_ID":
      return {
        ...state,
        selectedBookingId: action.payload,
      };
    case "RESET_STORE":
      return initialState;
    default:
      return state;
  }
}

export function BookingCtxProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}
