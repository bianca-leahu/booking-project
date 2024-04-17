import React, { useContext } from "react";
import { Card, Col } from "antd";

import { BookingCtx } from "../../../context/booking-context";

const { Meta } = Card;

export default function PropertyItem({
  property,
  isBookingModalOpen,
  setIsBookingModalOpen,
}) {
  const { dispatch } = useContext(BookingCtx);

  return (
    <Col className="homepage__property" xs={24} sm={12} md={8} lg={6} span={6}>
      <Card
        hoverable
        cover={
          <img
            className="homepage__property-image"
            alt={property.name}
            src={property.image}
          />
        }
        onClick={() => {
          dispatch({ type: "SET_SELECTED_PROPERTY_ID", payload: property.id });
          setIsBookingModalOpen(!isBookingModalOpen);
        }}
      >
        <Meta
          title={property.name}
          description={
            <div>
              {property.location.city}, {property.location.country}
            </div>
          }
        />
        <div className="homepage__property-price">
          Price per night: ${property.pricePerNight}
        </div>
      </Card>
    </Col>
  );
}
