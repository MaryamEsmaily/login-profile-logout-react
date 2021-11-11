import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";

// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import NotFound from "./components/NotFound";
// import CustomRoutes from "./routes/CustomRoutes";
// import { setData } from "./store/slice/authSlice";
// import { useDispatch } from "react-redux";

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const name = localStorage.getItem("NAME");
  //   const token = localStorage.getItem("TOKEN");
  //   if (!!name && !!token)
  //     dispatch(
  //       setData({
  //         access_token: token,
  //         name,
  //       })
  //     );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="App">
      <Router>
        <Layout />
      </Router>
    </div>
  );
}

export default App;
