import React, { Component } from "react";
import Axios from "axios";
import Wcard from "./Wcard";
import { Link } from "react-router-dom";
import LogoHolder from "./LogoHolder";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityList: [],
      city: "",
      edit: false,
      modal: false,
      error: false,
    };
  }

  componentDidMount = () => {
    window.scrollTo(0,0);
    this.funGetList();
  };

  funHandleChange = (e) => {
    this.setState({ city: e.target.value });
  };

  funGetList = () => {
    const list = JSON.parse(localStorage.getItem("cityList"));
    if (list === null || list === undefined || list === "") {
      return false;
    } else {
      this.setState({ cityList: list });
    }
  };

  funSetEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  funSetModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  funDelete = (cityToBeDeleted) => {
    let newList = this.state.cityList.filter((city) => {
      return city !== cityToBeDeleted;
    });
    localStorage.setItem("cityList", JSON.stringify(newList));
    this.funGetList();
  };

  funAddToList = () => {
    Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=0dad4b498ac26bbee3a517cdae37c63a&units=metric`
    )
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState(
            { cityList: [...this.state.cityList, res.data.name] },
            () => {
              this.setState({ city: "", modal: false, error: false });
              const list = JSON.stringify(this.state.cityList);
              localStorage.setItem("cityList", list);
            }
          );
        } else {
          this.setState({ error: true });
        }
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log(err);
      });
  };

  render() {
    return (
      <div className="py-3 h-100">

        {/* logo */}
        <div className="col-md-6 mx-auto">
        <LogoHolder/>
        </div>

        {/* city list */}

        <div className="col-md-6 mx-auto">
          {this.state.cityList &&
            this.state.cityList.map((city, i) => (
              <React.Fragment key={i}>
                {this.state.edit ? (
                  <div className="h2 p-3 mb-3 rounded bg-light text-dark text-center shadow-sm">
                    {city}
                    <div className="mt-3">
                      <button
                        className="btn btn-danger btn-lg rounded-pill shadow-sm"
                        onClick={() => {
                          this.funDelete(city);
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    className="text-decoration-none"
                    to={`/details/${city}`}
                  >
                    <Wcard city={city} />
                  </Link>
                )}
              </React.Fragment>
            ))}
        </div>

        {/* empty list indicator */}

        {this.state.cityList.length === 0 ? (
          <div className="col-md-6 mx-auto mb-3">
            <div className="bg-light text-center shadow-sm p-3 rounded-lg">
              <div className="h3">List Empty!</div>
              <div className="h6 mb-0">Add your faourite cities</div>
            </div>
          </div>
        ) : null}

        {/* modal */}

        {this.state.modal ? (
          <div className="col-md-6 mx-auto my-3">
            <div className="text-center p-3 bg-dark text-light shadow-sm rounded-lg">
              <input
                type="text"
                value={this.state.city}
                onChange={this.funHandleChange}
                className="form-control mb-3"
                placeholder="Add your city"
              />
              {this.state.error ? (
                <div className="alert alert-danger p-2 mb-3">
                  Please enter a valid city !
                </div>
              ) : null}

              <div className="d-flex justify-content-between">
                <button className="btn btn-danger" onClick={this.funSetModal}>
                  <i className="fa fa-times"></i>
                </button>

                <button className="btn btn-success" onClick={this.funAddToList}>
                  Add City
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {/* action buttons */}

        <div className="col-md-6 mx-auto mb-3">
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary shadow-sm" onClick={this.funSetEdit}>
              {this.state.edit ? "Done" : (<i className="fa fa-pencil-square"></i>)}
            </button>
            {this.state.edit || this.state.modal ? null : (
              <button className="btn btn-primary shadow-sm" onClick={this.funSetModal}>
              Add City
              </button>
            )}
            
          </div>
        </div>
      </div>
    );
  }
}
