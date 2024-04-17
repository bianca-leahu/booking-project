import React, { useContext, useState } from "react";
import { Modal, List, Avatar, Button, Empty, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

import { BookingCtx } from "../../../context/booking-context";
import DeleteBookingModal from "../DeleteBookingModal/DeleteBookingModal";
import BookingModal from "../BookingModal/BookingModal";
import useBookedProperties from "../../../custom-hooks/use-booked-properties";

import "./my-bookings-modal.scss";

export default function MyBookingsModal({
  isMyBookingsModalOpen,
  handleCancel,
}) {
  const { dispatch } = useContext(BookingCtx);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const bookedProperties = useBookedProperties();

  return (
    <Modal
      open={isMyBookingsModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"100%"}
      title="My Bookings"
      centered
      className="my-bookings-modal"
    >
      {bookedProperties.length ? (
        <List
          className="my-bookings-modal__list"
          itemLayout="horizontal"
          dataSource={bookedProperties}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Tooltip title="Edit booking">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => {
                      dispatch({
                        type: "SET_SELECTED_PROPERTY_ID",
                        payload: item.property.id,
                      });
                      dispatch({
                        type: "SET_SELECTED_BOOKING_ID",
                        payload: item.bookingId,
                      });
                      setIsBookingModalOpen(true);
                    }}
                  />
                </Tooltip>,
                <Tooltip title="Delete booking">
                  <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      dispatch({
                        type: "SET_SELECTED_BOOKING_ID",
                        payload: item.bookingId,
                      });
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </Tooltip>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.property.image} />}
                title={item.property.name}
                description={`${item.property.location.city}, ${item.property.location.country}`}
              />
              <div className="my-bookings-modal__list-description">
                <div>
                  {moment(item.range[0]).format("DD MMM YYYY")} -{" "}
                  {moment(item.range[1]).format("DD MMM YYYY")}
                </div>
                <div>
                  {item.nights} night{`${item.nights > 1 ? "s" : ""}`} -{" "}
                  <strong>
                    Total: $
                    {item.total
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty description={<h3>You don't have any bookings</h3>} />
      )}

      {isDeleteModalOpen && (
        <DeleteBookingModal
          handleCancel={() => setIsDeleteModalOpen(false)}
          isDeleteModalOpen={isDeleteModalOpen}
        />
      )}

      {isBookingModalOpen && (
        <BookingModal
          isModalOpen={isBookingModalOpen}
          handleCancel={() => setIsBookingModalOpen(!isBookingModalOpen)}
          isEdit
        />
      )}
    </Modal>
  );
}
