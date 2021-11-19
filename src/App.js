import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./layout/component/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Wallet from "./components/Wallet";
import CustomRoutes from "./routes/CustomRoutes";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <CustomRoutes
              path="/Login"
              component={Login}
              isPrivate={false}
              redirect="/Dashboard"
            />
            <CustomRoutes
              exact
              path="/Dashboard"
              component={Dashboard}
              isPrivate
              redirect="/Login"
            />
            <CustomRoutes
              exact
              path="/Wallet"
              component={Wallet}
              isPrivate
              redirect="/Login"
            />
            <Redirect exact from="/" to="/Login" />

            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
