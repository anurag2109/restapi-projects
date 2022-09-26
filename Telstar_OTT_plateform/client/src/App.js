import "./App.css";
import { Routings } from "./routing/Routings";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

//components
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/authAction";

function App() {
  useEffect(() => {
    // localStorage.getItem('token') is same as localStorage.token
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []); // whenever the component is updated or refreshed then useEffect will be called

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routings />
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
