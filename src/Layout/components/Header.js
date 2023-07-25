import { useDispatch } from "react-redux";
import { handleNav } from "../../redux/common/Action";
import { logout } from "../../redux/Auth/Action";
import { Button } from "@mui/material/node";
import { useNavigate } from "react-router-dom/dist";

export default function DashboardNavbar({ props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () =>{
    dispatch(logout(navigate))
  }
  
  return (
    <>
      <div className="main-contentbox">
        <div className="top">
          <div
            className="mobiletoggle"
            onClick={() => {
              dispatch(handleNav());
            }}
          >
            <div className="icon icon1"></div>
            <div className="icon icon2"></div>
            <div className="icon icon3"></div>
          </div>
          <h1>Welcome!</h1>
           <button
            variant="contained"
            className="cmn-btn"
            onClick={handleLogout}
           >
           Logout
          </button>
        </div>
        {props}
      </div>
    </>
  );
}
