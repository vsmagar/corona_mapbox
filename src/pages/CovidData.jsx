import axios from "axios";
import React, { useEffect } from "react";
import "https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js";

const CovidData = () => {
  const mapbox_token =
    "pk.eyJ1IjoidmlzaGFsbWFnYXIiLCJhIjoiY2xlcHNnMjhuMDdtczNycGh4cXZzdWx1NiJ9.P7bAM4aRbCMMpG085qtzmw";

  mapboxgl.accessToken = mapbox_token;
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 1.5,
    center: [0, 20],
  });

  const getCount = (count) => {
    if (count >= 550000000) {
      return "red";
    }
    if (count >= 440000000) {
      return "blue";
    }
    if (count <= 440000000) {
      return "blue";
    }

    return "gray";
  };

  const covid = fetch("http://localhost:5000/data")
    .then((responce) => responce.json())
    .then((data) => {
      const { places, reports } = data;

      reports
        .filter((report) => !report.hide)
        .forEach((report) => {
          const { infected, id } = report;

          const currentPlace = places.find((place) => place.id === id);
          console.log(infected, currentPlace);
          new mapboxgl.Marker({
            color: getCount(infected),
          })
            .setLngLat([currentPlace.longitude, currentPlace.latitude])
            .addTo(map);
        });
    });

  return <div>CovidData</div>;
};

export default CovidData;
