import { useState, useEffect, useContext } from "react";

import properties from "../assets/properties.json";
import { BookingCtx } from "../context/booking-context";

const useBookedProperties = () => {
  const {
    state: { myBookings },
  } = useContext(BookingCtx);

  const [bookedProperties, setBookedProperties] = useState([]);

  useEffect(() => {
    const getBookedProperties = () => {
      let bookedProps = [];
      myBookings.forEach((bookingEntry) => {
        bookingEntry.bookings.forEach((booking) => {
          const property = properties.find(
            (property) => property.id === booking.id
          );
          if (property) {
            bookedProps.push({
              property: property,
              range: booking.range,
              bookingId: booking.bookingId,
              total: booking.totalPrice,
              nights: booking.numberOfNights,
            });
          }
        });
      });
      return bookedProps;
    };

    setBookedProperties(getBookedProperties());
  }, [myBookings]);

  return bookedProperties;
};

export default useBookedProperties;
