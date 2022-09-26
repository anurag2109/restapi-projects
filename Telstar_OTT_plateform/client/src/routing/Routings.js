import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Register from "../components/auth/Register.jsx";
// import Login from "../components/auth/Login";
// import { Login2 } from "../components/auth/Login2";
// import Login3 from "../components/auth/Login3";
// import Register from "../components/auth/Register";
// import { Register2 } from "../components/auth/Register2";
// import Register3 from "../components/auth/Register3";
import Alert from "../components/common/Alert.js";
import Dashboard from "../components/dashboard/Dashboard.jsx";
// import Dashboard from "../components/dashboard/Dashboard";
// import ViewProfile from "../components/displayProfile/ViewProfile";
import Landing from "../components/layouts/Landing";
import Navbar from "../components/layouts/Navbar.jsx";
import AddMovie from "../components/movies/AddMovie.jsx";
import Movies from "../components/movies/Movies.jsx";
import SingleMovie from "../components/movies/SingleMovie.jsx";
import UpdateMovie from "../components/movies/UpdateMovie.jsx";
import AddSeries from "../components/webSeries/AddSeries.jsx";
import SingleSeries from "../components/webSeries/SingleSeries.jsx";
import UpdateSeries from "../components/webSeries/UpdateSeries.jsx";
import WebSeries from "../components/webSeries/WebSeries.jsx";
import Profiles from "../components/profiles/Profiles";
import ViewProfile from "../components/displayProfile/ViewProfile";
import PrivateRoutes from "./PrivateRoutes";
import CreateProfile from "../components/profile/CreateProfile.jsx";

export const Routings = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ margin: "0 0.5rem" }}>
        <Alert></Alert>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<PrivateRoutes component={Dashboard} />}
          />
          <Route
            path="/movies"
            element={<PrivateRoutes component={Movies} />}
          />
          <Route
            path="/movie/:id"
            element={<PrivateRoutes component={SingleMovie} />}
          />
          <Route
            path="/webseries/:id"
            element={<PrivateRoutes component={SingleSeries} />}
          />
          <Route
            path="/movie/add-movie"
            element={<PrivateRoutes component={AddMovie} />}
          />
          <Route
            path="/movie/update-movie/:id"
            element={<PrivateRoutes component={UpdateMovie} />}
          />
          <Route
            path="/webseries/updateSeries/:id"
            element={<PrivateRoutes component={UpdateSeries} />}
          />
          <Route
            path="/webseries"
            element={<PrivateRoutes component={WebSeries} />}
          />
          <Route
            path="/webseries/addSeries"
            element={<PrivateRoutes component={AddSeries} />}
          />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route
            path="/create-profile"
            element={<PrivateRoutes component={CreateProfile} />}
          />
        </Routes>
      </div>
    </div>
  );
};
