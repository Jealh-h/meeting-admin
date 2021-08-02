import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/login";
import Main from "../pages/index";

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login}></Route>
      <Route path="/index" component={Main}></Route>
    </Switch>
  </Router>
);
