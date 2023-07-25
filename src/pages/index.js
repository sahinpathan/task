import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormBuilder from "./FormBuilder/FormBuilder";
import NotFound from "../components/NotFound";
import PrivateRoute from "../Routing/PrivateRoute";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const Routers = () => {
  const privateDashboard = [
    { path: "/dashboard", components: <FormBuilder /> }
  ];

  const auth = [
    { path: "/login", components: <Login /> },
    { path: "/", components: <SignUp/> }
  ];

  return (
    <>
      <Router>
        <Routes>
          {privateDashboard?.map((dashboard, index) => {
            return (
              true && (
                <Route
                  key={index}
                  path={dashboard.path}
                  element={<PrivateRoute>{dashboard.components}</PrivateRoute>}
                />
              )
            );
          })}
          <Route>
          {auth?.map((privateAuth) => {
            return (
              true && (
                <Route
                  path={privateAuth.path}
                  element={privateAuth.components}
                />
              )
            );
          })}
        </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default Routers;
