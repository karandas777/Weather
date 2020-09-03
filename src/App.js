import React from "react";
import Home from "./component/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Details from "./component/Details";

function App() {
  return (
    <Router>
      <div className="row m-0 p-0 min-height">
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
