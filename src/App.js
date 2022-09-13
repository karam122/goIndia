import React from "react";
import Routes from "./Routes/index";

//import Custom Style scss
import "./assets/scss/themes.scss";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <React.Fragment>
      <CookiesProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </CookiesProvider>
    </React.Fragment>
  );
}

export default App;
