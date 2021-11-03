import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import CustomRoutes from "./routes/CustomRoutes";
import { setData } from "./store/slice/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const name = localStorage.getItem("NAME");
    const token = localStorage.getItem("TOKEN");
    if (!!name && !!token)
      dispatch(
        setData({
          access_token: token,
          name,
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Router>
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
          <Redirect exact from="/" to="/Login" />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
