import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from "react-toasts";
import './App.css';
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PublicRoute from '../src/routes/public-route';
import ProtectedRoute from '../src/routes/protected-routes';
import HomePage from './components/HomePage';
import Profile from './components/Profile';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div className="App">
            <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
            <Switch>
              <PublicRoute exact path="/" component={HomePage} redirectRoute={"/profile"} />
              <ProtectedRoute exact path="/profile" component={Profile} redirectRoute={"/"}/>

              <Route path="*" render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
