import React, { useContext, useEffect, useState } from "react";
import { Button, Card, DatePicker, Form, Select, message } from "antd";
import dayjs from "dayjs";
import moment from "moment";

import { BookingCtx } from "../../../../context/booking-context";
import BookingTotal from "./BookingTotal";
import useUpdateBooking from "../custom-hooks/use-update-booking";
import useCreateNewBookingExistingBookedProperty from "../custom-hooks/use-create-new-booking-existing-booked-propery";
import useCreateNewBooking from "../custom-hooks/use-create-new-booking";

const { RangePicker } = DatePicker;

export default function BookingForm({
  property,
  booking,
  isModalOpen,
  isEdit,
  handleCancel,
}) {
  const [form] = Form.useForm();

  const {
    state: { myBookings, selectedPropertyId, selectedBookingId },
  } = useContext(BookingCtx);

  const availableFromDate = moment(property.availableFromDate);

  const [numberOfNights, setNumberOfNights] = useState(null);
  const [startDates, setStartDates] = useState(null);
  const [endDates, setEndDates] = useState(null);

  const updateBooking = useUpdateBooking(property, numberOfNights);

  const createNewBooking = useCreateNewBooking(property, numberOfNights);

  const createNewBookingToExistingProperty =
    useCreateNewBookingExistingBookedProperty(property, numberOfNights);

  useEffect(() => {
    if (isEdit) {
      const selectedBooking = booking?.bookings.find(
        (item) => item.bookingId === selectedBookingId
      );

      if (selectedBooking) {
        const startDate = selectedBooking.range[0];
        const endDate = selectedBooking.range[1];

        setNumberOfNights(selectedBooking.numberOfNights);

        form.setFieldsValue({
          guests: selectedBooking.guests,
          range: [dayjs(startDate), dayjs(endDate)],
        });
      }
    }
  }, [booking, form, isModalOpen, isEdit, selectedBookingId]);

  const handleSubmission = (values) => {
    const { range } = values;

    const allDatesWithinRange = [];
    let currentDate = range[0];

    while (currentDate <= range[1]) {
      allDatesWithinRange.push(currentDate.format());
      currentDate = currentDate.add(1, "day");
    }

    const isRangeValid = allDatesWithinRange.every(
      (date) => !disabledDates.has(date)
    );

    if (!isRangeValid) {
      message.error(
        "Selected dates are not available. Please choose a different period."
      );
      return;
    }

    const existingBookingIndex = myBookings.findIndex(
      (booking) => booking.id === selectedPropertyId
    );

    if (existingBookingIndex !== -1) {
      if (isEdit) {
        updateBooking(values);
      } else {
        createNewBookingToExistingProperty(values);
      }
    } else {
      createNewBooking(values);
    }

    handleCancel();
  };

  const setSelectedRange = (dates) => {
    const startDate = dates[0];
    const endDate = dates[1];

    setStartDates(startDate);
    setEndDates(endDate);

    const diffInDays = endDate.diff(startDate, "days");
    const totalNights = diffInDays > 0 ? diffInDays : 0;
    setNumberOfNights(totalNights);
  };

  const generateDisabledDates = (booking) => {
    const disabledDates = new Set();
    booking &&
      booking.bookings.forEach((bk) => {
        if (!isEdit || bk.bookingId !== selectedBookingId) {
          const [startDate, endDate] = bk.range;
          const start = moment(startDate);
          const end = moment(endDate);

          while (start <= end) {
            disabledDates.add(start.format());
            start.add(1, "day");
          }
        }
      });
    return disabledDates;
  };

  const disabledDates = generateDisabledDates(booking);

  const disabledDate = (current) => {
    return (
      (current && current < availableFromDate.startOf("day")) ||
      disabledDates.has(current.format())
    );
  };

  const customCellRender = (value) => {
    const date = value.format();
    const isDisabled = disabledDates.has(date);
    const isStartDisabled = isDisabled && value.isSame(startDates);
    const isEndDisabled = isDisabled && value.isSame(endDates);

    return (
      <div
        className="ant-picker-cell-inner"
        style={
          isStartDisabled || isEndDisabled ? { pointerEvents: "none" } : {}
        }
      >
        {value.date()}
      </div>
    );
  };

  return (
    <Card>
      <p className="booking__content-price">
        <strong>${property.pricePerNight}</strong> per night
      </p>
      <Form
        form={form}
        initialValues={{ guests: 1, range: undefined }}
        onFinish={handleSubmission}
        layout="vertical"
      >
        <Form.Item
          label="Checkin"
          name="range"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RangePicker
            disabledDate={disabledDate}
            onChange={setSelectedRange}
            cellRender={customCellRender}
            allowClear={false}
            inline
          />
        </Form.Item>
        <Form.Item name="guests" label="Guests" value>
          <Select
            placeholder="Select an option"
            allowClear
            options={Array.from({ length: 10 }, (_, i) => i + 1).map((i) => ({
              value: i,
              label: `${i} guest${i > 1 ? "s" : ""}`,
            }))}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          {isEdit ? "Update" : "Create"} booking
        </Button>

        {numberOfNights && (
          <BookingTotal property={property} numberOfNights={numberOfNights} />
        )}
      </Form>
    </Card>
  );
}
