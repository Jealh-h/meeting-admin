import { PageLoading } from "@ant-design/pro-layout";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const Login = lazy(() => import("../pages/login"));
const Main = lazy(() => import("../pages/index"));
export default () => (
  <Router>
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route path="/index" component={Main}></Route>
      </Switch>
    </Suspense>
  </Router>
);
