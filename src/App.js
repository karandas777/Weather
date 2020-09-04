import React from "react";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./component/Details";

function App() {
  let date = new Date(Date.now());
  let time = (date.getHours());
  return (
    <Router>
      <div className={`row m-0 p-0 min-height ${time >= 6 && time <=18 ? "bg-light" : "bg-dark"}`}>
        <div className="col-md-8 custom-p mx-auto">
          <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details/:city" component={Details} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
