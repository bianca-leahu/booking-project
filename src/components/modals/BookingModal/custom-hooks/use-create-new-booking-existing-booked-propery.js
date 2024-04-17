import { useContext } from "react";
import { message } from "antd";

import { BookingCtx } from "../../../../context/booking-context";

const useCreateNewBookingExistingBookedProperty = (
  property,
  numberOfNights
) => {
  const {
    state: { myBookings, selectedPropertyId },
    dispatch,
  } = useContext(BookingCtx);

  const createNewBookingToExistingProperty = (values) => {
    values.range = [values.range[0].format(), values.range[1].format()];

    const bookingId = Math.random().toString(36).slice(2, 11);
    const totalPrice = property.pricePerNight * numberOfNights * 1.3;

    const existingBookingIndex = myBookings.findIndex(
      (booking) => booking.id === selectedPropertyId
    );

    if (existingBookingIndex !== -1) {
      if (!Array.isArray(myBookings[existingBookingIndex].bookings)) {
        myBookings[existingBookingIndex].bookings = [];
      }

      myBookings[existingBookingIndex].bookings.push({
        ...values,
        id: selectedPropertyId,
        bookingId,
        totalPrice,
        numberOfNights,
      });

      dispatch({
        type: "SET_MY_BOOKINGS",
        payload: myBookings,
      });

      message.success("Booking was created successfully");
    }
  };

  return createNewBookingToExistingProperty;
};

export default useCreateNewBookingExistingBookedProperty;
