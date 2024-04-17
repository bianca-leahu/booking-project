import React, { useContext, useState } from "react";
import { Tag, Modal } from "antd";
import { StarFilled, CalendarOutlined } from "@ant-design/icons";

import { BookingCtx } from "../../../context/booking-context";
import DeleteBookingModal from "../DeleteBookingModal/DeleteBookingModal";
import BookingForm from "./components/BookingForm";
import properties from "../../../assets/properties.json";

import "./booking-modal.scss";

export default function BookingModal({ isModalOpen, handleCancel, isEdit }) {
  const {
    state: { myBookings, selectedPropertyId },
  } = useContext(BookingCtx);

  const property = properties.find(
    (property) => property.id === parseInt(selectedPropertyId)
  );

  const booking = myBookings.find(
    (booking) => booking.id === parseInt(selectedPropertyId)
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"100%"}
      centered
      className="booking-modal"
    >
      <div className="booking">
        <div className="booking__header">
          <h1>{property.name}</h1>
        </div>

        <div className="booking__content">
          <div className="booking__content-image">
            <img src={property.image} alt={property.name} />
            {booking && (
              <Tag className="booking__content-booked">
                <CalendarOutlined style={{ marginRight: "5px" }} /> Booked
              </Tag>
            )}
          </div>
          <div className="booking__content-details">
            <div>
              <h3 className="booking__content-info">
                <span className="booking__content-type">
                  {property.type}&nbsp;
                </span>
                in {property.location.city}, {property.location.country}&nbsp;
                <span className="booking__content-rating">
                  <StarFilled style={{ color: "#FFBF00" }} /> {property.rating}
                </span>
              </h3>
              {property.amenities.map((amenity) => (
                <Tag key={amenity}>{amenity}</Tag>
              ))}
            </div>

            <BookingForm
              property={property}
              booking={booking}
              isModalOpen={isModalOpen}
              isEdit={isEdit}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </div>

      <DeleteBookingModal
        isDeleteModalOpen={isDeleteModalOpen}
        handleCancel={() => setIsDeleteModalOpen(false)}
      />
    </Modal>
  );
}
