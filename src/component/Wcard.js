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
      `https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&appid=0dad4b498ac26bbee3a517cdae37c63a&units=metric`
    ).then((res) => {
      console.log(res.data);
      const obj = {
        name: res.data.name,
        country:res.data.sys.country,
        temp: res.data.main.temp,
        icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        desc: res.data.weather[0].main,
        day:res.data.weather[0].icon.slice(-1)
      };
      this.setState({ details: obj });
    });
  };

  render() {
    const { name,country, temp, icon, desc, day } = this.state.details;

    if(this.state.details === ""){
        return (
            <div className="p-3 h1 text-center bg-light rounded-lg shadow-sm mb-3 text-dark">Loading...</div>
        )
    }

    return (
      <div
        className={`rounded-lg p-3 mb-3 border-0 text-light shadow-sm h-100 ${
          day === "d" ? "day-card" : "night-card"
        }`}
      >
        <div className="h3 mb-0">
          <img
            src={icon}
            alt="icon"
            className="rounded-pill mb-1 mr-2 bg-trans-light p-1"
            width="50"
            height="50"
          />
          {name}{" "}
          <div className="d-inline-block h6 float-right">
            {temp}
            <span className="small">
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
