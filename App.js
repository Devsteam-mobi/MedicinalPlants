import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/Store";

import { MainApp } from "./src/components/MainApp";

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}
