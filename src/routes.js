import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { defaultLayout } from "./layouts";

// Route Views
import StatsView from "./components/stats/stats";

export default [
  {
    path: "/",
    exact: true,
    layout: defaultLayout,
    component: () => <Redirect to="/stats" />
  },
  {
    path: "/stats",
    exact: true,
    layout: defaultLayout,
    component: StatsView
  },
];