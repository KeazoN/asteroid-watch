import React, { useEffect, useState } from "react";

const Orbiting = () => {
  const [nasa, setNasa] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-02-26&api_key=${
        import.meta.env.VITE_NASA_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setNasa(data.near_earth_objects["2023-02-26"]);
      });
  }, []);
  console.log(nasa);
  if (nasa) {
    return (
      <>
        <div className="stars"></div>
        <div className="space">
          <div className="container-space">
            <div className="content">
              {nasa.map((data: number, index: number) => (
                <div
                  className="asteroid"
                  key={index}
                  style={{
                    "--astreoidKM":
                      parseFloat(
                        data.estimated_diameter.kilometers
                          .estimated_diameter_max
                      ) *
                        5600 +
                      "px",
                    "--asteroidSpeed":
                      parseFloat(
                        data.estimated_diameter.feet.estimated_diameter_min
                      ) *
                        6000 +
                      "ms",
                    "--asteroidFeet":
                      parseFloat(data.absolute_magnitude_h) * 0.5 + "px",
                    "--asteroidLocation":
                      parseFloat(
                        data.estimated_diameter.meters.estimated_diameter_max
                      ) + "deg",
                  }}
                >
                  <div className="asteroid-img">
                    <img src="https://pngimg.com/uploads/asteroid/asteroid_PNG24.png" />
                  </div>
                </div>
              ))}
              <div className="earth">
                <img src="./earth.svg" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }
};

export default Orbiting;
