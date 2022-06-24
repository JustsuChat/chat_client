import { Spin } from "antd";
// import NotFoundPage from 'components/NotFoundPage';
import MainPage from "./pages/MainPage";
import React from "react";
// import { useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import RegistryPage from './pages/RegistryPage';
import "./style.scss";
function Login() {
  // const { isLoading } = useSelector((state) => state.login);
  const { url } = useRouteMatch();
console.log(url);
  return (
    // <Spin spinning={isLoading}>
      <div id="account_page">
        <Switch>
          <Route exact path={`${url}/login`} component={MainPage} />
          <Route exact path={`${url}/registry`} component={RegistryPage} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </div>
    // </Spin>
  );
}

export default Login;
