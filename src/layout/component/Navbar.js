import { Link } from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slice/authSlice";
import { setData } from "../../store/slice/authSlice";
import { useEffect } from "react";
import { Button } from "reactstrap";

export default function Navbar() {
  const location = useLocation();
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
    <>
      {location.pathname !== "/Login" && (
        <nav className="Navbar">
          <Link component={RouterLink} to="/Dashboard">
            <Button>پروفایل</Button>
          </Link>
          <Link component={RouterLink} to="/Wallet">
            <Button>کیف پول</Button>
          </Link>
          <Link component={RouterLink} to="/">
            <Button onClick={() => dispatch(logout())}>خروج</Button>
          </Link>
        </nav>
      )}
    </>
  );
}
