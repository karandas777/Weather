import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      req_city: this.props.match.params.city,
      details: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.funGetWeather();
  }

  funGetWeather = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.req_city}&appid=0dad4b498ac26bbee3a517cdae37c63a&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          const obj = {
            name: res.data.name,
            temp: Math.floor(res.data.main.temp),
            min: res.data.main.temp_min,
            max: res.data.main.temp_max,
            country: res.data.sys.country,
            icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
            desc: res.data.weather[0].main,
            day: res.data.weather[0].icon.slice(-1),
            feelslike: res.data.main.feels_like,
            wind_speed: res.data.wind.speed,
            wind_dir: res.data.wind.deg,
            pressure: res.data.main.pressure,
            humidity: res.data.main.humidity,
            vis: res.data.visibility / 1000,
            cloud: res.data.clouds.all,
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
          };

          this.setState({
            details: obj,
          });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/");
      });
  };

  render() {
    const {
      name,
      temp,
      country,
      icon,
      desc,
      day,
      feelslike,
      wind_speed,
      wind_dir,
      pressure,
      humidity,
      vis,
      cloud,
      lat,
      lon,
      min,
      max,
    } = this.state.details;

    if (this.state.details === "") {
      return <div className="text-center pt-5 h5">Loading...</div>;
    } else {
      return (
        <div
          className={`card p-3 border-0 custom-r text-light shadow-sm h-100 ${
            day === "d" ? "day" : "night"
          }`}
        >
          <div className="h3 mt-2 mb-3">
            <i className="fa fa-location-arrow text-danger"></i> {name},{" "}
            {country}
          </div>

          {/* card1 */}

          <div className="row p-0 m-0">
            <div className="col-9 px-0">
              <div className="display-1">
                {temp}
                <span className="h1">
                  <sup> o</sup>C
                </span>
              </div>
            </div>
            <div className="col-3 pt-2 px-0">
              <div className="text-right">
                <img
                  src={icon}
                  alt="logo"
                  className="rounded-pill img-fluid shadow-sm bg-trans-light"
                />
              </div>
            </div>
          </div>
          <div className="h5 text-center mt-2 mb-0">{desc}</div>
          <div className="text-center small">
            Feels like {feelslike}{" "}
            <span>
              <sup>o</sup> c
            </span>
          </div>

          {/* card2 */}

          <div
            className={`row mx-0 mt-3 p-2 small text-center rounded-lg shadow-sm ${
              day === "d" ? "bg-trans-dark" : "bg-trans-light"
            }`}
          >
            <div className="col-6 my-2">
              Wind
              <div className="h5 mt-2">{wind_speed} km/h</div>
            </div>
            <div className="col-6 my-2">
              Wind Direction
              <div className="h5 mt-2">
                {wind_dir}
                <span>
                  <sup>o</sup>
                </span>
              </div>
            </div>

            <div className="col-6 my-2">
              Humidity
              <div className="h5 mt-2">{humidity} %</div>
            </div>
            <div className="col-6 my-2">
              Cloud cover
              <div className="h5 mt-2">{cloud} %</div>
            </div>

            <div className="col-6 my-2">
              Visibility
              <div className="h5 mt-2">{vis} km</div>
            </div>
            <div className="col-6 my-2">
              Pressure
              <div className="h5 mt-2">{pressure} hPa</div>
            </div>
          </div>

          {/* card3 */}

          <div
            className={`row mx-0 mt-3 p-2 small text-center rounded-lg shadow-sm 
          ${day === "d" ? "bg-trans-dark" : "bg-trans-light"}`}
          >
            <div className="col-6 my-2">
              Min Temp.
              <div className="h5 mt-2">
                {min}
                <sup>o</sup>c
              </div>
            </div>
            <div className="col-6 my-2">
              Max Temp.
              <div className="h5 mt-2">
                {max}
                <sup>o</sup>c
              </div>
            </div>
            <div className="col-6 my-2">
              Latitude
              <div className="h5 mt-2">{lat}</div>
            </div>
            <div className="col-6 my-2">
              Longitude
              <div className="h5 mt-2">{lon}</div>
            </div>
          </div>

          {/* home navigator */}

          <div className="pt-3 text-center">
            <Link
              className={`btn text-light btn-link text-decoration-none px-4 rounded-lg ${
                day === "d" ? "bg-trans-dark" : "bg-trans-light"
              } `}
              to="/"
            >
              <i className="fa fa-arrow-left"></i>
            </Link>
          </div>
        </div>
      );
    }
  }
}
