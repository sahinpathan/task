import React, { useEffect } from "react";
import { matchPath, useLocation, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function Sidebar() {
  const isNavExpanded = useSelector((state) => state.Common.isNavExpanded);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (match("/dashboard")) {
      setOpen(!open);
    }
  }, []);

  const { pathname } = useLocation();
  const match = (path) => (path ? !!matchPath({ path }, pathname) : false);

  useEffect(() => {
    isNavExpanded
      ? document.body.classList.add("open")
      : document.body.classList.remove("open");
  }, [isNavExpanded]);

  const navbarAdmin = [
    {
      roles: "Task",
      path: "/dashboard",
      active: match("/dashboard"),
    }
  ];

  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <h4>Task Admin Panel</h4>
        </div>
        <div className="navigaton">
          <ul>
            {navbarAdmin.map((navbar) => {
              return (
                true && (
                  <>
                    <li className={navbar.active && "active"}>
                      <Link to={navbar.path}>{navbar.roles}</Link>
                    </li>
                  </>
                )
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
