import React, { Component } from "react";
import Axios from "axios";

export default class Wcard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: "",
    };
  }

  componentDidMount() {
    this.funGetDetails();
  }

  funGetDetails = () => {
    Axios.get(
      `http://api.weatherstack.com/current?access_key=3c0780bcaf98a4116551a462917e53d9&query=${this.props.city}`
    ).then((res) => {
      const obj = {
        name: res.data.location.name,
        country:res.data.location.country,
        temp: res.data.current.temperature,
        icon: res.data.current.weather_icons[0],
        desc: res.data.current.weather_descriptions[0],
        day: res.data.current.is_day,
      };
      this.setState({ details: obj });
    });
  };

  render() {
    const { name,country, temp, icon, desc, day } = this.state.details;

    if(this.state.details === ""){
        return (
            <div className="p-3 h1 text-center bg-light text-dark">Loading...</div>
        )
    }

    return (
      <div
        className={`rounded-lg p-3 mb-3 border-0 text-light shadow-sm h-100 ${
          day === "yes" ? "day-card" : "night-card"
        }`}
      >
        <div className="h3 mb-0">
          <img
            src={icon}
            alt="icon"
            className="rounded-pill mb-1 mr-2"
            width="40"
            height="40"
          />
          {name}{" "}
          <div className="d-inline-block float-right">
            {temp}
            <span className="h5">
              <sup>o</sup>C
            </span>
          </div>
        </div>
        <div className="mb-0 mt-1 small">
            <i className="fa fa-map-marker"></i> {country} <span className="float-right">{desc}</span>
        </div>
      </div>
    );
  }
}
