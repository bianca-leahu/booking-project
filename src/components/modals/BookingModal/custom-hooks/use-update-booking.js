import { useContext } from "react";
import { message } from "antd";

import { BookingCtx } from "../../../../context/booking-context";

const useUpdateBooking = (property, numberOfNights) => {
  const {
    state: { myBookings, selectedPropertyId, selectedBookingId },
    dispatch,
  } = useContext(BookingCtx);

  const updateBooking = (values) => {
    values.range = [values.range[0].format(), values.range[1].format()];
    const updatedBookings = [...myBookings];
    const totalPrice = property.pricePerNight * numberOfNights * 1.3;

    const existingBookingIndex = myBookings.findIndex(
      (booking) => booking.id === selectedPropertyId
    );

    if (!Array.isArray(updatedBookings[existingBookingIndex].bookings)) {
      updatedBookings[existingBookingIndex].bookings = [];
    }

    const existingBookingIndexInProperty = updatedBookings[
      existingBookingIndex
    ].bookings.findIndex((booking) => booking.bookingId === selectedBookingId);

    if (existingBookingIndexInProperty !== -1) {
      updatedBookings[existingBookingIndex].bookings[
        existingBookingIndexInProperty
      ] = {
        ...values,
        id: selectedPropertyId,
        bookingId: selectedBookingId,
        totalPrice,
        numberOfNights,
      };
    }

    dispatch({
      type: "SET_MY_BOOKINGS",
      payload: updatedBookings,
    });

    message.success("Booking updated successfully");
  };

  return updateBooking;
};

export default useUpdateBooking;
