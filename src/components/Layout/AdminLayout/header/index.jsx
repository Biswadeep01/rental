import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import LogoutDialog from "../../../Header/LogoutDialog";

export const Header = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setOpen(false);
    navigate("/home");
  };

  return (
    <Navbar expand="md" style={{ backgroundColor: "#039594", padding: 10 }}>
      <NavbarBrand style={{ color: "white", fontFamily: "Poppins" }}>
        <i class="ri-admin-fill" /> ADMIN
      </NavbarBrand>

      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink
            href="/home"
            style={{ color: "white", fontFamily: "Poppins" }}
          >
            Home &nbsp;|
          </NavLink>
        </NavItem>

        <NavItem onClick={() => setOpen(true)}>
          <NavLink
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <i class="ri-logout-box-r-line ri-lg" />
          </NavLink>
        </NavItem>
      </Nav>

      {open && (
        <LogoutDialog
          open={open}
          setOpen={setOpen}
          handleLogout={handleLogout}
        />
      )}
    </Navbar>
  );
};
