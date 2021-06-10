import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { PatientUpsert } from "./components/PatientUpsert";
import { PatientList } from "./components/PatientList";
import { ServicesUpsert } from "./components/ServicesUpsert";
import { ServicesList } from "./components/ServicesList";
import { Nav, Navbar } from "react-bootstrap";
import { AppNavBar } from "./common/AppNavBar";

function App() {
  return (
    <Router>
      <AppNavBar />

      <Switch>
        <Route path="/create-patient">
          <PatientUpsert />
        </Route>

        <Route path="/list-patient">
          <PatientList />
        </Route>

        <Route path="/create-services">
          <ServicesUpsert />
        </Route>

        <Route path="/list-services">
          <ServicesList />
        </Route>

        <Route exact path="/">
          <PatientUpsert />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
