import React, { Fragment, useState } from "react";
import { Row, Button } from "antd";

import properties from "../../assets/properties.json";
import BookingModal from "../../components/modals/BookingModal/BookingModal";
import PropertyItem from "./components/PropertyItem";
import MyBookingsModal from "../../components/modals/MyBookingsModal/MyBookingsModal";

import "./homepage.scss";

export default function Homepage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingModalOpen, setIsMyBookingModalOpen] = useState(false);

  return (
    <div className="homepage">
      <div className="homepage__header">
        <h1>Properties</h1>
        <div className="homepage__header-manage">
          <Button
            type="primary"
            size="large"
            onClick={() => setIsMyBookingModalOpen(true)}
          >
            Manage my bookings
          </Button>
        </div>
      </div>

      <Row gutter={16}>
        {properties.map((property) => (
          <Fragment key={property.id}>
            <PropertyItem
              property={property}
              isBookingModalOpen={isBookingModalOpen}
              setIsBookingModalOpen={setIsBookingModalOpen}
            />
          </Fragment>
        ))}
      </Row>
      {isBookingModalOpen && (
        <BookingModal
          isModalOpen={isBookingModalOpen}
          handleCancel={() => setIsBookingModalOpen(!isBookingModalOpen)}
        />
      )}

      {isMyBookingModalOpen && (
        <MyBookingsModal
          isMyBookingsModalOpen={isMyBookingModalOpen}
          handleCancel={() => setIsMyBookingModalOpen(!isMyBookingModalOpen)}
        />
      )}
    </div>
  );
}
