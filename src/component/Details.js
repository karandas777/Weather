import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      req_city: this.props.match.params.city,
      details: {},
      weather: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.funGetWeather();
  }

  funGetWeather = () => {
    Axios.get(
      // `http://api.weatherstack.com/current?access_key=3c0780bcaf98a4116551a462917e53d9&query=${this.state.req_city}`
    )
      .then((res) => {
        if (res.data.success !== false) {
          this.setState({
            details: res.data.location,
            weather: res.data.current,
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
    const { weather, details } = this.state;
    const date = new Date(details.localtime);

    if (!this.state.weather || !this.state.details) {
      return <div className="text-center pt-5 h5">Loading</div>;
    }

    return (
      <div
        className={`card p-3 border-0 custom-r text-light shadow-sm h-100 ${
          weather.is_day === "yes" ? "day" : "night"
        }`}
      >
        <div className="h3 mt-2">
          <i className="fa fa-location-arrow text-danger"></i> {details.name}
        </div>
        <div className="h6 mb-3">
          {details.region}
          {details.region ? ", " : null}
          {details.country}
        </div>

        {/* card1 */}

        <div className="row p-0 m-0">
          <div className="col-9 px-0">
            <div className="display-1">
              {weather.temperature}
              <span className="h1">
                <sup> o</sup>C
              </span>
            </div>
          </div>
          <div className="col-3 pt-4 px-0">
            <div className="text-right">
              <img
                src={weather.weather_icons && weather.weather_icons[0]}
                alt="logo"
                className="rounded-pill img-fluid shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="h5 text-center mt-2 mb-0">
          {weather.weather_descriptions && weather.weather_descriptions[0]}
        </div>
        <div className="text-center small">
          Feels like {weather.feelslike}{" "}
          <span>
            <sup>o</sup> c
          </span>
        </div>

        {/* card2 */}

        <div
          className={`row mx-0 mt-3 p-2 small text-center rounded-lg shadow-sm ${
            weather.is_day === "yes" ? "bg-trans-dark" : "bg-trans-light"
          }`}
        >
          <div className="col-6 my-2">
            Wind
            <div className="h5 mt-2">{weather.wind_speed} km/h</div>
          </div>
          <div className="col-6 my-2">
            Wind Direction
            <div className="h5 mt-2">
              {weather.wind_dir} {weather.wind_degree}
              <span>
                <sup>o</sup>
              </span>
            </div>
          </div>
          <div className="col-6 my-2">
            Precipitation
            <div className="h5 mt-2">{weather.precip} %</div>
          </div>
          <div className="col-6 my-2">
            Humidity
            <div className="h5 mt-2">{weather.humidity} %</div>
          </div>
          <div className="col-6 my-2">
            Cloud cover
            <div className="h5 mt-2">{weather.cloudcover} %</div>
          </div>
          <div className="col-6 my-2">
            UV Index
            <div className="h5 mt-2">{weather.uv_index}</div>
          </div>
          <div className="col-6 my-2">
            Visibility
            <div className="h5 mt-2">{weather.visibility} km</div>
          </div>
          <div className="col-6 my-2">
            Pressure
            <div className="h5 mt-2">{weather.pressure} hPa</div>
          </div>
        </div>

        {/* card3 */}

        <div
          className={`row mx-0 mt-3 p-2 small text-center rounded-lg shadow-sm 
        ${weather.is_day === "yes" ? "bg-trans-dark" : "bg-trans-light"}`}
        >
          <div className="col-12 my-2">
            Time zone
            <div className="h5 mt-2">{details.timezone_id}</div>
          </div>
          <div className="col-md-6 my-2">
            Local Date
            <div className="h5 mt-2">{date.toDateString()}</div>
          </div>
          <div className="col-md-6 my-2">
            Local Time
            <div className="h5 mt-2">{date.toLocaleTimeString()}</div>
          </div>
          <div className="col-6 my-2">
            Latitude
            <div className="h5 mt-2">{details.lat}</div>
          </div>
          <div className="col-6 my-2">
            Longitude
            <div className="h5 mt-2">{details.lon}</div>
          </div>
        </div>

        {/* home navigator */}

        <div className="pt-3  text-center">
          <Link
            className={`btn btn-link text-decoration-none ${weather.is_day === "yes" ? "text-secondary" : "text-light"} `}
            to="/"
          >
            <i className="fa fa-arrow-circle-o-left fa-2x"></i>
          </Link>
        </div>
      </div>
    );
  }
}
