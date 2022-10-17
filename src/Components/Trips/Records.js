import React from "react";
import { useState } from "react";
import Accordian from "./Accordian";

const Records = ({ data, headers }) => {
  return (
    <React.Fragment>
      <table className="table" id="my-table">
        <thead>
          <tr>
            {headers.map((data) => (
              <th scope="col">{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <Accordian
              id={index}
              car_info={item.car_info}
              total_trip_time={item.total_trip_time}
              drop_time={item.drop_time}
              pickup_time={item.pickup_time}
              trip_date={item.trip_date}
              journey_id={item.journey_id}
              driver_name={item.driver_name}
              total_trip_km={item.total_trip_km}
            />
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Records;
