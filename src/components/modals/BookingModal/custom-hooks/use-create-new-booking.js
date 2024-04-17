import { useContext } from "react";
import { message } from "antd";

import { BookingCtx } from "../../../../context/booking-context";

const useCreateNewBooking = (property, numberOfNights) => {
  const {
    state: { myBookings, selectedPropertyId },
    dispatch,
  } = useContext(BookingCtx);

  const createNewBooking = (values) => {
    values.range = [values.range[0].format(), values.range[1].format()];

    const bookingId = Math.random().toString(36).slice(2, 11);
    const totalPrice = property.pricePerNight * numberOfNights * 1.3;

    dispatch({
      type: "SET_MY_BOOKINGS",
      payload: [
        ...myBookings,
        {
          id: selectedPropertyId,
          bookings: [
            {
              ...values,
              id: selectedPropertyId,
              bookingId,
              totalPrice,
              numberOfNights,
            },
          ],
        },
      ],
    });
    message.success("Booking was created successfully");
  };

  return createNewBooking;
};

export default useCreateNewBooking;
