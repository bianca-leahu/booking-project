import React, { useContext } from "react";
import { Modal, message } from "antd";

import { BookingCtx } from "../../../context/booking-context";

export default function DeleteBookingModal({
  isDeleteModalOpen,
  handleCancel,
}) {
  const {
    state: { myBookings, selectedBookingId },
    dispatch,
  } = useContext(BookingCtx);

  const deleteBooking = () => {
    const bookingIndex = myBookings.findIndex((bookingEntry) =>
      bookingEntry.bookings.some(
        (booking) => booking.bookingId === selectedBookingId
      )
    );

    if (bookingIndex !== -1) {
      const updatedBookings = [...myBookings];
      const bookingToRemoveIndex = updatedBookings[
        bookingIndex
      ].bookings.findIndex(
        (booking) => booking.bookingId === selectedBookingId
      );

      if (bookingToRemoveIndex !== -1) {
        updatedBookings[bookingIndex].bookings.splice(bookingToRemoveIndex, 1);

        if (updatedBookings[bookingIndex].bookings.length === 0) {
          updatedBookings.splice(bookingIndex, 1);
        }

        dispatch({
          type: "SET_MY_BOOKINGS",
          payload: updatedBookings,
        });

        message.success("Booking deleted successfully");
      } else {
        message.error("Booking not found");
      }
    } else {
      message.error("Property not found");
    }
    handleCancel();
  };

  return (
    <Modal
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      title="Delete booking"
      okText="Delete"
      onOk={deleteBooking}
      okButtonProps={{ danger: true }}
      centered
    >
      Are you sure you want to delete this booking?
    </Modal>
  );
}
