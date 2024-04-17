import React from "react";
import { Divider } from "antd";

export default function BookingTotal({ property, numberOfNights }) {
  return (
    <>
      <div className="booking__content-sum">
        <p>
          <u>
            ${property.pricePerNight} x {numberOfNights} night
            {numberOfNights > 1 ? "s" : ""}
          </u>
        </p>

        <p>${property.pricePerNight * numberOfNights}</p>
      </div>

      <div className="booking__content-sum -fee">
        <p>
          <u>Service fee:</u>
        </p>
        <p>
          $
          {(property.pricePerNight * numberOfNights * 0.3)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>

      <Divider />

      <div className="booking__content-sum -total">
        Total:{" "}
        <span>
          $
          {(property.pricePerNight * numberOfNights * 1.3)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </span>
      </div>
    </>
  );
}
