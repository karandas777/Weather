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
      const obj = {
        name: res.data.name,
        temp: Math.floor(res.data.main.temp),
        country: res.data.sys.country,
        icon: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
        desc: res.data.weather[0].main,
        day: res.data.weather[0].icon.slice(-1),
      };
      this.setState({ details: obj });
    });
  };

  render() {
    const { name, temp, country, icon, desc, day } = this.state.details;

    if (this.state.details === "") {
      return (
        <div className="p-3 h1 text-center bg-light rounded-lg shadow-sm mb-3 text-dark">
          Loading...
        </div>
      );
    }

    return (
      <div
        className={`rounded-lg p-3 mb-3 border-0 text-light shadow-sm h-100 ${
          day === "d" ? "day-card" : "night-card"
        }`}
      >
        <div className="row m-0 p-0">
          <div className="col-3 m-0 p-0 text-center">
            <img
              src={icon}
              alt="icon"
              className="rounded-pill mt-2 bg-trans-light w-75"
             
            />
            
          </div>
          <div className="col-9 m-0">

            <div className="h5 mb-2">
              {name}, {country}
            </div>

            <div className="h3">
              {
                day === "d" ? 
                (<i className="fa fa-thermometer-half mr-2 text-warning"></i>) : 
                (<i className="fa fa-thermometer-half mr-2 text-danger"></i>)
              }
            
              {temp}
              <span className="small">
                <sup>o</sup>C
              </span>
            </div>

            <div className="ultra-small">{desc}</div>
            
          </div>
        </div>
      </div>
    );
  }
}
